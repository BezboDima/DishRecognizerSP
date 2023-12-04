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
				<Link href={item.img}>
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
				</Link>
			))}
    	</div>
	</div>
	);
}
