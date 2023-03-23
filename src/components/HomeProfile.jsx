import React from 'react'
import { useFirebase } from '../context/firebase'
import './styles/homeprofile.css'

const HomeProfile = () => {
    const firebaseContext = useFirebase()
    const dpLoader = './images/default_img.webp'

  return (
    <div>
        <div style={{display: 'flex', marginTop: '60px',alignItems: 'center', justifyContent: 'space-between', width: '300px'}}>
            <div style={{display: 'flex'}}>
                <img src={firebaseContext.user ? firebaseContext.currentUser.dp ? firebaseContext.currentUser.dp : dpLoader : dpLoader} alt="olga" className="home-profile-dp" />
                <div style={{marginLeft: '16px'}}>
                    <p style={{fontSize: '14px', fontWeight: '600'}}>{firebaseContext.currentUser.uname}</p>
                    <p style={{fontSize: '14px', color: '#8e8e8e'}}>{firebaseContext.currentUser.fname}</p>
                    {console.log(firebaseContext.currentUser)}
                </div>
            </div>
            <p style={{fontSize: '12px', color: '#0095f6', fontWeight: '600', cursor: 'pointer'}} onClick={()=>{firebaseContext.userLogOut()}}>Switch</p>
        </div>
    </div>
  )
}

export default HomeProfile