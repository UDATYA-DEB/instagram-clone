import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/firebase';

const CommentEditModal = ({setOpen, commentPath, userEmail, open}) => {

    
    
    const handleClose = () => setOpen(false);
    const firebaseContext = useFirebase();

    const handleDelete = ()=>{
        // console.log('deleting post with doc id: ',postNum)
        firebaseContext.deleteCommentFromFirestore(commentPath)
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
              {firebaseContext.currentUser.email === userEmail ? <Button onClick={handleDelete} variant="primary" >Delete Comment</Button> : <Button onClick={()=>alert('Dummy Reported')} variant="danger" >Report Comment</Button>}
            </div>
            {firebaseContext.currentUser.email === firebaseContext.adminEmail && <Button onClick={handleDelete} variant="danger" style={{marginTop: '10px'}}>Admin Delete Comment</Button>}
          </div>
        </div>
        </Fade>
      </Modal>
  )
}

export default CommentEditModal