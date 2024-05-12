'use client';
import {createContext,useEffect,useState} from 'react'

const getFormLocalStorage=()=>{
    if(typeof window !== 'undefined'){
        const value =localStorage.getItem("theme");
        return value || "light";
    }
}

export const ThemeContext=createContext();

export const ThemeContextProvider=({children})=>{
    const [theme, setTheme] = useState(()=>{return getFormLocalStorage();})
    const  toggle =()=>{
        setTheme(theme ==="light" ? "dark" : "light");
        
    }
    useEffect(() => {
        localStorage.setItem("theme",theme);
    
      
    }, [theme])
    

    return <ThemeContext.Provider value={{theme,toggle}}>{children}</ThemeContext.Provider>

}

