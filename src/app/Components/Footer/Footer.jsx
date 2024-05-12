import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
import Link from 'next/link'
function Footer() {
  return (
    <div className={styles.container}>

      <div className={styles.text}>
        <div className={styles.user}>
          <Image className={styles.image} src={'/logo.png'} alt='' width={48} height={48}/>
          <h2 className={styles.title}>Tarek Benlakri</h2>
        </div>
        <div className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, possimus quas. Delectus, tempora quod. Dolores repudiandae dolor suscipit laboriosam nemo, quaerat, mollitia
        </div>
        <div className={styles.social}>
          <Link href={'/'}></Link>
          <Link href={'/'}></Link>
          <Link href={'/'}></Link>
          <Link href={'/'}></Link>
        </div>
      </div>

      <div  className={styles.tags}>
        <div className={styles.item}>
          <h3 className={styles.title}>Links</h3>
            <p className={styles.link}>Home</p>
            <p className={styles.link}>Blog</p>
            <p className={styles.link}>About</p>
            <p className={styles.link}>Contact</p>
        </div>
        <div className={styles.item}>
            <h3 className={styles.title}>Tags</h3>
            <p className={styles.link}>Style</p>
            <p className={styles.link}>Fashion</p>
            <p className={styles.link}>Coding</p>
            <p className={styles.link}>Travel</p>
        </div>
        <div className={styles.item}>
            <h3 className={styles.title}>Social</h3>
            <p className={styles.link}>Facbook</p> 
            <p className={styles.link}>Instagram</p>
            <p className={styles.link}>Github</p>
            <p className={styles.link}>LinkedIn</p>
        </div>
      </div>

    </div>
  )
}

export default Footer