import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';
import { AiOutlineHeart } from 'react-icons/ai'
import { TbMessageCircle2 } from 'react-icons/tb'
import { RiBookmarkLine } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import './styles/logo.css'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import './styles/post.css'


const PostCard = ({caption, imageURL, userEmail, userName, postNum}) => {
  // console.log(imageURL)
  
    const firebaseContext = useFirebase();
    const [imgURL, setImgURL] = useState('')
    const [postDp, setPostDp] = useState('')
    const dpLoader = './images/default_img.webp'
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const handleDelete = ()=>{
      // console.log('deleting post with doc id: ',postNum)
      firebaseContext.deletePost({imageURL, postNum})
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
          <Card.Img variant="top" src={imgURL ? imgURL : dpLoader} style={{borderRadius: '4px', maxHeight: '563px', objectFit: 'cover', objectPosition: 'top'}} />
          <div style={{margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '25px'}}>
            <div style={{display: 'flex', alignItems: 'center', width: '110px', justifyContent: 'space-between'}}>
              <AiOutlineHeart size={27} style={{cursor: 'pointer'}}/>
              <TbMessageCircle2 style={{WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)', cursor: 'pointer'}} size={27}/>
              <FiSend size={27} style={{cursor: 'pointer'}}/>
            </div>
            <RiBookmarkLine size={27} style={{cursor: 'pointer'}}/>
          </div>
          <p style={{padding: '0', marginTop: '5px', fontWeight: '600'}}>0 likes</p>
          <Card.Body style={{paddingBottom: '15px', paddingLeft: '0'}}>
            <p style={{fontSize: '14px'}}><span style={{fontWeight: '600'}}>{userName}</span> {caption}</p>
          </Card.Body>
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