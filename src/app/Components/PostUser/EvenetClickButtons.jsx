'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import ListOfUsersLike from './ListOfUsersLike'
function EvenetClickButtons() {
  const [listLikes, setListLikes] = useState(false)
  return (
    <>  
        {listLikes && (
          <ListOfUsersLike/>
        )}
        <div className='LikesAndComments'>
                <div className='usersWhoLikes'>
                    <Image src='/usersLike.png' style={{borderRadius:"50%"}} width={24} height={24}/>
                    <span onClick={()=>setListLikes(!listLikes)} className='nbrUsers'>10</span>
                </div>

                <div className='Comments'>
                    44 Comment
                </div>
        </div>

        <div className='buttonContainer'>
                <span className='buttonHeart'>
                    <Image  width={24} height={24} src='/heart.png' />
                </span> 
                <span className='buttonComments' >Comments</span>
        </div>
    </>
  )
}

export default EvenetClickButtons