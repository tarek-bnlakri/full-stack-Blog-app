"use client"
import React,{useState} from 'react'
import styles from './SinglePAge.module.css'
import { useRouter } from 'next/navigation'

// DELETE METHODE
const  onDeletePost=async(id,userEmail,router)=>{
    const res =await fetch('http://localhost:3000/api/posts',{method:"DELETE",body:JSON.stringify({userEmail,id})})
    if(res.ok){
        router.push('/');
    }

}
function Option({id,userEmail}) {

    const [menuDelete, setMenuDelete] = useState(false)

  return (
    <div className={styles.containerOption}>
        {menuDelete &&(<MenuDelte userEmail={userEmail} id={id} setMenuDelete={setMenuDelete}/>)}
        <div onClick={()=>setMenuDelete(true)} className={styles.option}>
            <div className={styles.point}></div>
            <div className={styles.point}></div>
            <div className={styles.point}></div>
        </div>
    </div>
    
  )
}

function MenuDelte({setMenuDelete,id,userEmail}){
    const router = useRouter();
    
    return (
        <div className={styles.MenuDelete}>
            <div className={styles.Delete}><button onClick={()=>setMenuDelete(false)} className={styles.buttonDelete}>X</button></div>
            <div onClick={()=>onDeletePost(id,userEmail,router)} className={styles.msage}>Delete Post</div>
        </div>
    )
}

export default Option