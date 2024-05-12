import Option from '@/app/posts/[slug]/Option'
import Image from 'next/image'
import React from 'react'
import './postUser.css'
import EvenetClickButtons from './EvenetClickButtons'
function PostUser() {
  return (
    <div className='postUserContainer'>

        <div className='userInfoContainer'>
            <div className='userInfoContainerLeft'>
                <div className='profileImageUser'><Image style={{borderRadius:"50%"}} width={48} height={48} src={'/p1.jpeg'}/>
                </div>

                <div className='userInfo'>
                    <p>TAREK BENLAKRI</p>
                    <p>20/03/2024</p>
                </div>

            </div>

            <div className='userInfoContainerRight'><Option/></div>
        </div>

        <div className='description'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi eos ullam laborum inventore possimus.
        </div>

        <div className='ImageContainer'>
            <Image className='image' src={'/p1.jpeg'} fill/>
        </div>
        <div className='containerEventClick'>

            <EvenetClickButtons/>

        </div>

        
        
    </div>
  )
}

export default PostUser