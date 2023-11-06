'use client'
import base64 from 'base-64';
import { title } from "@/components/primitives";
import { useState } from 'react'
import { callPostGatewayApi } from '../../requests/request';

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

export default function BlogPage() {
	const [file, setFile] = useState<File>()
	const [base64, setBase64] = useState<string>();

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
			const b64 = await getBase64(file)
			setBase64(b64)
			var solution = b64.split("base64,")[1];
			const data = {
				b_image: solution,
				bucket: 'gereral-bucket',
				key: 'user-image/image3.png',
			};
			console.log(data)
			const res = callPostGatewayApi('upload-image', data)

			console.log(res)
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
							<input type="submit" value="Upload" />
						</form>
					</div>
				</CardBody>
			</Card>
			<Card>	
				<CardBody> AI Output </CardBody>
			</Card>
		</div>
			<Card>	
				<CardBody> Recipe Output </CardBody>
			</Card>
		</div>
		
	);
	
	
}
