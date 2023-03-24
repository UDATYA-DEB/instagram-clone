import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/firebase';

const PostMenuModal = ({setOpen, imageURL, postNum, userEmail, open}) => {

    
    
    const handleClose = () => setOpen(false);
    const firebaseContext = useFirebase();

    const handleDelete = ()=>{
        // console.log('deleting post with doc id: ',postNum)
        firebaseContext.deletePost({imageURL, postNum})
      }

  return (
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
  )
}

export default PostMenuModal