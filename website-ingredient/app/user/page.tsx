"use client"
import React from "react";
import { useState, ChangeEvent } from "react";
import {RadioGroup, Radio, Button, Input, Spacer} from "@nextui-org/react";
import {checkToken} from "../../src/cookies";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
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
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
    const [user, setUser] = useState<string>("?");

    const [rowData, setRowData] = useState([
        {
            key: "0",
            allergy: "input",
            action: "add"
        }]
        );

    const [formData, setFormData] = useState({
        input: '',
      });
    const [isFormEnab, setIsFormEnab] = useState(false);
    
/*     const handleSubmit = () => {
        // Call your API here with formData
        console.log('Form data:', formData);
        // Reset form data
        setFormData({
          input: '',
        });
        // Disable form after submitting
        setIsFormEnabled(false);
      }; */

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

    const [value, setValue] = useState("no-limit");
    const [selectedValue, setSelectedValue] = useState("no-limit");
    const [isSelectionChanged, setIsSelectionChanged] = useState(true);



    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        console.log(value, rowData)
        setSelectedValue(newValue);
        setIsSelectionChanged(!isSelectionChanged);
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
    const handlClick = () => {
        setIsFormEnab(!isFormEnab); // Toggle the state
        //setRowData((prevData) => [...prevData, { key: "2", allergy: "None", action: "stee" }]);
        console.log(rowData);
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
        console.log(formData)
        
        if(!formData){
            return
        }
        const data = {
            login: user,
            action: "add",
            allergy: formData["input"]
        }

        callPostGatewayApi('update-alleries', data)
			.then(result => {
				console.log(result)
			})
			.catch (error => {
				console.error(error)
			})
        
        setIsFormEnab(false)
        setRowData(prevItems => [...prevItems, {key: "2", allergy: formData["input"], action: "remove"}])

    }
    const renderCell = (item: { key: string; allergy: string; action: string; }, columnKey: any) => {
        if(item.key === "0"){
            if(columnKey === "allergy"){
                return (
                    <Input
                        name="input"
                        value={formData.input}
                        onChange={handleInputChange}
                        isDisabled={!isFormEnab}
                        placeholder={String(isFormEnab)}
                    />
                )
            }
            else{
                return (
                    <Button
                    onClick={isFormEnab ? handleUpload: handlClick}
                    color={isFormEnab ? 'success' : 'success'}
                    >
                    {isFormEnab ? 'Submit' : 'Enable Form'}
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
        <div className="flex">
            <RadioGroup
            className="flex-1 w-64"
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
                className="flex-1 w-128"
                aria-label="Controlled table example with dynamic content"
                selectionMode="single"
                selectedKeys={selectedKeys}
                >
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
        </div>
    );
}
