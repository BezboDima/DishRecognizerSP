'use client'

import { useState } from 'react';
import { callPostGatewayApi } from '../../src/request';
import { createToken } from '../../src/cookies';
import { title, subtitle } from "@/components/primitives";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import {Card, Input, CardBody, Button} from "@nextui-org/react";


export default function LoginPage() {

    const router = useRouter();
    
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [isUserDataWrong, setIsUserDataWrong] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignUpClick = () => {
        window.location.href = "/signup"
    }
    const handleLoginClick = async () => {
        const data = {
            login: userLogin,
            password: userPassword
        }
        callPostGatewayApi("dynamo-get",data)
        .then(response => {
            
            if(response['status']){
                var token = createToken(userLogin);
                document.cookie = `token=${token}; path=/`;
                window.location.href = "/docs";

            }else{
                setIsUserDataWrong(true);
            }
        })
        .catch(error => {
            console.error(error);
        });

    }
    const handlePasswordChange = (e : any) => {
        setUserPassword(e.target.value);
    }
    const handleLoginChange = (e : any) => {
        setUserLogin(e.target.value);
    }
	return (
        <div style={{ display: 'flex', flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <div className="my-10">
                    <h1 className={title()}>Login to your </h1>
                    <p className={title({ color: "green", animate: "gradient" })}>Lens</p>
                    <br/>
                </div>
            <Card className="max-w-[600px] min-w-[400px] gap-4">
                <CardBody className="py-4">
                    {isUserDataWrong && (<h1>No such user</h1>)}
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
                        type={isVisible ? "text" : "password"}
                        />
                    <div className="flex flex-wrap gap-4 items-center" style={{justifyContent: 'center'}}>
                        <Button color="primary" variant="ghost" size="md" className="grow" onClick={handleSignUpClick}>
                            Sign Up
                        </Button>  
                        <Button color="primary" variant="solid" size="md" className="grow" onClick={handleLoginClick}>
                            Login
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
		
	);
}