"use client"
import React,{useState,useEffect} from 'react'
import styles from "./profile.module.css"
import { Mycontext } from './Context'
import  useSWR, { mutate } from 'swr';
import Image from 'next/image'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase'
// PUT Methode 
const handleSubmit=async(userName,media,emailUser,mutate)=>{
    const res =await fetch(`http://localhost:3000/api/user/${emailUser}`,{method:'PUT',body:JSON.stringify({userName,media})})
    if(!res.ok){
        throw new Error('Could not connect to server ')
    }

    mutate();
    

}
   
function Edit({userProf,setUserProf,edit,setEdit}) {
    const {name,email,image}=userProf
    const [userName, setUserName] = useState("")
    const [file, setFile] = useState(null)
    const [media, setMedia] = useState(image);
    const [ImageState, setImageState] = useState(false);

  
 
    
 
    useEffect(() => {
        setUserName(name)
    },[userProf])
console.log(file)

    useEffect(() => {
   
        const storage = getStorage(app);
        const upload=()=>{
          const name = new Date().getTime()+file.name;
          const storageRef = ref(storage, name);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed', 
              (snapshot) => {
                
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageState(true);
                setImageState(snapshot.state)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, 
              (error) => {
                
              }, 
              () => {
              
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setMedia(downloadURL);
                  setImageState(false);
                 
                });
              }
            );
        }
      
        file && upload(); 
      }, [file])


   
    
   
    const setProf=setUserProf
    
    // GET User Information
    const fetcher =async(url)=>{
        const res= await fetch(url)
        if(!res.ok){
            throw new Error("Couldn't fetch edit data from server ")
        }
        const data =res.json();
        return data;

    }

    const {data,isLoading,mutate} =useSWR(`http://localhost:3000/api/user/profile/${email}`,fetcher)
    if(isLoading){
        return (
            <div className={'loaderContainer'}>
                    <div className={'loader'}></div>
            </div>
        )
    }
  
    setUserProf(data)
    

    
        return(
            <div className={styles.EditContainer}>
               
                <div className={styles.head}>
                        <h1>Edit Your Profile</h1>
                        <button className={styles.Out} onClick={()=>setEdit(false)}>X</button>
                </div>
                
                <div className={styles.InputContainer}>
                    <input onChange={(e)=> setUserName(e.target.value)} value={userName} type="text" className={styles.input}/>
                    <input disabled  value={email} type="text" className={styles.input}/>

                        <div className={styles.ImageContinaer}>
                          {ImageState?(<div className={'loaderContainer'}>
                                            <div className={'loader'}></div>
                                         </div>
                                         ):(<>
                                         <p className={styles.text}>New Photo</p>
                                         <input style={{display:"none"}} type='file' id='image' onChange={(e)=>setFile(e.target.files[0])}/>
                                      <label htmlFor="image">
                                      <Image  width={90} height={90} src={media} className={styles.image}/>
                                      </label></>)}
                            
                                         
                                         
                              

                            <button onClick={()=>handleSubmit(userName,media,email,mutate)} className={styles.edit}>Chnage Profile</button>
                            
                        </div>

                        
                    
                </div>
            </div>
        )
}
export default Edit