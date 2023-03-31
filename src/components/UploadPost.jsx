import React, { useState, useEffect } from 'react'
import './styles/create.css'
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/firebase';



const UploadPost = () => {
    const [image, setImage] = useState('')
    // const [video, setVideo] = useState('')
    const firebaseContext = useFirebase()
    const [isImageSelected, setIsImageSelected] = useState(false)
    // const [isVideoSelected, setIsVideoSelected] = useState(false)
    // console.log(video)

    useEffect(()=>{
        if (image){
            setIsImageSelected(true)
            uploadImage()
        }
    }, [image])

    // useEffect(()=>{
    //     if (video){
    //         uploadVideo()
    //     }
    // },[video])

    const uploadImage = async()=>{
        await firebaseContext.uploadImage(image)
    }

    // const uploadVideo = async()=>{
        
    // }

    const handleInputImage = ()=>{
        const realFileBtn = document.getElementById('real-uploader')
        realFileBtn.click();
    }

    // const handleInputVideo = ()=>{
    //     setIsVideoSelected(true)
    //     setVideo(prompt('Enter link'))
    // }

    const handleInput = (e)=>{
        e.preventDefault()
        setImage(e.target.files[0])
    }
  return (
    <div>
        <div className='create-head'>
            <p style={{margin: '0', fontWeight: '600'}}>Create new post</p>
        </div>
        <div className='create-mid'>
            <img style={{marginBottom: '10px', objectFit: 'cover', height: '75px', weight: '75px'}} src="./images/upload-logo.webp" alt="upload" />
            <p style={{fontSize: '20px', margin: '0', marginBottom: '15px'}}>Drag photos and videos here</p>
            {
                isImageSelected ? <Button variant="primary" style={{fontWeight: '600', fontSize: '14px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '0.6', cursor: 'default'}}>Uploading</Button> : <Button onClick={handleInputImage} variant="primary" style={{fontWeight: '600', fontSize: '14px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Select from computer</Button>
            }
            {/* {
                isVideoSelected ? <Button variant="primary" style={{marginTop: '10px', fontWeight: '600', fontSize: '14px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '0.6', cursor: 'default'}}>Uploading</Button> : <Button onClick={handleInputVideo} variant="primary" style={{marginTop: '10px', fontWeight: '600', fontSize: '14px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Upload Video</Button>
            }    */}
            <input type='file' name='picture' id="real-uploader" hidden='hidden' onChange={(e)=>handleInput(e)}/>
        </div>
    </div> 
  )
}

export default UploadPost