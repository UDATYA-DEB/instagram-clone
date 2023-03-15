import React from 'react'
import './styles/create.css'
import UploadPost from './UploadPost';
import { useFirebase } from '../context/firebase';
import AddCaption from './AddCaption';

const Create = () => {
    const firebaseContext = useFirebase()
  return (
    <div>
      {firebaseContext.imageUrl ? <AddCaption imageUrl={firebaseContext.imageUrl}/> : <UploadPost />}
    </div>
  )
}

export default Create