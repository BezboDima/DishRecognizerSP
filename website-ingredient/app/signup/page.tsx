'use client'

import { useState } from 'react';
import { callPostGatewayApi } from '../../src/request';
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

        if (userConfirmPassword !== userPassword){
            setIsUserExist(false)
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
            setPasswordsNotMatch(false)
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Card className="max-w-[600px] min-w-[400px] gap-4">
                <CardBody className="py-4">
                    <h1>Sign Up to use Lens</h1>
                    {passwordsNotMatch && <h1>Passwords do Not match</h1>}
                    {isUserExist && <h1>User Exist</h1>}
                    <Input 
                        type="email" 
                        variant="bordered" 
                        label="Email" 
                        placeholder="Enter your email" 
                        className="mb-4" 
                        onChange={handleLoginChange}/>
                    <Input
                        className="mb-4"
                        label="Password"
                        variant="bordered"
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        />
                    <Input
                        className="mb-4"
                        label="Confirm Password"
                        variant="bordered"
                        onChange={handleConfirmPasswordChange}
                        placeholder="Enter your password"
                        />
                    <div className="flex flex-wrap gap-4 items-center" style={{justifyContent: 'center'}}>
                        <Button color="primary" variant="ghost" size="md" className="grow" onClick={handleLoginClick}>
                            Login
                        </Button>  
                        <Button color="primary" variant="solid" size="md" className="grow" onClick={handleSignUpClick}>
                            Sing Up
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
		
	);
}