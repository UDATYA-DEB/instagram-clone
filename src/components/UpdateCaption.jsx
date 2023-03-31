import React, {useState, useEffect} from 'react'
import { useFirebase } from '../context/firebase'
import './styles/create.css'
import { IoArrowBackOutline } from 'react-icons/io5'
import './styles/logo.css'


const UpdateCaption = ({handleClose, handleUpdateCaptionClose, postNum, setPostCaption, caption, imgURL}) => {
  
//   const [imgURL, setImgURL] = useState('')
  const firebaseContext = useFirebase()
  const [updateCaption, setUpdateCaption] = useState(caption)
  const [isShareSelected, setIsShareSelected] = useState(false)

//   useEffect(()=>{
//     firebaseContext.getImage(imageUrl.ref.fullPath)
//     .then((url)=>setImgURL(url))
//     console.log(imgURL)
//   },[])

  const handleInput = (e)=>{
    e.preventDefault()
    setUpdateCaption(e.target.value)
  }

  const handleSubmitPost = ()=>{
    setIsShareSelected(true)
    setPostCaption(updateCaption)
    firebaseContext.updateCaption({
        postId: postNum,
        caption: updateCaption
    })
    if (firebaseContext.captionUpdated){
        handleUpdateCaptionClose()
        handleClose()
    }
    // firebaseContext.postUploadToFirebase(caption)
  }

  return (
    <div>
      <div className='create-head-caption'>
          <IoArrowBackOutline size={24}/>
          <p style={{margin: '0', fontWeight: '600'}}>Edit post</p>
          {
            isShareSelected ? <p className='share-btn' style={{opacity: '0.5'}} >{firebaseContext.captionUpdated ? 'Updated' : 'Updating...'}</p> : <p onClick={handleSubmitPost} className='share-btn' >Update</p>
          }
      </div>
      <div className='create-mid-caption'>
        <div className='image-container' >
          <img style={{maxWidth: '100%', maxHeight: '100%'}} src={imgURL} alt="caption-image" />
        </div>
        <div className='caption-container'>
            <div className="user-info">
              <img style={{imageRendering : 'auto'}} src={firebaseContext.user ? firebaseContext.currentUser.dp : "./images/dp.webp"} alt="olga" className="dp" />
              <p style={{margin: '0', marginTop: '5px', marginLeft: '12px', fontWeight: '600', fontSize: '15px'}}>{firebaseContext.currentUser.uname}</p>
            </div>
            <textarea className='caption-text' value={updateCaption} type="text" placeholder='Edit caption...' onChange={(e)=>handleInput(e)}/>
        </div>
      </div>
    </div>
  )
}

export default UpdateCaption