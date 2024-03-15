'use client'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {checkToken} from "../../src/cookies";
import { callPostGatewayApi, callPostLambda } from '../../src/request'
import { getBase64, getHashKey } from '../../src/generators'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { Progress } from '@nextui-org/progress'
import { Table, TableBody, TableHeader, TableColumn, TableRow, TableCell } from '@nextui-org/table'

export default function ImageUpload() {
  const [file, setFile] = useState<File>()
  const [imageHash, setImageHash] = useState("");
  const [detectedList, setDetectedList] = useState<Array<{ key: string, label: string, selected: boolean }>>([])
  const [stepsList, setSteps] = useState<Array<string>>([])
  const [ingredientList, setIngredientList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isChosen, setIsChosen] = useState(false);
  const [isRecipe, setIsRecipe] = useState(false);
  const [user, setUser] = useState<string>("Guest");


  const router = useRouter();
	useEffect(() => {
		const token = Cookies.get("token");
		const checked = checkToken(token);

		if (checked && typeof checked.login === 'string') {
			console.log('Login:', checked.login);
			setUser(checked.login);
		}
	}, [router]);

  const handleListItemClick = (key: string) => {
    setDetectedList((prevList) =>
      prevList.map((detectedList) => ({
        ...detectedList,
        selected: detectedList.key === key
      }))
    )
	setIsChosen(true);
  }
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
	setFile(e.target.files?.[0]);
	setDetectedList([]);
	setIsChosen(false);
  }
  const handleRecipeClick = () => {
    setIsLoading(true)
	setIsRecipe(true)
    console.log(detectedList)
    const selectedKey = detectedList.find((detectedList) => detectedList.selected)?.key

    console.log(selectedKey)
    const data = {
      label: selectedKey
    }

    const response = callPostLambda(data)
      .then(result => {
        setSteps(result.steps)
        setIngredientList(result.ingredients)
        setIsLoading(false)

		const currentDateTime = new Date();
		const formattedDateTime = currentDateTime.toLocaleString('en-US', { hour12: false });

		const historyData = {
			date : formattedDateTime,
			imageHash : imageHash,
			labels : detectedList.map(item => item.label),
			recepie : {
				ingredients: result.ingredients,
				steps : result.steps
			}
		}
		console.log("History: ", historyData)
		const data = {
			login : user,
			historyItem : historyData
		}
		callPostGatewayApi('dynamo-update', data)
			.then(result => {
				console.log(result)
			})
			.catch (error => {
				console.error(error)
			})
      })
      .catch(error => {
        console.error(error)
      })
    console.log(response)
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const b64 = await getBase64(file)
      const hash = getHashKey(file)
	  setImageHash(hash);
      const data = {
        b_image: b64,
        bucket: 'gereral-bucket',
        key: `user-image/${user}/${hash}.png`
      }

      if (!callPostGatewayApi('s3_upload', data, )) {
        console.error("Picture wasn't uploaded to s3")
      }

      callPostGatewayApi('rekognision', data)
        .then(result => {
          interface DetectList {
            name: string
            confidence: number
          }
          const detected: DetectList[] = result.labels

          const dictionaryArray: Array<{ key: string, label: string, selected: boolean }> = []
          detected.forEach(element => {
            const dic = {
              key: element.name,
              label: element.name,
              selected: false
            }
            dictionaryArray.push(dic)
          })

          setDetectedList(dictionaryArray)
        })
        .catch(error => {
          console.error(error)
        })
    } catch (e: any) {
      console.error(e)
    }
  }
  return (
		<div className="flex flex-col w-4/5">
		<div className="flex flex-row">
			<Card className="w-full ">
				<CardBody className="text-center">
					<form onSubmit={onSubmit} method='post' encType="multipart/form-data">
						<input
							type="file"
							accept="image/*"
							name="file"
							onChange={(e) => { handleImageUpload(e) }}
						/>
						{file && (
						<Button className="mx-4" type="submit" size="md" >
							Generate Labels
						</Button>
						)}
						{isChosen && (
						<Button className="mx-4" size="md" onClick={handleRecipeClick}>
							Generate Recipe
						</Button>
						)}
					</form>
				</CardBody>
			</Card>
		</div>
		{file && (<div className="flex flex-row my-8">
			<Image
				className="w-full h-full object-cover"
				alt="NextUI hero Image"
				width={600}
				height={300}
				style={{ minWidth: '600px', maxWidth: '500px', maxHeight: '400px'}}
				src={URL.createObjectURL(file)}
			/>
			<Listbox
				items={detectedList}
				aria-label="Dynamic Actions"
				onAction={(key: React.Key) => { handleListItemClick(key as string) }}
			>
				{(item) => (
				<ListboxItem
					key={item.key}
					className={item.selected ? 'text-success' : ''}
					color={item.selected ? 'success' : 'default'}
				>
					<span style={{ fontSize: `1.5em` }}>
            			{item.label}
          			</span>
				</ListboxItem>
				)}
			</Listbox>
		</div>)}
		{isRecipe && (<div>
			<Card>
				<CardBody> Recipe Output
					{isLoading &&
					(<Progress
						size="sm"
						isIndeterminate
						aria-label="Loading..."
						className="max-w-md"
					/>)}
					{ingredientList.length != 0 &&
					(<div>
						<Table aria-label="Example table with dynamic content">
							<TableHeader>
								<TableColumn key="ingredients">Ingredients</TableColumn>
							</TableHeader>
							<TableBody>
								{ingredientList.map((item) =>
								<TableRow key={item}>
									<TableCell>{item}</TableCell>
								</TableRow>
								)}
							</TableBody>
						</Table>
					</div>)}
					{stepsList.length != 0 &&
					(<Accordion>
						{stepsList.map((item, index) => (
							<AccordionItem key={index + 1} aria-label={`Step ${index + 1}`} title={`Step ${index + 1}`}>
							{item}
							</AccordionItem>
						))}
					</Accordion>)}
				</CardBody>
			</Card>
		</div>)}
	</div>
  )
}
