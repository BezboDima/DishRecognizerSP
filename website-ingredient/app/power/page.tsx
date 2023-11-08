'use client'
import { title } from "@/components/primitives";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export default function PowerOfAIPage() {
  
	const list = [
		{
		  title: "Apple",
		  img: "apple.png",
		  price: "$5.50",
		},
		{
		  title: "Tangerine",
		  img: "https://nextui-docs-v2.vercel.app/images/fruit-2.jpeg",
		  price: "$3.00",
		},
		{
		  title: "Raspberry",
		  img: "",
		  price: "$10.00",
		},
		{
		  title: "Lemon",
		  img: "",
		  price: "$5.30",
		},
		{
		  title: "Avocado",
		  img: "",
		  price: "$15.70",
		},
		{
		  title: "Lemon 2",
		  img: "",
		  price: "$8.00",
		},
		{
		  title: "Banana",
		  img: "",
		  price: "$7.50",
		},
		{
		  title: "Watermelon",
		  img: "",
		  price: "$12.20",
		},
	  ];
	
	  return (
		<div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
		  {list.map((item, index) => (
			<Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
			  <CardBody className="overflow-visible p-0">
				<Image
				  shadow="sm"
				  radius="lg"
				  width="100%"
				  alt={item.title}
				  className="w-full object-cover h-[140px]"
				  src={item.img}
				/>
			  </CardBody>
			  <CardFooter className="text-small justify-between">
				<b>{item.title}</b>
				<p className="text-default-500">{item.price}</p>
			  </CardFooter>
			</Card>
		  ))}
		</div>
	  );
}
