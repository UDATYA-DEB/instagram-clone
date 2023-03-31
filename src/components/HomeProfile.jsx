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
                    <div style={{fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center'}}>{firebaseContext.currentUser.uname}<div>{ <img style={{width: '20px', height: '20px', objectFit: 'cover'}} src="./images/verified-tick.png" alt="tick" />}</div></div>
                    <p style={{fontSize: '14px', color: '#8e8e8e'}}>{firebaseContext.currentUser.fname}</p>
                    {/* {console.log(firebaseContext.currentUser)} */}
                </div>
            </div>
            <p style={{fontSize: '12px', color: '#0095f6', fontWeight: '600', cursor: 'pointer'}} onClick={()=>{firebaseContext.userLogOut()}}>Switch</p>
        </div>
        <div style={{display: 'flex', fontSize: '12px', color: '#c7c7c7', flexWrap: 'inherit'}}>
            {/* <div><label style={{marginRight: '5px'}}>About</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>Help</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>Press</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>API</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>Jobs</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>Privacy</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>Terms</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>Locations</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>Languages</label>&#x2022;</div>
            <div><label style={{marginRight: '5px', marginLeft: '5px'}}>Meta Verified</label>&#x2022;</div> */}
        </div>
    </div>
  )
}

export default HomeProfile