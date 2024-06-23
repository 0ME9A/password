import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListItem, ListItemText, Box, Button} from '@mui/material'
import { setWhiteList } from "../../RTK/slices/setting";

export default function CharDropDown() {

    const dispatch = useDispatch();
    // for all possible char types
    // "!@#$%^&*()_+-=[]{}|;:,.<>?"
    let charTypes =  ["!","@","#","$","%","^","&","*","(",")","_","+","-","=","[","]","{","}","|",";",":",",",".","<",">","?"];

    // get white list from local storage 
    let whiteList = localStorage.getItem("whiteList") ? JSON.parse(localStorage.getItem("whiteList") as string) : charTypes;


  return (  

    <Box>

        <ListItem>
            <ListItemText primary="Symbol Types" secondary="Select the symbol types you want to include in your password." />
        </ListItem>
    
        <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, justifyContent:"center"}}>
            {charTypes.map((char: string, index: number) => (
            <Button key={index} onClick={() => {
                // toggle the char type
                if(whiteList.includes(char)){
                // remove the char type
                    whiteList = whiteList.filter((item: string) => item !== char);
                }else{
                // add the char type
                    whiteList.push(char);
                }
                // update the white list
                dispatch(setWhiteList(whiteList));
            }} variant={whiteList.includes(char) ? "contained" : "outlined"}>{char}</Button>
            ))}
        </Box>

    </Box>
  )
}
