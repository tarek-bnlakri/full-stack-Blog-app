"use client"
import { signIn, useSession } from 'next-auth/react'
import styles from './login.module.css'
import { useRouter } from 'next/navigation';

function Login() {
  const navigate=useRouter();
  const {data,status}=useSession();
  console.log(data,status);
  if(status === 'loading')
    return (<div className={styles.login}>Loading...</div>)
  if(status === 'authenticated')
      navigate.push('/');

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div onClick={()=>signIn('google')} className={styles.socialMedia}> Sign In with Google</div>
            <div className={styles.socialMedia}> Sign In with Facbook</div>
            <div  className={styles.socialMedia}> Sign In with Github</div>

        </div>

    </div>
  )
}

export default Login