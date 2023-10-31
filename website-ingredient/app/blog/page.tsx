'use client'
import { title } from "@/components/primitives";

import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";

import { useState } from 'react'

export default function BlogPage() {
	const [file, setFile] = useState<File>()
	
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!file) return

		try {
			const data = new FormData()
			data.set('file', file)

			const res = await fetch('/API/upload', {
				method: 'POST',
				body: data
			})

			// handle the error
			if (!res.ok) throw Error(await res.text())
		} catch (e:any) {
			// Handle errors here.
			console.error(e)
	}
	}
	
	return (
		<div className="flex justify-start">
		<div className="ml-auto bg-white border border-gray-300 p-4 rounded-lg shadow-md">
			<Card>
				<CardBody>
					<div>
						<form onSubmit={onSubmit}>
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
		</div>
		</div>
	);
}
