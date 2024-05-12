import React from 'react'
import styles from './Featured.module.css'
import Image from 'next/image'
function Featured() {
  return (
    <div className={styles.container}>
      
      {/* text container */}
      
        <h1 className={styles.TextContainer}><b>Hey Evry One !</b>Discover my stories and creative ideas.</h1>
      
     
      {/* Content container */}
      <div className={styles.ContentContainer}>

        {/* image container */}
        <div className={styles.ImageContent}>
          <Image className={styles.Image} src={'/p1.jpeg'} alt='' fill/>
        </div>
        
        {/* text conatiner */}
        <div className={styles.textContent}>
          <h1 className={styles.textTitle}>Simple Ways to Inspire Inner Innovator</h1>
          <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia id aliquid quae provident laborum adipisci!</p>
          <button className={styles.button}>Read More</button>
        </div>

      </div>
    </div>
  )
}

export default Featured