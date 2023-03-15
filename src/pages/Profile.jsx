import React from 'react'
import Sidebar from '../components/Sidebar';
// import { useFirebase } from '../context/firebase';

const Profile = () => {
  // const firebaseContext = useFirebase()
  return (
    <div className='App'>
        <Sidebar />
        <h1>Profile</h1>
    </div>
  )
}

export default Profile