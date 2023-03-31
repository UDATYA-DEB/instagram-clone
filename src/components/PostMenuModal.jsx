import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/firebase';
import UpdateCaption from './UpdateCaption';
// import UpdateCommentModal from './UpdateCommentModal';

const PostMenuModal = ({setPostCaption, imgURL, caption, setOpen, imageURL, postNum, userEmail, open}) => {

    const [deletePost, setDeletePost] = useState(false)
    const [updatePost, setUpdatePost] = useState(false)
    const [updateCaptionOpen, setUpdateCaptionOpen] = useState(false)

    const handleUpdateCaptionOpen = () => {
      setUpdatePost(true);
      setUpdateCaptionOpen(true)
    };
    const handleUpdateCaptionClose = () => setUpdateCaptionOpen(false);
    
    const handleClose = () => setOpen(false);
    const firebaseContext = useFirebase();

    const handleDelete = ()=>{
        // console.log('deleting post with doc id: ',postNum)
        setDeletePost(true)
        firebaseContext.deletePost({imageURL, postNum})
      }

  return (
    <div>
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
              {firebaseContext.currentUser.email === userEmail && <Button onClick={handleDelete} style={{marginBottom: '10px'}} variant="primary" >{deletePost ? 'Deleting...' : 'Delete Post'}</Button>}
              {firebaseContext.currentUser.email === userEmail && <Button onClick={handleUpdateCaptionOpen} style={{marginBottom: '10px', marginLeft: '10px'}} variant="primary" >{updatePost ? 'Updating...' : 'Update Post'}</Button>}
            </div>
            {firebaseContext.currentUser.email === firebaseContext.adminEmail && <Button onClick={handleDelete} variant="danger" style={{marginBottom: '10px'}}>{deletePost ? 'Deleting...' : 'Admin Delete Post'}</Button>}
            <Button variant="primary" style={{marginBottom: '10px'}}>Repost</Button>
          </div>
        </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={updateCaptionOpen}
        onClose={handleUpdateCaptionClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={updateCaptionOpen}>
          <div>
            <CloseIcon className='closeicon' onClick={handleUpdateCaptionClose}/>
            <div className="create-modal-add-caption">
              <UpdateCaption handleClose={handleClose} handleUpdateCaptionClose={handleUpdateCaptionClose} setPostCaption={setPostCaption} postNum={postNum} caption={caption} imgURL={imgURL} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default PostMenuModal