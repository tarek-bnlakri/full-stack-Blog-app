import React from 'react'
import styles from './CatigoryList.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { getData } from '@/app/functions/Get'



async function CatigoryList () {
  const catigoryse= await getData('catigory');

  return (
    <div className={styles.container}>
      <h1 className={styles.title} >Popular Categories</h1>
       <div className={styles.categories}>
        {catigoryse?.map((item)=>(
          <Link key={item._id} 
          href={`/blog?cat=${item.title}`}
           className={`${styles.catigory} ${styles[item.title]}`}>
            {
              item.img && (
                <Image 
                src={`${item.img}`} 
                alt='' 
                width={32} 
                height={32} 
                className={styles.image}/>
          

              )
            }
            {item.title}
          
      </Link>

        ))}
       
       </div>
    </div> 
  )
}

export default CatigoryList