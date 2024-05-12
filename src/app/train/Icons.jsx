"use client"
import React,{useState}from 'react'
import styles from './PostUser.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Comments from '../Components/Comments/Comments'



function Icons({postSlug,userEmail}) {
    
    const [like, setLike] = useState(false)
    const handleLike = ()=>{
        setLike(!like);
    
    }
  return (
    <div className={styles.containerIcons}>

        <div className={styles.heartImageContainer}>
            <Image onClick={handleLike} alt='heart' src={like?"/like.png":"/heart.png"} width={32} height={32}/>
                <span style={{marginLeft:"10px"}}>Like</span>

        </div>

        <div className={styles.CommentImageContainer}>
            <Image alt='comment' src={'/comment.png'} width={40} height={40}/>
                <span>Comment</span>
        </div>

      <Comments userEmail={userEmail} postSlug={postSlug}/>

</div>
  )
}

export default Icons