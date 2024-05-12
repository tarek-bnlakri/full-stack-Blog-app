"use client"
import { useState,useEffect } from 'react';
import Image from 'next/image'
import styles from './Comments.module.css'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import  useSWR, { mutate } from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Option from './Option';
import Icons from './Icons';


const handleComment=(id,setCommentId,emailUserOfComment,emailUserOfPost,setEmailOfTheUserComment,setEmailOfTheUserPost)=>{
   

    setEmailOfTheUserComment(emailUserOfComment);
    setEmailOfTheUserPost(emailUserOfPost);
    setCommentId(id);

}

const handleLike=(id,setCommentIdForLike)=>{
    setCommentIdForLike(id);
}

const notifyErr=(data)=>{
    toast.error(data,{autoClose:2000,theme: "colored"});

  }
  const notifySuccses=(data)=>{
    toast.success(data,{autoClose:2000,theme: "colored"});

  }


// add new  Comments
 const onSubmit=async(description,slugpost,mutate,setDescription)=>{
    const res=await fetch("/api/comments",{method: "POST",
        body:JSON.stringify({description,slugpost})
        
    })
    setDescription('');
    const data= await res.json();
    if(res.status === 400)
            notifyErr(data)
    if(res.status === 200)
        notifySuccses(data);
    mutate();
}


// MY Components
function Comments({postSlug,userEmail}) {
    const {data:sessionData,status}= useSession();
    const [sessionUserData, setSessionUserData] = useState('');
    useEffect(() => {
      
    
        sessionData && setSessionUserData(sessionData.user.email)
    }, [sessionData])
    

    const [commentIdForLike, setCommentIdForLike] = useState('')
    const [commentId, setCommentId] = useState('');
    const [emailOfTheUserComment, setEmailOfTheUserComment] = useState('');
    const [emailOfTheUserPost, setEmailOfTheUserPost] = useState('');

    const  fetcher = async (url)=>{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error("Could not fetch Comments ");
        }
        
        const data = await res.json();
        
        return data;
    }
   const [description, setDescription] = useState("");
   
   

    const {data,mutate,isLoading}=useSWR(`http://localhost:3000/api/comments?postSlug=${postSlug}`,fetcher)
   
    if(isLoading){
        return (
            <div className={'loaderContainer'}>
                <div className={'loader'}></div>
            </div>
                )
    }
    
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Comments</h1>
        {status === "authenticated" ?(
            <div >
                <div className={styles.userInput}>
                    <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className={styles.input} placeholder='Write comment...'>
                    </textarea>
                    <button onClick={()=>onSubmit(description,postSlug,mutate,setDescription)} className={styles.button}>Save
                    </button>
                    
                </div>
                
                
                
            </div>
            
        ) :(<Link className={styles.link} href={'/login'}>
            Login to write a comment
            </Link>
            )}
        
       
                <div className={styles.comentContainer}>
               
                {data?.map(item=>(
                    < div key={item.id} className={styles.item}>
                        <div className={styles.CantinerInfo}>
                            <div className={styles.userInfo}>
                                {
                                    item.user?.image &&(
                                    <Link href={`/profile/${item.user?.email}`}>
                                    <Image src={ item.user?.image} alt='' width={48} height={48} className={styles.image}/>
                                    </Link>

                                    )
                                }
                                <p className={styles.info}>
                                    <span className={styles.username}>
                                        {item.user?.name}
                                    </span>
                                
                                    <span className={styles.date}>
                                    {item.createdAt.substring(0,10)}
                                    </span>
                                </p>
                            </div>
                            <div className={styles.OpstionAndLIke}>
                            {(item.userEmail === sessionUserData || userEmail===sessionUserData) &&(
                               <div onClick={()=>(handleComment(item.id,setCommentId,item.userEmail,userEmail,setEmailOfTheUserComment,setEmailOfTheUserPost))}>
                                    <Option mutate={mutate} emailOfTheUserPost={emailOfTheUserPost} emailOfTheUserComment={emailOfTheUserComment} commentId={commentId}/>
                                </div> 
                            ) }
                                
                                <Icons  sessionUserData={sessionUserData} commentIdForLike={item.id}/>
                                
                           </div>
                        </div>
                        <p className={styles.userComent}>
                           {item.description}
                        </p>
                        
                    </div>
                     )) }  
                </div>
              

           
                <ToastContainer/>
        
    </div>

  )
}

export default Comments