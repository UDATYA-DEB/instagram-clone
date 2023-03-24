import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';
import './styles/logo.css'
import './styles/post.css'
import ImageActions from './ImageActions';
import Comment from './Comment';
import PostMenuModal from './PostMenuModal';

const PostCard = ({caption, imageURL, userEmail, userName, postNum}) => {
  // console.log(imageURL)
  
    const firebaseContext = useFirebase();
    const [imgURL, setImgURL] = useState('')
    const [postDp, setPostDp] = useState('')
    const dpLoader = './images/default_img.webp'
    const [comment, setComment] = useState('')
    const [like, setLike] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [likeId, setLikeId] = useState(null)
    const [open, setOpen] = useState(false);
    const [newComment, setNewComment] = useState('')
    const [newCommentArray, setNewCommentArray] = useState([])
    const [commentCount, setCommentCount] = useState(0)
    // console.log(commentCount)
    const [openCommentFromPost, setOpenCommentFromPost] = useState(false)
    

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
    },[firebaseContext, postNum])

    useEffect(()=>{
      // console.log(likeId)
      likeId ? setIsLiked(true) : setIsLiked(false)
    }, [likeId])

    useEffect(()=>{
      setCommentCount(commentCount+1)
    }, [newComment])

    // console.log(comments && comments[1].data())

    const didUserLiked = async()=>{
      const likeRef = await firebaseContext.userLikedCheck({email: firebaseContext.currentUser.email, postId: postNum})
      setLikeId(likeRef)
      // likeId ? setIsLiked(true) : setIsLiked(false)
    }
    
    const handleComment = (e)=>{
      e.preventDefault()
      setComment(e.target.value)
    }

    const handlePostComment = ()=>{
      setNewComment(comment)
      firebaseContext.postCommentHandler({postNum, comment})
      setComment('')
      // setNewCommentArray([])
    }

    const handleOpen = () => setOpen(true);

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
          <ImageActions setNewCommentArray={setNewCommentArray} newCommentArray={newCommentArray} menuOpener={setOpen} setOpenCommentFromPost={setOpenCommentFromPost} openCommentFromPost={openCommentFromPost} setCommentCount={setCommentCount}  newComment={newComment} postNum={postNum} like={like} isLiked={isLiked} handleLike={handleLike} imgURL={imgURL} postDp={postDp} userName={userName} caption={caption} comment={comment} handleComment={handleComment} handlePostComment={handlePostComment}/>
          <Card.Body style={{paddingBottom: '15px', paddingLeft: '0'}}>
            <p style={{fontSize: '14px'}}><span style={{fontWeight: '600'}}>{userName}</span> {caption}</p>
          </Card.Body>
          <p onClick={()=>setOpenCommentFromPost(true)} style={{margin: '0', marginBottom: '10px', fontSize: '14px', color: '#8e8e8e', cursor: 'pointer'}}>View all {commentCount} comments</p>
          <Comment comment={comment} handleComment={handleComment} handlePostComment={handlePostComment} />
          <PostMenuModal setOpen={setOpen} imageURL={imageURL} postNum={postNum} userEmail={userEmail} open={open} />
        </Card>
      );
}

export default PostCard