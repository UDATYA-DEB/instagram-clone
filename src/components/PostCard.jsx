import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';
import './styles/logo.css'


const PostCard = ({caption, imageURL, userEmail, userName, uploadDate}) => {
    const firebaseContext = useFirebase();
    const [imgURL, setImgURL] = useState('')
    const [postDp, setPostDp] = useState('')
    const dpLoader = './images/default_img.webp'

    useEffect(()=>{
      firebaseContext.fetchPostDp(userEmail)
      .then((result)=>{
        setPostDp(result)
      })
    }, [firebaseContext,userEmail])

    useEffect(()=>{
        firebaseContext.getImage(imageURL)
        .then((url)=>setImgURL(url))
      },[firebaseContext,imageURL])
    return (
        <Card style={{ width: '469px', border: 'none', borderBottom: '1px solid #dbdbdb', borderRadius: '0'}}>
          <div style={{margin: '10px 0', display: 'flex', alignItems: 'center'}}>
            <img className='dp' src={postDp ? postDp : dpLoader} alt={'user'} />
            <p style={{margin: '0', marginLeft: '10px'}}>{userName}</p>
          </div>
          <Card.Img variant="top" src={imgURL ? imgURL : dpLoader} style={{borderRadius: '4px', maxHeight: '563px', objectFit: 'cover', objectPosition: 'top'}} />
          <Card.Body style={{padding: '25px 0'}}>
            <Card.Title>{caption}</Card.Title>
            <div style={{marginTop: '22px'}}>
            {firebaseContext.currentUser.email === userEmail && <Button onClick={()=>firebaseContext.updatePostNo(userEmail)} variant="primary">Delete post</Button>}
            </div>
          </Card.Body>
        </Card>
      );
}

export default PostCard