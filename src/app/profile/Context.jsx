"use client"
import React ,{useState,createContext} from 'react'

// Create Context
const Mycontext=createContext();

// Create Provider
const MyProvider = ({children})=>{
    const [edit, setEdit] = useState(false);
    const [userProf, setUserProf] = useState({
        name:"",
        email:"",
        image:"",
    })



return (
        <Mycontext.Provider value ={{edit,setEdit,userProf,setUserProf}}>
            {children}
        </Mycontext.Provider>
)
}

export {Mycontext,MyProvider}
