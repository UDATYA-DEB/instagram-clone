import React, {useState, useEffect} from 'react'
import { useFirebase } from '../context/firebase'
import './styles/create.css'
import { IoArrowBackOutline } from 'react-icons/io5'
import './styles/logo.css'


const AddCaption = ({imageUrl}) => {
  
  const [imgURL, setImgURL] = useState('')
  const firebaseContext = useFirebase()
  const [caption, setCaption] = useState('')

  useEffect(()=>{
    firebaseContext.getImage(imageUrl.ref.fullPath)
    .then((url)=>setImgURL(url))
    console.log(imgURL)
  },[])

  const handleInput = (e)=>{
    e.preventDefault()
    setCaption(e.target.value)
  }

  const handleSubmitPost = ()=>{
    firebaseContext.postUploadToFirebase(caption)
  }

  return (
    <div>
      <div className='create-head-caption'>
          <IoArrowBackOutline size={24}/>
          <p style={{margin: '0', fontWeight: '600'}}>Create new post</p>
          <p onClick={handleSubmitPost} className='share-btn' >Share</p>
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
            <textarea className='caption-text' value={caption} type="text" placeholder='Write a caption...' onChange={(e)=>handleInput(e)}/>
        </div>
      </div>
    </div>
  )
}

export default AddCaption