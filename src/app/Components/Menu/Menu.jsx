import React from 'react'
import styles from './Menu.module.css'
import Link from 'next/link'
import MenuPost from "@/app/Components/MenuPost/MenuPost"
function Menu() {
  return (
    <div className={styles.container}>
      <div className={styles.popular}>
        <span  className={styles.subtitle}>What's hot</span>
        <h1  className={styles.title}>Most Popular</h1>
      
        <MenuPost withImage={false}/>

      </div>
      <div className={styles.categories}>
         <span  className={styles.subtitle}>What's hot</span>
          <h1  className={`${styles.title}`}>Categories</h1>
          <div className={styles.parent}>
            <Link href={'/'} className={`${styles.div} ${styles.style}`}>
              Style
            </Link >
            <Link href={'/'} className={`${styles.div} ${styles.fashion}`}>
              Fachion
              </Link >
            <Link href={'/'} className={`${styles.div} ${styles.coding}`}>
              Coding
              </Link >
            <Link href={'/'} className={`${styles.div} ${styles.culture} `}>
              Culture
              </Link >
            <Link href={'/'} className={`${styles.div} ${styles.travel}`}>
              Travel
            </Link >
            <Link href={'/'} className={`${styles.div} ${styles.food}`}>
              Food
              </Link>
          </div>

      </div>
      <div className={styles.editors}>
      <span  className={styles.subtitle}>Chosen by the editor</span>
        <h1  className={styles.title}>Editors Pick</h1>
        <MenuPost withImage={true} />
      
      </div>
    </div>
  )
}

export default Menu