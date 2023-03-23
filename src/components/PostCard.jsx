import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';
import './styles/logo.css'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { GrEmoji } from 'react-icons/gr'
import './styles/post.css'
import ImageActions from './ImageActions';


const PostCard = ({caption, imageURL, userEmail, userName, postNum}) => {
  // console.log(imageURL)
  
    const firebaseContext = useFirebase();
    const [imgURL, setImgURL] = useState('')
    const [postDp, setPostDp] = useState('')
    const dpLoader = './images/default_img.webp'
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [comment, setComment] = useState('')
    const [like, setLike] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [likeId, setLikeId] = useState(null)

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

    useEffect(()=>{
      firebaseContext.fetchLikes(postNum)
      .then((resp)=>{
        // console.log(resp.docs.length)
        setLike(resp.docs.length)
        didUserLiked()
      })
    },[])

    useEffect(()=>{
      // console.log(likeId)
      likeId ? setIsLiked(true) : setIsLiked(false)
    }, [likeId])

    const handleDelete = ()=>{
      // console.log('deleting post with doc id: ',postNum)
      firebaseContext.deletePost({imageURL, postNum})
    }

    const didUserLiked = async()=>{
      setLikeId(await firebaseContext.userLikedCheck({email: firebaseContext.currentUser.email, postId: postNum}))
      // console.log(likeId)
      // likeId ? setIsLiked(true) : setIsLiked(false)
    }
    
    const handleComment = (e)=>{
      e.preventDefault()
      setComment(e.target.value)
    }

    const handleLike = ()=>{
      if (!isLiked){
          setLike(like+1)
          firebaseContext.updateLikeInFirestore(postNum)
      } else {
          setLike(like-1)
          firebaseContext.deleteLikeFromFirestore({postNum, likeId})
      }
      setIsLiked(!isLiked)
  }

    return (
        <Card style={{ width: '469px', border: 'none', borderBottom: '1px solid #dbdbdb', borderRadius: '0'}}>
          <div style={{margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img className='dp' src={postDp ? postDp : dpLoader} alt={'user'} />
              <p style={{margin: '0', marginLeft: '10px'}}>{userName}</p>
            </div>
            <div onClick={handleOpen}>
              <img src="./images/meatball-menu.webp" alt="menu" style={{objectFit: 'cover', height: '20px', width: '20px', cursor: 'pointer'}}/>
            </div>
          </div>
          <Card.Img onDoubleClick={handleLike} variant="top" src={imgURL ? imgURL : dpLoader} style={{borderRadius: '4px', maxHeight: '563px', objectFit: 'cover', objectPosition: 'top'}} />
          <ImageActions like={like} isLiked={isLiked} handleLike={handleLike}/>
          <Card.Body style={{paddingBottom: '15px', paddingLeft: '0'}}>
            <p style={{fontSize: '14px'}}><span style={{fontWeight: '600'}}>{userName}</span> {caption}</p>
          </Card.Body>
          <div>
            <input value={comment} className='comment' type="text" onChange={(e)=>handleComment(e)} placeholder='Add a comment...'/>
            {comment ? <label style={{marginRight: '6px', fontWeight: '600', fontSize: '14px', color: '#0095f6', cursor: 'pointer'}}>Post</label> : <label style={{marginRight: '6px', fontWeight: '600', fontSize: '14px', color: '#ffffff'}}>Post</label>}
            <GrEmoji />
          </div>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
        <div>
          <CloseIcon className='closeicon' onClick={handleClose}/>
          <div className='post-modal'>
            <div>
              {firebaseContext.currentUser.email === userEmail && <Button onClick={handleDelete} variant="primary" >Delete post</Button>}
            </div>
            {firebaseContext.currentUser.email === firebaseContext.adminEmail && <Button onClick={handleDelete} variant="danger" style={{marginTop: '10px'}}>Admin Delete post</Button>}
            <Button variant="primary" style={{marginTop: '10px'}}>Repost</Button>
          </div>
        </div>
        </Fade>
      </Modal>
        </Card>
      );
}

export default PostCard