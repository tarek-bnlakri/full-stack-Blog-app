"use client"
import React,{useState,useEffect} from 'react'
import styles from './CardList.module.css'
// import Pagination from '../Pagination/Pagination'
import Image from 'next/image'
import Link from 'next/link'





 function CardList({emailUser}) {
  console.log('+++++++++',emailUser)
  const [userPosts, setUserPosts] = useState([{}])  ;
  const [loading, setloading] = useState(false);
  const [check, setCheck] = useState(false);


  useEffect(() => {
    setloading(true);
    const getPostsUser=async()=>{
      console.log('********************',emailUser)
          const res = await fetch(`http://localhost:3000/api/user/userPosts/${emailUser}`)
            if(res.ok){
                const data = await res.json();
                setUserPosts(data)
                setloading(false)
                setCheck(true)
            }
            else{
              throw new Error("Couldn't find posts ");
            }
  
    }
    getPostsUser();
  
  }, [emailUser])
 
    // const haseNext=page<count/2
    // const hasPrev=page-1>0
  return ( 
  <>
   
    {loading ?(<p>loading...</p>):(
      <>
      {check &&(
        <div  className={styles.container}>
      
        <h1 className={styles.Title}>Recent Posts</h1>
        
            <div className={styles.CartContainer}>
            {
              userPosts?.map((item)=>(
              <div className={styles.Cart}>
                   
                      { 
                        item.img &&(
                          <div className={styles.imageContainer}>
  
                             <Image className={styles.image} src={item.img} alt=''  fill/>
                          </div>
                          )
                      }
                    
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
         
       {/* <Pagination page={page} haseNext={haseNext} hasPrev={hasPrev}/> */}
      </div>
     

      )}
     </>
    )}
    

    
  </>
  )
  
}

export default CardList