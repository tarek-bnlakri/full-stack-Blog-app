'use client'
import Image from 'next/image'
import styles from './WritePage.module.css'
import { useState,useEffect } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.bubble.css"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  useSWR, { mutate } from 'swr';

function WritePage() {
  const navigate=useRouter();
  const {status}=useSession();
  if(status === 'unauthenticated')
      navigate.push('/');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null)
  const [catigory, setCatigory] = useState("");
  const [media, setMedia] = useState("");
  const [imagestate, setImageState] = useState(false);
 


  
    
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
              notifySuccses("Image upload completed");
            });
          }
        );
    }
  
    file && upload(); 
  }, [file])

 


   const slugify = (str) =>
      str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
      console.log(title);
      
      const notifySuccses=(data)=>{
        toast.success(data,{autoClose:2000,theme: "colored"});

      }
      

      const onSubmit=async()=>{
        if(!title)
            return toast.error("Ops Title is required !!",{autoClose:2000,theme: "colored"});
        if(!value)
            return toast.error("Ops description  is required !!",{autoClose:2000,theme: "colored"});
        
        
            value
       
        const res= await fetch("/api/posts",{
          method: "POST",
          body: JSON.stringify({
            description:value,
            img:media,
            title,
            catSlug:catigory,
            slug:slugify(title)
          })
        })
        const data= await res.json();
        console.log(res);
       if(res.status === 200){
          notifySuccses("Post added successfully ");
        
          navigate.push(`/posts/${data.slug}`)
       }
      
      
      }
    
    

if (imagestate)
      return (<div className={'loaderContainer'}>
      <div className={'loader'}></div>
      </div>
      )

  return (
    <div className={styles.container}>
      
     

      <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title' className={styles.input} />
      
      <select value={catigory} className={styles.select} onChange={(e) => setCatigory(e.target.value)}>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>

      <div className={styles.editor}>
        <button onClick={()=>setOpen(!open)} className={styles.button}>
          <Image src={'/add.png'} alt='' width={18} height={18}/>

        </button>
        {open && (
           <div className={styles.add}>
              <input id='image' style={{display:"none"}} type="file" onChange={(e)=>setFile(e.target.files[0])} />
             <button className={styles.addbutton}>
              <label htmlFor="image">
                <Image  src={'/Image.png'} alt='' height={18} width={18}/>
              </label>
             </button>
             <button className={styles.addbutton}>
             <Image  src={'/Image.png'} alt='' height={18} width={18}/>

             </button>
             <button className={styles.addbutton}>
             <Image  src={'/Video.png'} alt='' height={18} width={18}/>
             </button>
           </div>
        )}
        <ReactQuill className={styles.textArea} theme='bubble' value={value} onChange={setValue} placeholder='tell tour story ...'/>

      </div>
      <button onClick={onSubmit} className={styles.publish}>Publish</button>
      <ToastContainer />
    </div>
  )
}

export default WritePage