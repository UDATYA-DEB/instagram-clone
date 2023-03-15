import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc'
import './styles/signup.css'
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({email: '', fname: '', uname: '', pass: ''})
    const firebaseContext = useFirebase();
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(firebaseContext.isLoggedIn)
        if (firebaseContext.isLoggedIn){
          navigate('/')
        }
      },[firebaseContext.isLoggedIn, navigate])

    const handleInput = (e)=>{
        e.preventDefault()
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = ()=>{
        firebaseContext.signInLoginUserPass(data)
        .then((userCredentials)=>{
            // console.log(userCredentials)
            navigate('/')
        })
        .catch((err)=>{
            alert(err)
        })
        setData({email: '', pass: ''})
    }

    const handleGoogleSignIn = async()=>{
        await firebaseContext.googleAuth()
        // navigate('/')
    }

    return (
        <div className='signup-body'>
            <div className='signup-container'>
                <div className='main-body'>
                    <header>
                        <img className='signup-logo' src="./images/instaLogo.webp" alt="" />
                    </header>
                    <p className='below-headtext' >Sign in to see photos and videos from your friends.</p>
                    <Button onClick={handleGoogleSignIn} variant="primary" style={{display: 'flex', alignItems: 'center', width: '100%', height: '30px', justifyContent: 'center', margin: '5px 0', fontSize: '14px', fontWeight: '600'}}>
                        <FcGoogle style={{marginRight: '8px'}}/> Log in with Google
                    </Button>
                    <img style={{objectFit: 'cover', width: '268px', margin: '10px 0'}} src="./images/or.webp" alt="" />
                    <Form>
                    <Form.Group controlId="formBasicEmail" style={{width: '268px'}}>
                        <Form.Control onChange={(e)=>handleInput(e)} type="email" name='email' placeholder="Email" style={{margin: '10px 0', borderRadius: '2px', height: '36px', fontSize: '13px'}}/>
                        <Form.Control onChange={(e)=>handleInput(e)} type="password" name='pass' placeholder="Password" style={{marginBottom: '10px', borderRadius: '2px', height: '36px', fontSize: '13px'}} />
                    </Form.Group>
                    </Form>
                    <p className='lower-text' style={{whiteSpace: 'nowrap'}}>People who use our service may have uploaded your <br/> contact information to Instagram. <a rel="noreferrer" href="https://www.facebook.com/help/instagram/261704639352628" target='_blank'>Learn More</a></p>
                    <Button onClick={handleSubmit} variant="primary" style={{width: '100%', marginTop: '13px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600'}}>Sign In</Button>
                </div>
                <div className="redirect-login">
                    <p>Create an account? <Link to={'/signup'} style={{color: '#295dcf', textDecoration: 'none'}}>Sign Up</Link></p>
                </div>
                <div className='foot'>
                    <p style={{textAlign: 'center', fontSize: '14px'}}>Get the app.</p>
                </div>
            </div>
        </div>
      );
}

export default Login