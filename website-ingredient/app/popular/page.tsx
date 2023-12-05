'use client'
import { title } from "@/components/primitives";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button, Link } from "@nextui-org/react";

export default function PopularDishes() {
	
	const list = [
		{
		title: "Soup",
		img: "soup.jpg",
		link: "/soup.jpg",
		},
		{
		title: "Salad",
		img: "salad.jpg",
		link: "/salad.jpg",
		},
		{
		title: "Fruit",
		img: "fruit.jpg",
		link: "/fruit.jpg",
		},
		{
		title: "Vegetables",
		img: "vegetables.jpg",
		link: "/vegetables.jpg",
		},
		{
		title: "Sandwich",
		img: "sandwich.jpg",
		link: "/sandwich.jpg",
		},
		{
		title: "Hamburger",
		img: "hamburger.jpg",
		link: "/hamburger.jpg",
		},
		{
		title: "Pizza",
		img: "pizza.jpg",
		link: "/pizza.jpg",
		},
		{
		title: "Pasta",
		img: "pasta.png",
		link: "/pasta.png"
		},
		{
		title: "Seafood",
		img: "seafood.jpg",
		link: "/seafood.jpg",
		},
		{
		title: "Steak",
		img: "steak.jpeg",
		link: "/steak.jpeg",
		},
		{
		title: "Ice Cream",
		img: "icecream.jpg",
		link: "/icecream.jpg",
		},
		{
		title: "Cake",
		img: "cake.png",
		link: "/cake.png",
		},
	];

	return (
	<div>
		<div>
			<h1 className={title()}>Popular Dishes</h1>
			<p className="py-2">Don&apos;t have a dish? Try uploading one of these!</p>
			<p className="py-2">Click to Download</p>
		</div>
		
		<br></br>
		
		<div className="gap-2 grid grid-cols-4 grid-rows-2">
			{list.map((item, index) => (
				<Card className="w-full h-[300px]" shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
					<a href={item.link} download>
						<CardBody className="overflow-visible p-0">
							<Image
							shadow="sm"
							radius="lg"
							width="100%"
							alt={item.title}
							className="w-[250px] object-cover h-[250px]"
							src={item.img}
							/>
						</CardBody>
						<CardFooter className="text-white text-large justify-center">
							<b>{item.title}</b>
						</CardFooter>
					</a>
				</Card>
			))}
    	</div>
	</div>
	);
}
