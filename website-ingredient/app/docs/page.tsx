'use client'
import { title } from "@/components/primitives";
import { Button, Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function DocsPage() {

	const defaultContent = "This is some default text."
	
	return (
		<div>
			<div>
				<Accordion>
					<AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
						{defaultContent}
					</AccordionItem>
					<AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
						{defaultContent}
					</AccordionItem>
					<AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
						{defaultContent}
					</AccordionItem>
				</Accordion>
			</div>

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
				<Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
				<CardHeader className="absolute z-10 top-1 flex-col items-start">
					<p className="text-tiny text-white/60 uppercase font-bold">New</p>
					<h4 className="text-black font-medium text-2xl">Acme camera</h4>
				</CardHeader>
				<Image
					removeWrapper
					alt="Card example background"
					className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
					src=""
				/>
				<CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
					<div>
					<p className="text-black text-tiny">Available soon.</p>
					<p className="text-black text-tiny">Get notified.</p>
					</div>
					<Button className="text-tiny" color="primary" radius="full" size="sm">
					Notify Me
					</Button>
				</CardFooter>
				</Card>
				<Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
				<CardHeader className="absolute z-10 top-1 flex-col items-start">
					<p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
					<h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
				</CardHeader>
				<Image
					removeWrapper
					alt="Relaxing app background"
					className="z-0 w-full h-full object-cover"
					src=""
				/>
				<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
					<div className="flex flex-grow gap-2 items-center">
					<Image
						alt="Breathing app icon"
						className="rounded-full w-10 h-11 bg-black"
						src=""
					/>
					<div className="flex flex-col">
						<p className="text-tiny text-white/60">Breathing App</p>
						<p className="text-tiny text-white/60">Get a good night's sleep.</p>
					</div>
					</div>
					<Button radius="full" size="sm">Get App</Button>
				</CardFooter>
				</Card>
			</div>
	  </div>
	);
}
