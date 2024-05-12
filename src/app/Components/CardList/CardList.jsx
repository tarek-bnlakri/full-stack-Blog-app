import React from 'react'
import styles from './CardList.module.css'
import Pagination from '../Pagination/Pagination'
import Image from 'next/image'
import { getDataWithPage } from '@/app/functions/Get'
import Link from 'next/link'

async function CardList({page,cat}) {
  const {posts,count}= await getDataWithPage('posts',page,cat);
 
    const haseNext=page<count/2
    const hasPrev=page-1>0
  return (
    <div  className={styles.container}>
      <h1 className={styles.Title}>Recent Posts</h1>
      
          <div className={styles.CartContainer}>
          {
            posts?.map((item)=>(
            <div className={styles.Cart}>
                  <div className={styles.imageContainer}>
                    {
                      item.img &&(

                        <Image className={styles.image} src={item.img} alt=''  fill/>
                        )
                      
                    }
                  </div>
                  <div className={styles.contentContainer}>
                   
                    <p>{item.createdAt.substring(0,10)}</p>
                    <h1 className={styles.ContTitle}>{item.title}</h1>
                    <div className={styles.ContDesc} dangerouslySetInnerHTML={{__html:item?.description.substring(0,60)}}/> 
                    <Link href={`/posts/${item.slug}`} className={styles.button} >Read More</Link>
                  </div>
            </div>
             ))
            }
          </div>
       
     <Pagination page={page} haseNext={haseNext} hasPrev={hasPrev}/>
    </div>
  )
}

export default CardList