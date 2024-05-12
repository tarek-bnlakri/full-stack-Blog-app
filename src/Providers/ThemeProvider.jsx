"use client";
import React,{useContext,useEffect,useState} from 'react'
import {ThemeContext} from "@/context/ThemeContext"


const  ThemeProvider=({children})=> {
    const {theme}=useContext(ThemeContext);
    
    const [mounted, setmounted] = useState(false);
    useEffect(() => {
    
        setmounted(true);
     
    }, )
    if(mounted){
        return <div className={theme}>{children}</div>


    }
    
                      
          
}

export default ThemeProvider