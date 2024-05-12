import React from 'react'
import styles from './MenuPost.module.css'
import Link from 'next/link'
import Image from 'next/image'
function MenuPost({withImage}) {
  return (
    <div className={styles.container}>
    
       
        <Link href={'/'} className={styles.item}>
          {withImage &&(
            <div className={styles.imageContiner}>
            <Image src={'/p1.jpeg'} className={styles.image} fill/>
          </div>
          )}
          
          <div className={styles.contentContiner}>
            <span className={`${styles.category} ${styles.travel}`}>
              Travel
            </span>
              <p className={styles.desc}>Lorem ipsum dolor sit amet.</p>
            <p className={styles.Date_User}><span  className={styles.User}>John Dew </span > 01.09.2023</p>
          </div>

        </Link>

        <Link href={'/'} className={styles.item}>
          {withImage &&(
            <div className={styles.imageContiner}>
            <Image src={'/p1.jpeg'} className={styles.image} fill/>
          </div>
          )}
          
          <div className={styles.contentContiner}>
            <span className={`${styles.category} ${styles.culture}`}>
             Culture
            </span>
              <p className={styles.desc}>Lorem ipsum dolor sit amet.</p>
            <p className={styles.Date_User}><span  className={styles.User}>John Dew </span > 01.09.2023</p>
          </div>

        </Link>

        <Link href={'/'} className={styles.item}>
          {withImage &&(
            <div className={styles.imageContiner}>
            <Image src={'/p1.jpeg'} className={styles.image} fill/>
          </div>
          )}
          
          <div className={styles.contentContiner}>
            <span className={`${styles.category} ${styles.coding}`}>
             Coding
            </span>
              <p className={styles.desc}>Lorem ipsum dolor sit amet.</p>
            <p className={styles.Date_User}><span  className={styles.User}>John Dew </span > 01.09.2023</p>
          </div>

        </Link>
        <Link href={'/'} className={styles.item}>
          {withImage &&(
            <div className={styles.imageContiner}>
            <Image src={'/p1.jpeg'} className={styles.image} fill/>
          </div>
          )}
          
          <div className={styles.contentContiner}>
            <span className={`${styles.category} ${styles.fashion}`}>
              Fachion
            </span>
              <p className={styles.desc}>Lorem ipsum dolor sit amet.</p>
            <p className={styles.Date_User}><span  className={styles.User}>John Dew </span > 01.09.2023</p>
          </div>

        </Link>

     
     
    </div>
  )
}

export default MenuPost