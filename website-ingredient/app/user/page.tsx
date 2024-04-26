"use client"
import React from "react";
import { useState, ChangeEvent } from "react";
import {RadioGroup, Radio, Button} from "@nextui-org/react";
import {checkToken, invalidateToken} from "../../src/cookies";
import { useRouter } from "next/navigation";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { allergies } from "@/src/allergies";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { callPostGatewayApi } from '../../src/request'; 

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const columns = [
    {
      key: "allergy",
      label: "ALLERGY",
    },
    {
      key: "action",
      label: "ACTION",
    },
  ];

  export default function history() {
    const [user, setUser] = useState<string>("?");
    const [rowData, setRowData] = useState([
        {
            key: "0",
            allergy: "input",
            action: "add"
        }]
        );
    
    const router = useRouter();
    useEffect(() => {
		const token = Cookies.get("token");
		const checked = checkToken(token);

		if (checked && typeof checked.login === 'string') {
			console.log('Login:', checked.login);
            setUser(checked.login);
            var data = {
                login: checked.login,
                item: 'diet'
            }
            callPostGatewayApi('get-history', data)
            .then(async result => {
                console.log(result.item);
                setSelectedValue(result.item);
                setValue(result.item);
            })
            .catch(error => {
                console.error(error);
            });
            data = {
                login: checked.login,
                item: 'allergies'
            }
            callPostGatewayApi('get-history', data)
            .then(async result => {
                console.log(result.item);
                interface Row {
                    key: string;
                    allergy: string;
                    action: string;
                }
                const newRows: Row[] = []
                result.item.forEach((element: any, index: number) => {
                    const row: Row = {
                        key: (index + 1).toString(),
                        allergy: element,
                        action: "remove"
                    }
                    newRows.push(row);
                });
                setRowData([...rowData, ...newRows])
            })
            .catch(error => {
                console.error(error);
            });
		}
        else {
            router.push("/login");
        }

	}, [router]);

    const [value, setValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [isSelectionChanged, setIsSelectionChanged] = useState(true);
    const [selectedAllergy, setSelectedAllergy] = useState<string>("");
    const [isValueSelected, setIsValueSelected] = useState<boolean>(false);

    const selectionChange = (key: React.Key) => {
        if(key === null){
            setIsValueSelected(false);
        }
        else{
            setSelectedAllergy(key.toString());
            setIsValueSelected(true);
        }
    }
    
    const handleClear = () => {
        setIsValueSelected(false);
      };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue === value){
            setIsSelectionChanged(true);
        }
        else{
            setIsSelectionChanged(false);
        }
        setSelectedValue(newValue);
    };

    const handleConfirm = () => {
        setValue(selectedValue);
        setIsSelectionChanged(true); // Reset selection changed state
        const data = {
            diet: selectedValue,
            login: user
        }
        callPostGatewayApi('update-diet', data)
			.then(result => {
				console.log(result)
			})
			.catch (error => {
				console.error(error)
			})
    };

    const handleDelete = (allegry_: string) => {
        const data = {
            login: user,
            action: "delete",
            allergy: allegry_
        }

        callPostGatewayApi('update-alleries', data)
			.then(result => {
				console.log(result)
			})
			.catch (error => {
				console.error(error)
			});
        
        const updatedRows = rowData.filter(item => item.allergy !== allegry_);
        setRowData(updatedRows);
        
    }
    const handleUpload = () => {
        
        if(!selectedAllergy){
            return
        }
        const data = {
            login: user,
            action: "add",
            allergy: selectedAllergy
        }

        callPostGatewayApi('update-alleries', data)
			.then(result => {
				console.log(result)
			})
			.catch (error => {
				console.error(error)
			})
        
        setRowData(prevItems => [...prevItems, {key: "2", allergy: selectedAllergy, action: "remove"}])

    }
    const handleLogout = () => {
        const token = Cookies.get("token");
        if(token){
            invalidateToken(token);
            console.log("Here");
        }


    }
    const renderCell = (item: { key: string; allergy: string; action: string; }, columnKey: any) => {
        if(item.key === "0"){
            if(columnKey === "allergy"){
                return (
                    <Autocomplete 
                        label="Select an Allergy" 
                        className="max-w-xs" 
                        onSelectionChange={selectionChange}
                        onClear={handleClear}
                    >
                        {allergies.map((allergy) => (
                        <AutocompleteItem key={allergy.value} value={allergy.value}>
                            {allergy.label}
                        </AutocompleteItem>
                        ))}
                    </Autocomplete>
                )
            }
            else{
                return (
                    <Button
                    isDisabled={!isValueSelected}
                    onClick={handleUpload}
                    color='success'
                    >
                    Submit
                    </Button>
                 )
            }
        }
        else{
            if(columnKey === "allergy"){
                return (item.allergy)
            }
            else{
                return (<Button color="danger" onClick={() => handleDelete(item.allergy)}>
                            Remove
                        </Button>)
            }
        }
    }

    return (
        <div>
            <RadioGroup
            className="w-64 my-10"
            value={selectedValue}
            label="Your current diet"
            color="secondary"
            onChange={handleChange}
            >
                <Radio value="no-limit" >No-limitations</Radio>
                <Radio value="vegetarian">Vegetarian</Radio>
                <Radio value="gluten-free">Gluten Free</Radio>
                <Radio value="vegan">Vegan</Radio>
                <Button onClick={handleConfirm} isDisabled={isSelectionChanged}>
                    Update
                </Button>
            </RadioGroup>
            <Table 
                className="w-128 my-10"
                aria-label="Controlled table example with dynamic content"
                selectionMode="single">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody>
                    {rowData.map((row) => (
                        <TableRow key={row.key}>
                            {(columnKey) => <TableCell>{renderCell(row, columnKey)}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button 
                color="default"
                onPress={handleLogout}>
                Log Out
            </Button>
        </div>
    );
}
