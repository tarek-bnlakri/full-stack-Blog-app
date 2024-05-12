"use client"
import React ,{useState,useContext,useEffect}from 'react'
import styles from "../profile.module.css"
import Image from 'next/image'
import Edit from '../edit'
import { Mycontext } from '../Context'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import  { mutate } from 'swr';
import CardList from '../CardList'



function Profile({params}) {
    const [sessionEmail, setSessionEmail] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate=useRouter();
    const {data,status}=useSession();
    const {edit,setEdit,userProf,setUserProf}= useContext(Mycontext)
    
    const {emailUser} = params;
    const decodedEmail = decodeURIComponent(emailUser);
    if(status === 'unauthenticated')
        navigate.push('/');
   
    
   


    useEffect(() => {
        const getData=async()=>{
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/user/profile/${emailUser}`)
            if(!res.ok)
                throw new Error("Couldn not connect to server");

            
            const data= await res.json();
             setUserProf(data)
             setLoading(false);
                
        }
        getData();
        mutate()
     
    }, [emailUser])
    
  useEffect(() => {
    const setEmail=()=>{
      
        if(decodedEmail==data.user.email)
            setSessionEmail(true)
    }
   
  
    data && setEmail();
  }, [data])
        
    
  console.log("from session"+sessionEmail)
   
   if (loading){
    return (
        <div className={'loaderContainer'}>
                <div className={'loader'}></div>
        </div>
    )
   }
  
  return (
        <div>
        {loading && (
            <div className={'loaderContainer'}>
                <div className={'loader'}></div>
            </div>

        )}
       
        {edit && (
            <div className={styles.ProfileContinerEdit}><Edit edit={edit} setEdit={setEdit} userProf={userProf} setUserProf={setUserProf} /></div>
                
        )}    
       
        <div className={styles.Profilecontainer}>
            <div className={styles.cartProfile}>
                <div className={styles.user}>
                    <h3>{userProf.name}</h3>
                    <h5>{userProf.email}</h5>
                </div>
                <div className={styles.content}>
                <Image className={styles.image} src={userProf.image} alt='h' width={90} height={90}/>
                    <p className={styles.Bio}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, neque.
                    </p>
                    {sessionEmail && (<button onClick={()=> setEdit(true)} className={styles.edit}>Edit</button>)}
                </div>

            </div>
            <div className={styles.PostsContainer}>
                    <CardList emailUser={decodedEmail} />

            </div>

        </div>
        </div>
  )
}

export default Profile