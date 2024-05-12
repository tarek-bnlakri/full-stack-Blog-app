'use client'
import React,{useEffect, useState} from 'react'
import styles from './AuthLinks.module.css'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';



function AuthLinks() {
  const {data,status} = useSession();
  const [dropMenu, setDropMenu] = useState(false);
  const [open, setOpen] = useState(false);

  

  return (
    <>
  
    
      { status ==="unauthenticated" ?(
        <>
        <Link className={styles.link}  href={'/login'}>Login</Link>
        </>
      ):(
        <>
         
            <div className={styles.profile}>
              <Image className={styles.userImageProfile} src={data?.user?.image} alt='' width={40} height={40} style={{borderRadius:"50%",objectFit:"cover"}}/>
                <Image onClick={()=>setDropMenu(!dropMenu)} className={styles.arroDown} src={'/down.png'} alt='' height={24} width={24} />
                  {dropMenu && (
                      <div className={styles.droppMenu}>
                          <Link className={styles.item} onClick={()=>setDropMenu(false)} href={`/profile/${data?.user?.email}`}>My Profile</Link>
                          <Link className={styles.item}  onClick={()=>setDropMenu(false)} href={`/write`}>Add New Post</Link>
                          <span className={styles.item}  onClick={signOut} >LogOut</span>

                      </div>
                  )}
            </div>
         
        </>)}
        <div onClick={()=>setOpen(!open)} className={styles.burger}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>

        </div>
        {open && (

          <div  className={styles.MenuMobile}>
            <Link onClick={()=>setOpen(!open)}  href={'/'}>HomePage</Link>
             <Link onClick={()=>setOpen(!open)} href={'/contact'}>Contact</Link>
             <Link  onClick={()=>setOpen(!open)} href={'/about'}>About</Link>
             { status ==="unauthenticated" ?(
                <>
                <Link onClick={()=>setOpen(!open)}  href={'/login'}>Login</Link>
                </>
                ):(
                <>
                  <Link onClick={()=>setOpen(!open)} href={'/write'}>AddPost</Link>
                  <span >LogOut</span>
                </>)}
                    

          </div>
        ) 
        }
    
    </>
  )
}

export default AuthLinks