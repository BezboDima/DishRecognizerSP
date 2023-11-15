'use client'
import { title } from "@/components/primitives";
import { Button, Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function DocsPage() {

	const defaultContent = "This is some default text."
	
	return (
		<div>
			

			<div className="gap-2 grid grid-cols-2 grid-rows-2 px-8">
				<Card className="col-span-12 sm:col-span-4 h-[300px]">
				<CardHeader className="absolute z-10 top-1 flex-col !items-start">
					<p className="text-tiny text-white/60 uppercase font-bold">How It's Done</p>
					<h4 className="text-white font-medium text-large">Made Possible by ChatGPT</h4>
				</CardHeader>
				<Image
					removeWrapper
					alt="Card background"
					className="z-0 w-full h-full object-cover"
					src="chatgpt.jpg"
				/>
				</Card>
				<Card className="col-span-12 sm:col-span-4 h-[300px]">
				<CardHeader className="absolute z-10 top-1 flex-col !items-start">
					<p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
					<h4 className="text-white font-medium text-large">Contribute to the planet</h4>
				</CardHeader>
				<Image
					removeWrapper
					alt="Card background"
					className="z-0 w-full h-full object-cover"
					src=""
				/>
				</Card>
				<Card className="col-span-12 sm:col-span-4 h-[300px]">
				<CardHeader className="absolute z-10 top-1 flex-col !items-start">
					<p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
					<h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
				</CardHeader>
				<Image
					removeWrapper
					alt="Card background"
					className="z-0 w-full h-full object-cover"
					src=""
				/>
				</Card>
				
				
				
			</div>
	  </div>
	);
}
