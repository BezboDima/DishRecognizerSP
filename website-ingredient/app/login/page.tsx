'use client'

import { useState } from 'react';
import { callPostGatewayApi } from '../../requests/request';
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import {Card, Input, CardBody, Button} from "@nextui-org/react";

export default function LoginPage() {

    const handleButtonClick = async ()  =>{
        const json = {
            entry: userInput
        }

        const response = await callPostGatewayApi("test", json);

        setUserData(response.event);
        setUserDataVisibility(true);

    }
    const handlePAsswordChange = (e : any) => {
        setPasswordInput(e.target.value);
    }
    const handleEmailChange = (e : any) => {
        setEmailInput(e.target.value);
    }
    const [userInput, setUserInput] = useState("");
    const [userData, setUserData] = useState("");
    const [isUserDataVisible, setUserDataVisibility] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

	return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Card className="max-w-[600px] min-w-[400px] gap-4">
                <CardBody className="py-4">
                    {isUserDataVisible && ( <h1>This is your password: {userData}</h1>)}
                    <Input type="email" variant="bordered" label="Email" placeholder="Enter your email" className="mb-4" onChange={handleInputChange}/>
                    <Input
                        className="mb-4"
                        label="Password"
                        variant="bordered"
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        />
                    <div className="flex flex-wrap gap-4 items-center" style={{justifyContent: 'center'}}>
                        <Button color="primary" variant="ghost" size="md" className="grow" onClick={handleButtonClick}>
                            Sign Up
                        </Button>  
                        <Button color="primary" variant="solid" size="md" className="grow" onClick={handleButtonClick}>
                            Login
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
		
	);
}