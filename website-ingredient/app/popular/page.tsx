'use client'
import { title } from "@/components/primitives";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button, Link } from "@nextui-org/react";

export default function PopularDishes() {
	
	const list = [
		{
		title: "Soup",
		img: "soup.jpg",
		},
		{
		title: "Salad",
		img: "salad.jpg",
		},
		{
		title: "Fruit",
		img: "fruit.jpg",
		},
		{
		title: "Vegetables",
		img: "vegetables.jpg",
		},
		{
		title: "Sandwich",
		img: "sandwich.jpg",
		},
		{
		title: "Hamburger",
		img: "hamburger.jpg",
		},
		{
		title: "Pizza",
		img: "pizza.jpg",
		},
		{
		title: "Pasta",
		img: "pasta.png",
		},
		{
		title: "Seafood",
		img: "seafood.jpg",
		},
		{
		title: "Steak",
		img: "steak.png",
		},
		{
		title: "Ice Cream",
		img: "icecream.jpg",
		},
		{
		title: "Cake",
		img: "cake.png",
		},
	];

	return (
	<div>
		<div>
			<h1 className={title()}>Popular Dishes</h1>
			<p className="py-2">Don't have a dish? Try uploading one of these!</p>
		</div>
		
		<br></br>
		
		<div className="gap-2 grid grid-cols-4 grid-rows-2">
			{list.map((item, index) => (
				<Card className="w-full h-[300px]" shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
					<CardBody className="overflow-visible p-0">
						<Image
						shadow="sm"
						radius="lg"
						width="100%"
						alt={item.title}
						className="w-full object-cover h-[250px]"
						src={item.img}
						/>
					</CardBody>
					<CardFooter className="text-white text-large justify-center">
						<b>{item.title}</b>
					</CardFooter>
				</Card>
			))}
    	</div>
	</div>

	// 	<div className="gap-2 grid grid-cols-3 grid-rows-2 px-1">
	// 		<Card className="w-full h-[300px] shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")">
	// 			<CardBody className="overflow-visible p-0">
	// 				<Image
	// 					shadow="sm"
	// 					radius="lg"
	// 					width="100%"
	// 					alt={item.title}
	// 					className="w-full object-cover h-[140px]"
	// 					src={item.img}
	// 				/>
	// 			</CardBody>
	// 			<CardFooter className="text-white text-large font-bold justify-center">
	// 				<p>Soup</p>
	// 			</CardFooter>
	// 		</Card>

	// 		<Card className="w-full h-[300px]">
	// 			<CardHeader className="absolute z-10 top-1 flex-col !items-start">
	// 				<p className="text-tiny text-white/60 uppercase font-bold">How It Works</p>
	// 				<h4 className="text-white font-medium text-large">Made Possible by ChatGPT</h4>
	// 			</CardHeader>
	// 			<Image
	// 				removeWrapper
	// 				alt="Card background"
	// 				className="z-0 w-full h-full object-cover"
	// 				src="chatgpt.jpg"
	// 			/>
	// 		</Card>

	// 		<Card className="w-full h-[300px]">
	// 			<CardHeader className="absolute z-10 top-1 flex-col !items-start">
	// 				<p className="text-tiny text-white/60 uppercase font-bold">Backend Power</p>
	// 				<h4 className="text-white font-medium text-large">Powered by AWS</h4>
	// 			</CardHeader>
	// 			<Image
	// 				removeWrapper
	// 				alt="Card background"
	// 				className="z-0 w-full h-full object-cover"
	// 				src="aws.jpg"
	// 			/>
	// 		</Card>
			
	// 		<Card className="w-full h-[300px]">
	// 			<CardHeader className="absolute z-10 top-1 flex-col !items-start">
	// 				<p className="text-tiny text-white/60 uppercase font-bold">Beauty By Design</p>
	// 				<h4 className="text-white font-medium text-large">Built using NextUI, Next.js and Tailwind CSS</h4>
	// 			</CardHeader>
	// 			<Image
	// 				removeWrapper
	// 				alt="Card background"
	// 				className="z-0 w-full h-full object-cover"
	// 				src="nextui.png"
	// 			/>
	// 		</Card>

	// 		<Card className="h-[300px]">
	// 		</Card>

	// 		<Card className="w-full h-[300px]">
	// 			<CardHeader className="absolute z-10 top-1 flex-col !items-start">
	// 				<p className="text-tiny text-white/60 uppercase font-bold">For More Information</p>
	// 				<h4 className="text-white font-medium text-large">View the About page</h4>
	// 			</CardHeader>
	// 			<Image
	// 				removeWrapper
	// 				alt="Card background"
	// 				className="z-0 w-full h-full object-cover"
	// 				src="mu_logo.png"
	// 			/>
	// 		</Card>
    // 	</div>
	// </div>
	);
}
