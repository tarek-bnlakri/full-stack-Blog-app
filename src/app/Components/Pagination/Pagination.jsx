"use client"
import React from 'react'
import styles from './Pagination.module.css'
import { useRouter } from 'next/navigation'



function Pagination({page,haseNext,hasPrev}) {
   const navigate=useRouter();
   

  return (
    <div className={styles.container}>

      <button className={styles.button} 
        disabled={!hasPrev }
      onClick={()=> navigate.push(`?page=${page > 1 ?page-1:1}`)}  
      >
        Prev
      </button>
      <button className={styles.button}  disabled={!haseNext} onClick={()=>navigate.push(`?page=${page+1 }`)}>
        Next
      </button>
    </div>
  )

}


export default Pagination