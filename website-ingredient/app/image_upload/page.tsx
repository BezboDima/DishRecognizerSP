'use client'
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import { useState } from 'react'
import { callPostGatewayApi } from '../../src/request';
import {getBase64, getHashKey} from '../../src/generators'
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/button";
import {Card, CardBody} from "@nextui-org/card";

export default function BlogPage() {
	const [file, setFile] = useState<File>();
	const [base64, setBase64] = useState<string>();
	const [detectedList, setDetectedList] = useState<{ key: string; label: string; selected: boolean; }[]>([]);
 
	const handleListItemClick = (key: string) => {
		setDetectedList((prevList) =>
      		prevList.map((detectedList) =>
			  	detectedList.key === key ? { ...detectedList, selected: !detectedList.selected } : detectedList
      		)
    	);
	}
	const shouldItemBeCrossedOut = (key: string) => {
		const item = detectedList.find((item) => item.key === key);
  		return item && !item.selected;
	}
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const b64 = await getBase64(file);
			setBase64(b64);
			const id = getHashKey();
			const data = {
				b_image: b64,
				bucket: 'gereral-bucket',
				key: `user-image/${id}.png`,
			};

			if(!callPostGatewayApi('s3_upload', data)){
				console.error("Picture wasn't uploaded to s3");
			}

			callPostGatewayApi('rekognision', data)
			.then(result => {

				interface DetectList{
					name:string;
					confidence:number;
				}
				const detected: DetectList[] = result['labels'];

				const dictionaryArray: { key: string, label: string, selected: boolean }[] = [];
				detected.forEach(element => {
					var dic = {
						key: element['name'],
						label: element['name'],
						selected: true
					}
					dictionaryArray.push(dic);
				});

				setDetectedList(dictionaryArray);
			})
			.catch(error => {
				console.error(error);
			});

		}catch (e:any) {
			console.error(e)
		}
	}
	
	return (
		<div className="flex flex-col w-4/5">
		<div className="flex flex-row ">
			<Card className="w-full ">
				<CardBody className="text-center">
						<form onSubmit={onSubmit} method='post' encType="multipart/form-data">
							<input
								type="file"
								accept="image/*"
								name="file"
								onChange={(e) => setFile(e.target.files?.[0])}
							/>
							<Button type="submit" size="md">
								Generate Labels
							</Button> 
							{detectedList.length !== 0 && (
							<Button type="submit" size="md" onClick={() => alert("recipe")}>
								Generate Recipie
							</Button> 
							)}
						</form>
				</CardBody>
			</Card>
		</div>
		{file && (<div className="flex">
			<Image className="w-full" style={{ maxWidth: '100%' }}
				alt="NextUI hero Image"
				src={URL.createObjectURL(file)}
			/>
			<Listbox
				items={detectedList}
				aria-label="Dynamic Actions"
				onAction={(key: React.Key) => handleListItemClick(key as string)}
			>
				{(item) => (
				<ListboxItem
					key={item.key}
					className={!item.selected ? "text-danger" : ""}
					color={!item.selected ? "danger" : "default"}
					style={{ textDecoration: shouldItemBeCrossedOut(item.key) ? 'line-through' : 'none' }}
				>
					{item.label}
				</ListboxItem>
				)}
			</Listbox>
		</div>)}
			<Card>	
				<CardBody> Recipe Output </CardBody>
			</Card>
		</div>
	);
}
