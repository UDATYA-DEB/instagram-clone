import React, { useState, useEffect } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { TbMessageCircle2 } from 'react-icons/tb'
import { RiBookmarkLine } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import { AiFillHeart } from 'react-icons/ai'
import CommentModal from './CommentModal'

const ImageActions = ({setNewCommentArray, newCommentArray, menuOpener, setOpenCommentFromPost, openCommentFromPost, setCommentCount, newComment, postNum, isLiked, like, handleLike, imgURL, postDp, userName, caption, comment, handleComment, handlePostComment}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    // if (openCommentFromPost){
    //   setOpen(true)
    // }

    useEffect(()=>{
      if (openCommentFromPost){
          setOpen(true)
        }
    },[openCommentFromPost])

    const openImageNewTab = ()=>{
      // alert('clicked')
      window.open(imgURL, '_blank');
  }
    
  return (
    <div>
        <div style={{margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '25px'}}>
            <div style={{display: 'flex', alignItems: 'center', width: '110px', justifyContent: 'space-between'}}>
                {isLiked ? <AiFillHeart color='red' size={27} style={{cursor: 'pointer'}} onClick={handleLike} /> : <AiOutlineHeart size={27} style={{cursor: 'pointer'}} onClick={handleLike} />}
                <TbMessageCircle2 onClick={handleOpen} style={{WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)', cursor: 'pointer'}} size={27}/>
                <FiSend onClick={openImageNewTab} size={27} style={{cursor: 'pointer'}}/>
            </div>
            <RiBookmarkLine size={27} style={{cursor: 'pointer'}}/>
        </div>
        {/* {like === 0 && <p style={{padding: '0', marginTop: '5px', fontWeight: '600', color: 'white'}}>{like} like</p>} */}
        {like === 1 && <p style={{padding: '0', marginTop: '5px', fontWeight: '600'}}>{like} like</p>}
        {like > 1 && <p style={{padding: '0', marginTop: '5px', fontWeight: '600'}}>{like} likes</p>}
        <CommentModal setNewCommentArray={setNewCommentArray} newCommentArray={newCommentArray} menuOpener={menuOpener} setOpenCommentFromPost={setOpenCommentFromPost} setCommentCount={setCommentCount} newComment={newComment} postNum={postNum} open={open} setOpen={setOpen} imgURL={imgURL} postDp={postDp} userName={userName} caption={caption} isLiked={isLiked} handleLike={handleLike} comment={comment} handleComment={handleComment} handlePostComment={handlePostComment}/>
    </div>
  )
}

export default ImageActions