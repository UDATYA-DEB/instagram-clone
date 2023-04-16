import React, { useState } from 'react';
import './styles/logo.css'
import './styles/sidebar.css'
import './styles/create.css'
import { MdHomeFilled, MdOutlineExplore } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { GrMultimedia } from 'react-icons/gr'
import { RiMessengerLine } from 'react-icons/ri' 
import { AiOutlineHeart, AiOutlinePlusSquare } from 'react-icons/ai'
import { CiMenuBurger } from 'react-icons/ci'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Create from './Create';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase';


const Sidebar = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const firebaseContext = useFirebase();
    const dpLoader = './images/default_img.webp'

  return (
    <div className='sidebar'>
        <header className='header-logo'>
            <img className='logo' src="./images/instaLogo.webp" alt="" />
        </header>
        <div className='menu-container'>
            <div className="middle-menu">
                <Link to={'/'} style={{color: 'black'}} className='menu-items'>
                    <MdHomeFilled className='icon' size={30}/>
                    <label style={{fontWeight: '700'}}>Home</label>
                </Link>
                <Link to={'/'} style={{color: 'black'}} className='menu-items'>
                    <FiSearch className='menu-icon' size={30}/>
                    <label>Search</label>
                </Link>
                <Link to={'/'} style={{color: 'black'}} className='menu-items'>
                    <MdOutlineExplore className='menu-icon' size={30}/>
                    <label>Explore</label>
                </Link>
                <Link to={'/'} style={{color: 'black'}} className='menu-items'>
                    <GrMultimedia className='menu-icon' size={30}/>
                    <label>Reels</label>
                </Link>
                <Link to={'/'} style={{color: 'black'}} className='menu-items'>
                    <RiMessengerLine className='menu-icon' size={30}/>
                    <label>Messages</label>
                </Link>
                <Link to={'/'} style={{color: 'black'}} className='menu-items'>
                    <AiOutlineHeart className='menu-icon' size={30}/>
                    <label>Notification</label>
                </Link>
                <div className='menu-items' onClick={handleOpen}>
                    <AiOutlinePlusSquare className='menu-icon' size={30}/>
                    <label>Create</label>
                </div>
                <div onClick={()=>alert('Will be available soon...')} to={'/profile'} style={{color: 'black'}} className='menu-items'>
                    <img src={firebaseContext.user ? firebaseContext.currentUser.dp ? firebaseContext.currentUser.dp : dpLoader : dpLoader} alt="userdp" className="dp" />
                    <label>Profile</label>
                </div>
            </div>
            <div className='menu-items' onClick={()=>navigate('#')}>
                <CiMenuBurger size={25}/>
                <label>More</label>
            </div>
        </div>
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
          <div>
            <CloseIcon className='closeicon' onClick={handleClose}/>
            {
              firebaseContext.imageUrl ? <div className='create-modal-add-caption'>
              <Create />
          </div> : <div className='create-modal'>
                <Create />
            </div>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Sidebar;
