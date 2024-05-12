"use client"
import React,{useState,useEffect}from 'react'
import styles from './Comments.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import  useSWR, { mutate } from 'swr';

const handleLikesPost = async(emailUser,mutate,commentIdForLike)=>{
  console.log(commentIdForLike)
      const res = await fetch(`http://localhost:3000/api/likeComments`,{method:"POST",body:JSON.stringify({emailUser,commentIdForLike})})
        if(res.ok){
          mutate();
        }
      }
const handleDelteLike =async(emailUser,mutate,commentIdForLike)=>{
          const res= await fetch(`http://localhost:3000/api/likeComments`,{method:"DELETE",method:"DELETE",body:JSON.stringify({emailUser,commentIdForLike})});
          if(res.ok){
            mutate();
          }
      }
const handleMouseEnter = (setShowDiv) => {
        setShowDiv(true);
      };
    
const handleMouseLeave = (setShowDiv) => {
        setShowDiv(false);
      };



function Icons({commentIdForLike,sessionUserData}) {
  const [showDiv, setShowDiv] = useState(false);
  const [CommentId, setCommentId] = useState("");
  const [userEmail, setUserEmail] = useState("")
  console.log(commentIdForLike)
  
  
  
  
  const fetcher =async (url)=>{
     
    const res =await fetch(url)
      if(res.ok){
        const data= await res.json();
        
        console.log(data);
        
       return data
      }
        
  }
    
  const {data,mutate,isLoading}=useSWR(`http://localhost:3000/api/likeComments?commentIdForLike=${commentIdForLike}`,fetcher)
  if(isLoading) { return <p>Loading..</p>}
  const {usersLikeComments,userLoginIsLikeComment,nbrUsersWhouLikeComment}=data;
 
 

  return (
    <div className={styles.containerIcons}>
      <div className={styles.UsersLikes}>
        {nbrUsersWhouLikeComment >0 ?(<>
        <Image onMouseEnter={()=>handleMouseEnter(setShowDiv)}  src={'/usersLike.png'} alt={'ta'} height={32} width={32}/>{nbrUsersWhouLikeComment}
              {showDiv && <ShowUsersCol setShowDiv={setShowDiv} usersLikeComments={usersLikeComments}/>} 
              </>):""}
        
      </div>

    <div className={styles.heartImageContainer}>
      {userLoginIsLikeComment ?(
        <div className={styles.heartImageContainer}>
          <Image  onClick={()=>handleDelteLike(sessionUserData,mutate,commentIdForLike)}   alt='heart' src={"/like.png"} width={32} height={32}/>
            <span  style={{marginLeft:"10px"}}>Like</span>
        </div>
      ) :(
          <div className={styles.heartImageContainer}>
              <Image  onClick={()=>handleLikesPost(sessionUserData,mutate,commentIdForLike)}   alt='heart' src={"/heart.png"} width={32} height={32}/>
            <span  style={{marginLeft:"10px"}}>Like</span>
          </div>
          )}


    </div>

    

</div>
  )
}

export default Icons

function ShowUsersCol({usersLikeComments,setShowDiv}){
  return (
    <div>
      
      <div onMouseLeave={()=>handleMouseLeave(setShowDiv)} className={styles.UsersCol}>
        
                    {usersLikeComments.map(User=>(
                        <Link href={`/profile/${User.userEmail}`}>{User.user.name}</Link>
                  ))}
                  </div>

    </div>
  )
}

