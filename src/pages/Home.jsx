import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PostCard from '../components/PostCard';

const Home = () => {

  const firebaseContext = useFirebase()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  // posts.length != 0 && console.log(posts[0].data())
  // console.log('posts ',posts)

  useEffect(()=>{
    // console.log(firebaseContext.isLoggedIn)
    if (!firebaseContext.isLoggedIn){
      navigate('login')
    }
  },[firebaseContext.isLoggedIn, navigate])

  useEffect(()=>{
    const sortArrayByUploadDate = (a,b)=>{
      if (a.data().uploadDate > b.data().uploadDate){
        return -1
      }
      if (a.data().uploadDate < b.data().uploadDate){
        return 1
      }
      return 0
    }

    firebaseContext.fetchPosts()
    .then((post)=>{
      // console.log(post.docs[1]._key.path.segments[6])
      setPosts(post.docs.sort(sortArrayByUploadDate))
    })   
  },[firebaseContext])

  // const calcNoPosts = ()=>{
  //   var count = 0
  //   posts.map((eachPost)=>{
  //     if (eachPost.data().email === firebaseContext.currentUser.email){
  //       count += 1
  //     }
  //   })
  //   firebaseContext.setNoPost(count)
  // }
    
  return (
    <div className='App' style={{width: '1070px'}}>
        <Sidebar />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: '350px'}}>
          <div>
          <Button style={{marginTop: '20px'}} variant='danger' onClick={()=>firebaseContext.userLogOut()}>Log Out</Button>
          </div>
          <div>{
            posts.length === 0 ? <h4 style={{marginTop: '200px'}}>No posts available...</h4> : <div>{
              posts.map((post, index)=>{
                // console.log(post._key.path.segments[6])
                // console.log(post.docs[1]._key.path.segments[6])
                // console.log({...post.data()})
                return <div style={{margin: '15px 0'}} key={index}><PostCard postNum={post._key.path.segments[6]} {...post.data()}/></div>
              })  
            }</div>  
          }</div>
        </div>
    </div>
  )
}

export default Home