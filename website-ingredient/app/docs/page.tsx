'use client'
import { title } from "@/components/primitives";
import { Button, Card, CardHeader, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
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
					<Link href="image_upload">
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">How to Use</p>
							<h4 className="text-white font-medium text-large">1. Click &quot;Image Upload&quot; above</h4>
							<h4 className="text-white font-medium text-large">2. Upload an image of food</h4>
							<h4 className="text-white font-medium text-large">3. Click &quot;Generate Labels&quot;</h4>
							<h4 className="text-white font-medium text-large">4. Choose what food to make</h4>
							<h4 className="text-white font-medium text-large">5. Click &quot;Generate Recipes&quot;</h4>
							<h4 className="text-white font-medium text-large">6. Enjoy your recipe!</h4>
							<h4 className="text-white font-medium text-large">7. Repeat the process for a new recipe</h4>
						</CardHeader>
						
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 w-full h-[300px] object-cover"
							src="food_background1.jpg"
						/>
					</Link>
				</Card>

				<Card className="w-full h-[300px]">
					<Link href="https://openai.com/blog/chatgpt" target="_blank">
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">How It Works</p>
							<h4 className="text-white font-medium text-large">Made Possible by ChatGPT</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 w-full h-[300px] object-cover"
							src="chatgpt.jpg"
						/>
					</Link>
				</Card>

				<Card className="w-full h-[300px]">
					<Link href="https://aws.amazon.com/" target="_blank">
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">Backend Power</p>
							<h4 className="text-white font-medium text-large">Powered by AWS</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 w-full h-[300px] object-cover"
							src="aws.jpg"
						/>
					</Link>
				</Card>
				
				<Card className="w-full h-[300px] col-span-2">
					<Link href="https://nextui.org/" target="_blank">
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">Beauty By Design</p>
							<h4 className="text-white font-medium text-large">Built using NextUI, Next.js and Tailwind CSS</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 w-full h-[300px] object-cover"
							src="nextui.png"
						/>
					</Link>
    			</Card>

				<Card className="w-[0px] h-[300px]">
				</Card>

				<Card className="w-full h-[300px]">
					<Link href="about">
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">For More Information</p>
							<h4 className="text-white font-medium text-large">View the About page</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 w-full h-[300px] object-cover"
							src="mu_logo.png"
						/>
					</Link>
				</Card>
			</div>
	  </div>
	);
}
