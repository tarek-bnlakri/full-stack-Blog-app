"use client"
import React,{useState,useEffect}from 'react'
import styles from './PostUser.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import  useSWR, { mutate } from 'swr';
const handleLikesPost = async(emailUser,slug,mutate)=>{
      const res = await fetch(`http://localhost:3000/api/likePosts/${slug}`,{method:"POST",body:JSON.stringify({emailUser})})
        if(res.ok){
          mutate();
        }
      }
const handleDelteLike =async(emailUser,slug,mutate)=>{
          const res= await fetch(`http://localhost:3000/api/likePosts/${slug}`,{method:"DELETE",method:"DELETE",body:JSON.  stringify({emailUser})});
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
function Icons({slug}) {
  const {data:dataSession}=useSession();
  useEffect(() => {
    dataSession && setEmailUser(dataSession.user.email);
  }, [dataSession])
 
  const [emailUser,setEmailUser]=useState('');
  const [showDiv, setShowDiv] = useState(false);


  
 
  
  const fetcher =async (url)=>{
     
    const res =await fetch(url)
      if(res.ok){
        const data= await res.json();
       return data
      }
        
  }
    
  const {data,mutate,isLoading}=useSWR(`http://localhost:3000/api/likePosts/${slug}`,fetcher)
  if(isLoading) { return <p>Loading..</p>}
  const {usersLike,userLoginIsLike,nbrUsersWhouLike}=data;
  
 

  return (
    <div className={styles.containerIcons}>
      <div className={styles.UsersLikes}>

        <Image onMouseEnter={()=>handleMouseEnter(setShowDiv)}  src={'/usersLike.png'} alt={'ta'} height={32} width={32}/>{nbrUsersWhouLike}

        {usersLike.length <=2 ? ( <ShowUsersRow usersLike={usersLike} />)
        :( <>
              

              {showDiv && <ShowUsersCol setShowDiv={setShowDiv} usersLike={usersLike}/>} 
            </>)}
        
         
       
        
      </div>

    <div className={styles.heartImageContainer}>
      {userLoginIsLike ?(
        <div className={styles.heartImageContainer}>
          <Image  onClick={()=>handleDelteLike(emailUser,slug,mutate)}   alt='heart' src={"/like.png"} width={32} height={32}/>
            <span  style={{marginLeft:"10px"}}>Like</span>
        </div>
      ) :(
          <div className={styles.heartImageContainer}>
              <Image  onClick={()=>handleLikesPost(emailUser,slug,mutate)}   alt='heart' src={"/heart.png"} width={32} height={32}/>
            <span  style={{marginLeft:"10px"}}>Like</span>
          </div>
          )}


    </div>

    

</div>
  )
}

export default Icons

function ShowUsersCol({usersLike,setShowDiv}){
  return (
    <div>
      
      <div onMouseLeave={()=>handleMouseLeave(setShowDiv)} className={styles.UsersCol}>
        
                    {usersLike.map(User=>(
                        <Link href={`/profile/${User.userEmail}`}>{User.user.name}</Link>
                  ))}
                  </div>

    </div>
  )
}

function ShowUsersRow({usersLike}){
  
  return (
    <div>
      <div  className={styles.Usersrow}>
       
             {usersLike.map((email)=>(
                <div>
               <Link href={`/profile/${email.userEmail}`}>{email.user.name},</Link>
               </div>
        ))}
       
        </div>

    </div>
  )
}