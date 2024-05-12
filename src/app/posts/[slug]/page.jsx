import React from 'react'
import styles from './SinglePAge.module.css'
import Menu from '../../Components/Menu/Menu'
import Image from 'next/image'
import Comments from '../../Components/Comments/Comments'
import { getAuthSession } from "@/utils/auth";
import Option from './Option'
import { redirect } from 'next/navigation'
import Icons from './Icons'


const getData =async (slug) =>{
    const res = await fetch(`http://localhost:3000/api/posts/${slug}/`,{cache:"no-store"}); 
    if(!res.ok){
        throw new Error ("Couldn't find post")
    }
    return res.json();

}
async function  page({params}) {
    const session = await getAuthSession();

    if(!session){
        redirect('/login');

    }
    
    const {slug}=params;
    const data = await getData(slug);

    if(!data){
        redirect('/');
    }
   
    const {id,userEmail}=data;
    

 
  return (
    <div className={styles.container}>
      
        <div className={styles.postinfo}>

            <div className={styles.textinfo}>
                        <div className={styles.headInfo}>
                            <div className={styles.userInfo}>
                                {data?.user?.image &&(
                                    <Image style={{borderRadius:"50%"}} src={data?.user?.image} alt='' width={48} height={48}/>
                                )}
                            
                                <p className={styles.userName}>{data?.user?.name} <br />  
                                    <span className={styles.date}>
                                        {data?.createdAt.substring(0,10)}
                                    </span>
                                </p>
                            </div>
                              {data.userEmail=== session?.user?.email ?(
                                <Option   id={id} userEmail={userEmail} />
                                ):""}
                        </div>
                <h1 className={styles.title}>{data?.title}</h1>
                <div className={styles.descr} dangerouslySetInnerHTML={{__html:data?.description}}/>
                        
            </div>

            <div className={styles.containerImage}>
                        {data?.img &&(
                            <Image className={styles.image} src={data?.img} alt='' fill/>
                        )} 
            </div>
            <Icons slug={slug} />
        </div>
        <div className={styles.contentContiner}>
            <div className={styles.content}>
                 <Comments userEmail={userEmail} postSlug={slug}/>
            </div>
            <Menu/>
        </div>
          
                
    </div>
  )
}

export default page