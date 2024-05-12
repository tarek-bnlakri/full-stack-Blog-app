"use client"
import React,{useState} from 'react'
import styles from './Comments.module.css'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// DELETE METHODE
const  onDeletePost=async(commentId,emailOfTheUserPost,emailOfTheUserComment,mutate)=>{
    const res =await fetch('http://localhost:3000/api/comments',{method:"DELETE",body:JSON.stringify({commentId,emailOfTheUserPost,emailOfTheUserComment})})
    if(res.ok){
        mutate();
        toast.success("Comment Deleted ",{autoClose:2000,theme: "colored"});
    }
        

}
function Option({commentId,emailOfTheUserPost,emailOfTheUserComment,mutate}) {
   
    
    
  
    const [menuDelete, setMenuDelete] = useState(false)

    
   

  return (
    <div className={styles.containerOption}>
        {menuDelete &&(<MenuDelte mutate={mutate} emailOfTheUserComment={emailOfTheUserComment} commentId={commentId} emailOfTheUserPost={emailOfTheUserPost} setMenuDelete={setMenuDelete}/>)}
        <div onClick={()=>setMenuDelete(true)} className={styles.option}>
            <div className={styles.point}></div>
            <div className={styles.point}></div>
            <div className={styles.point}></div>
        </div>
        <ToastContainer/>
    </div>
    
  )
}

function MenuDelte({setMenuDelete,commentId,emailOfTheUserPost,emailOfTheUserComment,mutate}){
    const router = useRouter();
    console.log(commentId)
    console.log(emailOfTheUserPost)
    console.log(emailOfTheUserComment)
    return (
        <div className={styles.MenuDelete}>
            <div className={styles.Delete}><button onClick={()=>setMenuDelete(false)} className={styles.buttonDelete}>X</button></div>
            <div onClick={()=>onDeletePost(commentId,emailOfTheUserPost,emailOfTheUserComment,mutate)} className={styles.msage}>Delete Post</div>
        </div>
    )
}

export default Option