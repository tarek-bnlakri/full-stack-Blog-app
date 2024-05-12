import React from 'react'
import styles from './PostUser.module.css'
import Image from 'next/image'
import Icons from './Icons'
import { getAuthSession } from "@/utils/auth";
async function PostUser() {
    const session = await getAuthSession();
  return (
    <section className={styles.container}>

        <div className={styles.CartUser}>

            <div className={styles.headCart}>

                <div className={styles.userInfo}>
                    <Image style={{borderRadius:"50%",objectFit:"none"}}  src={'/p1.jpeg'} alt='Profile' height={48} width={48}/>
                    <div className={styles.userNameAndDate}>
                        <p>Bellakri Tarek</p>
                        <p>02/09/2020</p>
                    </div>
                </div>

                <div>
                    <div className={styles.option}>
                            <div className={styles.pointe}></div>
                            <div className={styles.pointe}></div>
                            <div className={styles.pointe}></div>
                    </div>
                </div>

            </div>
            <div className={styles.body}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum doloribus assumenda hic odio nulla fugiat, vero corrupti amet recusandae praesentium!
            </div>

            <div className={styles.imagePostContainer}>
                <Image className={styles.imagePost} src={'/p1.jpeg'} fill/>
            </div>

            <div className={styles.friendLikesContainer}>
                <div className={styles.friendLikes}>
                 <Image src={'/like.png'} alt='' width={32} height={32}/>
                    <span>10</span>
                </div>
                
                <p>6 Comments</p>
            </div>
            <Icons/>
            


        </div>

    </section>
  )
}

export default PostUser