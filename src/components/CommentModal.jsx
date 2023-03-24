import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AiOutlineHeart } from 'react-icons/ai'
import { TbMessageCircle2 } from 'react-icons/tb'
import { RiBookmarkLine } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import { AiFillHeart } from 'react-icons/ai'
import Comment from './Comment';
// import CloseIcon from '@mui/icons-material/Close';
import { IoArrowBackOutline } from 'react-icons/io5'
import './styles/comment.css'
import Commenters from './Commenters';
import { useFirebase } from '../context/firebase';

const CommentModal = ({setNewCommentArray, newCommentArray, menuOpener, setOpenCommentFromPost, setCommentCount, newComment, postNum, open, setOpen, imgURL, postDp, userName, caption, isLiked, handleLike, comment, handleComment, handlePostComment}) => {
    
    const firebaseContext = useFirebase();
    const [comments, setComments] = useState([])
    useEffect(()=>{
        if (newComment){
            setNewCommentArray([...newCommentArray, {
                userEmail: firebaseContext.currentUser.email,
                comment: newComment,
                userName: firebaseContext.currentUser.uname
            }])
        }
    },[newComment])
    // console.log(newCommentArray)

    useEffect(()=>{
        const sortArrayByUploadDate = (a,b)=>{
            if (a.data().commentDate > b.data().commentDate){
              return -1
            }
            if (a.data().commentDate < b.data().commentDate){
              return 1
            }
            return 0
        }

        firebaseContext.fetchComments(postNum)
        .then((resp)=>{
            setCommentCount(resp.docs.length)
            setComments(resp.docs.sort(sortArrayByUploadDate))
        })
    },[])
       
    
    const handleClose = () => {
        setOpen(false)
        setOpenCommentFromPost(false)
    };
    // console.log(imgURL)

    const openImageNewTab = ()=>{
        // alert('clicked')
        window.open(imgURL, '_blank');
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
            {/* <CloseIcon className='closeicon' onClick={handleClose}/>   */}
            
            <div className='comment-modal'>
                <div className="post-img-container">
                    <img style={{maxWidth: '100%', maxHeight: '100%'}} src={imgURL} alt="post" />
                </div>
                <div className='comment-container'>
                    <div className="top-container">
                        <div className='dp-uname-container'>
                            <img className='dp' src={postDp} alt="dp" />
                            <p style={{margin: '0', padding: '0', marginLeft: '16px', fontWeight: '600'}}>{userName}</p>
                        </div>
                        <div onClick={()=>menuOpener(true)}>
                            <img src="./images/meatball-menu.webp" alt="menu" style={{objectFit: 'cover', height: '20px', width: '20px', cursor: 'pointer'}}/>
                        </div>
                    </div>
                    <div className='middle-container'>
                        <div className='dp-middle-uname-container'>
                            <img className='dp' src={postDp} alt="dp" />
                            <div>
                                <p style={{margin: '0', padding: '0', marginLeft: '16px'}}><span style={{margin: '0', padding: '0', fontWeight: '700'}}>{userName}</span> {caption}</p>
                            </div>
                        </div>{
                            newCommentArray.slice(0).reverse().map((newComm, index)=>{
                                return <div key={index}><Commenters comm={{...newComm}}/></div>
                            })
                        }
                        <div>{
                            comments.map((comm, index)=>{
                                // console.log(comm.data())
                                return <div key={index}><Commenters comm={comm.data()}/></div>
                            })  
                        }</div>
                    </div>
                    <div className='lower-container'>
                        <div style={{margin: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '25px'}}>
                            <div style={{display: 'flex', alignItems: 'center', width: '110px', justifyContent: 'space-between'}}>
                                {isLiked ? <AiFillHeart color='red' size={27} style={{cursor: 'pointer'}} onClick={handleLike} /> : <AiOutlineHeart size={27} style={{cursor: 'pointer'}} onClick={handleLike} />}
                                <TbMessageCircle2 style={{WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)', cursor: 'pointer'}} size={27}/>
                                <FiSend onClick={openImageNewTab} size={27} style={{cursor: 'pointer'}}/>
                            </div>
                            <RiBookmarkLine size={27} style={{cursor: 'pointer'}}/>
                        </div>
                    </div>
                    <div style={{padding: '15px'}}>
                        <Comment comment={comment} handleComment={handleComment} handlePostComment={handlePostComment} />
                    </div>
                </div>
            </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default CommentModal