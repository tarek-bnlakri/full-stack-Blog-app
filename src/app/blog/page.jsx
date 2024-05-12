import React from 'react'
import CardList from '../Components/CardList/CardList'
import styles from './BlogPage.module.css'
import Menu from '../Components/Menu/Menu'

function Blog({searchParams}) {
  const page = parseInt(searchParams.page) || 1;
  const {cat} =searchParams;
  return (
    <div className={styles.container}>
        <h1 className={styles
        .title}>
            {cat}  Blog
        </h1>
        <div className={styles.content}>
            <CardList cat={cat} page={page}/>
            <Menu/>

        </div>
        
    </div>
  ) 
}

export default Blog