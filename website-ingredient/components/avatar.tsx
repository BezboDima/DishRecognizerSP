"use client"
import React from "react";
import { useState } from "react";
import {Avatar} from "@nextui-org/react";
import {checkToken} from "../src/cookies";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Ava() {
    
    const [user, setUser] = useState<string>("?");
    const router = useRouter();
    useEffect(() => {
		const token = Cookies.get("token");
		const checked = checkToken(token);

		if (checked && typeof checked.login === 'string') {
			console.log('Login:', checked.login);
            setUser(checked.login);
		}

	}, [router]);


  return (
    <NextLink className="flex justify-start items-center gap-2" href="/user">
		<Avatar name={user} />
	</NextLink>
  );
}