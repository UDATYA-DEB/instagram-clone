import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/firebase'
import CommentEditModal from './CommentEditModal'

const Commenters = ({comm, commentPath}) => {
  // console.log(comm)
    const {userEmail, comment, userName} = comm
    const [commentDp, setCommentDp] = useState('./images/default_img.webp')
    const firebaseContext = useFirebase();
    const [open, setOpen] = useState(false)
    console.log(commentPath)
    
    useEffect(()=>{
        firebaseContext.fetchPostDp(userEmail)
        .then((result)=>{
          setCommentDp(result)
        })
      }, [firebaseContext,userEmail])
      
      const handleOpen = ()=> setOpen(true)

  return (
    <div className='dp-middle-uname-comment-container'>
        <img className='dp' src={commentDp} alt="dp" />
        <div style={{marginLeft: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <p style={{margin: '0', padding: '0', fontSize: '14px'}}><span style={{margin: '0', padding: '0', fontWeight: '600'}}>{userName}</span> {comment}</p>
            <div onClick={handleOpen}>
              <img className='meatball-menu-comment' src="./images/meatball-menu.webp" alt="menu" style={{objectFit: 'cover', height: '15px', width: '15px', cursor: 'pointer'}}/>
            </div>
        </div>
        <CommentEditModal setOpen={setOpen} open={open} commentPath={commentPath} userEmail={userEmail}/>
    </div>
  )
}

export default Commenters