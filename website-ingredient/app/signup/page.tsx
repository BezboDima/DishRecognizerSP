'use client'

import { useState } from 'react';
import { callPostGatewayApi } from '../../src/request';
import { title, subtitle } from "@/components/primitives";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import {Card, Input, CardBody, Button} from "@nextui-org/react";

export default function SignUpPage() {
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");

    const [passwordsNotMatch, setPasswordsNotMatch ] = useState(false);
    const [isInfoPassed, setIsInfoPassed] = useState(false);
    const [isUserExist, setIsUserExist] = useState(false);

    const handleSignUpClick = async ()  =>{

        setIsUserExist(false)
        setPasswordsNotMatch(false)
        setIsInfoPassed(false)
        if (userConfirmPassword !== userPassword){
            setPasswordsNotMatch(true)
            return
        }

        const data = {
            login: userLogin,
            password: userPassword
        }

        const response = await callPostGatewayApi("dynamo-put",data);

        console.log(response['exist']);
        if(response['exist']){
            setIsUserExist(true)
        }else{
            setIsInfoPassed(true)
        }

    }
    const handleLoginClick = () => {
        window.location.href = "/login"
    }
    const handlePasswordChange = (e : any) => {
        setUserPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e : any) =>{
        setUserConfirmPassword(e.target.value);
    }
    const handleLoginChange = (e : any) => {
        setUserLogin(e.target.value);
    }
	return (
            <div style={{ display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <div className="my-10">
                    <h1 className={title()}>Sign Up to start with </h1>
                    <p className={title({ color: "green", animate: "gradient" })}>Lens</p>
                    <br/>
                </div>
                <Card className="max-w-[600px] min-w-[400px] gap-4">
                    {isUserExist && "User Already Exists, Try Logging In"}
                    {isInfoPassed && "User is Added"}
                    <CardBody className="py-4">
                        <Input 
                            type="email" 
                            variant="bordered" 
                            label="Email" 
                            placeholder="Enter your email" 
                            className="mb-4"
                            isInvalid={isUserExist}
                            errorMessage={isUserExist && "User with such email exists"}
                            onChange={handleLoginChange}/>
                        <Input
                            className="mb-4"
                            label="Password"
                            variant="bordered"
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                            type="password"
                            isInvalid={passwordsNotMatch}
                            errorMessage={passwordsNotMatch && "Passwords don't match"} 
                            />
                        <Input
                            className="mb-4"
                            label="Confirm Password"
                            variant="bordered"
                            onChange={handleConfirmPasswordChange}
                            placeholder="Enter your password"
                            type="password"
                            isInvalid={passwordsNotMatch}
                            />
                        <div className="flex flex-wrap gap-4 items-center" style={{justifyContent: 'center'}}>
                            <Button color="primary" variant="ghost" size="md" className="grow" onClick={handleLoginClick}>
                                Login
                            </Button>  
                            <Button color="primary" variant="solid" size="md" className="grow" onClick={handleSignUpClick}>
                                Sign Up
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
	);
}