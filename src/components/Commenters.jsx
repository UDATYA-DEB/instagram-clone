import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/firebase'

const Commenters = ({comm}) => {
  // console.log(comm)
    const {userEmail, comment, userName} = comm
    // const imgDp = './images/default_img.webp'
    // const userName = 'Tester'
    // const caption = 'this is a test'
    const [commentDp, setCommentDp] = useState('./images/default_img.webp')
    const firebaseContext = useFirebase();

    
    useEffect(()=>{
        firebaseContext.fetchPostDp(userEmail)
        .then((result)=>{
          setCommentDp(result)
        })
      }, [firebaseContext,userEmail])

  return (
    <div className='dp-middle-uname-container'>
        <img className='dp' src={commentDp} alt="dp" />
        <div>
            <p style={{margin: '0', padding: '0', marginLeft: '16px'}}><span style={{margin: '0', padding: '0', fontWeight: '700'}}>{userName}</span> {comment}</p>
        </div>
    </div>
  )
}

export default Commenters