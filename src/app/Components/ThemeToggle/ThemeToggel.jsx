'use client';
import React,{useContext,useEffect} from 'react'
import styles from './ThemeToggel.module.css'
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemeContext'
function ThemeToggel() {
  const {theme,toggle} =useContext(ThemeContext)
  
  
  
  
  return (
    <div className={styles.toggel} onClick={toggle} style={
      theme ==='dark' ?{backgroundColor:'white'} :{backgroundColor:'black'}}>
    
      <Image src={'/moon.png'} height={14} width={14}/>
      <div className={styles.bole} style={theme ==="dark" ? {left:"1px",backgroundColor:"#0f1721"}:{right:"1px",backgroundColor:"white"}}></div>
      <Image alt='' src={'/sun.png'} height={14} width={14}/>


    
    </div>
  )

}

export default ThemeToggel