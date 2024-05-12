import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggel from '../ThemeToggle/ThemeToggel'
import AuthLinks from '../AuthLinks/AuthLinks'
function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src={'/facebook.png'} alt='' height={20} width={20}/>
        <Image src={'/instagram.png'} alt='' height={20} width={20}/>
        <Image src={'/tiktok.png'} alt='' height={20} width={20}/>
        <Image src={'/youtube.png'} alt='' height={20} width={20}/>
      </div>
      <Link href={'/'} className={styles.logo}>
        TarekBLOG
      </Link>
      <div className={styles.links}>
        <ThemeToggel/>
        <Link  className={styles.link} href={'/'}>Home</Link>
        <Link  className={styles.link}href={'/contact'}>Contact</Link>
        <AuthLinks/>
      </div>

     </div>
    ) 
}

export default NavBar