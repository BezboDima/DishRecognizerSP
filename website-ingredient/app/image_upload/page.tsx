'use client'
//import base64 from 'base-64';
import { title } from "@/components/primitives";
import { useState } from 'react'
import { callPostGatewayApi } from '../../requests/request';
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/button";
import {Card, CardBody, CardFooter} from "@nextui-org/card";

export default function BlogPage() {
	const [file, setFile] = useState<File>();
	const [base64, setBase64] = useState<string>();
	const [imageVisible, setImageVisible] = useState(false);
	const [detectButton, setDetectButton] = useState(false);

	function getBase64(file:any) { 
		return new Promise<any>((resolve, reject) => {
		  const reader = new FileReader();
		  reader.readAsDataURL(file);
		  reader.onload = () => resolve(reader.result);
		  reader.onerror = error => reject(error);
		});
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		//if (!file) return
		console.log("submitted")
		try {
			const b64 = await getBase64(file);
			setBase64(b64);
			var solution = b64.split("base64,")[1];
			const data = {
				b_image: solution,
				bucket: 'gereral-bucket',
				key: 'user-image/imag.png',
			};
			console.log(data)
			const res = callPostGatewayApi('s3_upload', data)

			console.log(res)
			setImageVisible(true);
			setDetectButton(true);
			// handle the error
			//if (!response.ok) throw Error(await response.text())
		}catch (e:any) {
			// Handle errors here.
			console.error(e)
		}
	}
	
	return (
		<div className="flex flex-col">
		<div className="flex flex-row ">
			<Card>
				<CardBody>
					<div>
						<form onSubmit={onSubmit} method='post' encType="multipart/form-data">
							<input
								type="file"
								accept="image/*"
								name="file"
								onChange={(e) => setFile(e.target.files?.[0])}
							/>
							<Button type="submit" size="md">
								Medium
							</Button> 
						</form>
					</div>
				</CardBody>
			</Card>
		</div>
		{file && (<div className="flex flex-row ">
			<Image
				width={300}
				alt="NextUI hero Image"
				src={URL.createObjectURL(file)}
			/>
			<Card>	
				<CardBody> Detect Ingredients </CardBody>
			</Card>
		</div>)}
			<Card>	
				<CardBody> Recipe Output </CardBody>
			</Card>
		</div>
	);
	
	
}
