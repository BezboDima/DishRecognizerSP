'use client'
import { title } from "@/components/primitives";
import { Button, Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function DocsPage() {

	return (
		<div>
			<div>
				<h1 className={title()}>Docs</h1>
			</div>
			
			<br></br>
			
			<div className="gap-2 grid grid-cols-3 grid-rows-2 px-1">
				<Card className="w-full h-[300px] col-span-2">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">How Its Done</p>
						<h4 className="text-white font-medium text-large">Made Possible by ChatGPT</h4>
					</CardHeader>
					<Image
						removeWrapper
						alt="Card background"
						className="z-0 w-full h-full object-cover"
						src="chatgpt.jpg"
					/>
				</Card>

				<Card className="w-full h-[300px]">
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

				<Card className="w-full h-[300px]">
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
				
				<Card className="w-full h-[300px]">
      				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<p className="text-tiny uppercase font-bold">Daily Mix</p>
						<small className="text-default-500">12 Tracks</small>
						<h4 className="font-bold text-large">Frontend Radio</h4>
					</CardHeader>
					<CardBody className="overflow-visible py-2">
						<Image
						alt="Card background"
						className="object-cover rounded-xl"
						src="apple.png"
						width={270}
						/>
					</CardBody>
    			</Card>

				<Card className="w-full h-[300px]">

				</Card>
			</div>
	  </div>
	);
}
