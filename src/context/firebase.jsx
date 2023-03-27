import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, 
        createUserWithEmailAndPassword, 
        onAuthStateChanged, 
        signOut, 
        GoogleAuthProvider, 
        signInWithPopup, 
        signInWithEmailAndPassword,
        getAdditionalUserInfo } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'


const firebaseContext = createContext(null);
const adminEmail = "udatya.developer@gmail.com"

const firebaseConfig = {
    apiKey: "AIzaSyDWcOmSGhs7rjRh1u0nkjfnF4Iwd07kX0E",
    authDomain: "instagram-87c95.firebaseapp.com",
    projectId: "instagram-87c95",
    storageBucket: "instagram-87c95.appspot.com",
    messagingSenderId: "864345540422",
    appId: "1:864345540422:web:0006de6d8ccb6378878747"
}; // insta-for-me

// const firebaseConfig = {
//     apiKey: "AIzaSyC9K6IqaXISk7EJ8xsEvVr99_viiEi--Lg",
//     authDomain: "instagram-beta-f4791.firebaseapp.com",
//     projectId: "instagram-beta-f4791",
//     storageBucket: "instagram-beta-f4791.appspot.com",
//     messagingSenderId: "504052711345",
//     appId: "1:504052711345:web:4a37a041d9dc72ec61c790"
// }; // insta-for-public

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)
const firestore = getFirestore(firebase)
const provider = new GoogleAuthProvider()
const storage = getStorage(firebase)


export const useFirebase = ()=>{
    return useContext(firebaseContext);
}

export const FirebaseProvider = (props)=>{
    const [user, setUser] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [currentUser, setCurrentUser] = useState({uname: '', email: '', dp: ''})
    const [noPost, setNoPost] = useState(0)

    useEffect(()=>{
        if (user){
            fetchUserDetails(user.email);
        }
    },[user])

    useEffect(()=>{
        onAuthStateChanged(auth, (cust)=>{
            if (cust){
                setUser(cust)
            } else {
                setUser(null)
            }
        })
    },[])

    const googleAuth = ()=>{
        signInWithPopup(auth, provider)
        .then((result)=>{
            if (getAdditionalUserInfo(result).isNewUser){
                putDataInFirestore({
                    email: result.user.email,
                    uname: result.user.displayName,
                    fname: result.user.displayName,
                    dp: result.user.photoURL
                })
            }
            return
        })
        .catch((err)=>{
            alert(err)
        })
    }

    const signUpLoginUserPass = ({email, pass})=>{
        return createUserWithEmailAndPassword(auth, email, pass)
        
    }

    const signInLoginUserPass = ({email, pass})=>{
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const putDataInFirestore = async({email, uname, fname, dp})=>{
        try{
            const userdp = dp ? dp : 'https://www.worldatlas.com/r/w1200/upload/89/99/3b/shutterstock-1263201358.jpg'
            const docRef = await addDoc(collection(firestore, 'users'),{
                email,
                uname,
                fname,
                followers: 0,
                following: 0,
                dp: userdp
            })  
            console.log(docRef.id)  
        }catch(err){
            console.log(err)
        }
    }

    const userLogOut = ()=>{
        signOut(auth)
    }

    const fetchUserDetails = async(email)=>{
        const collectionRef = collection(firestore, 'users')
        const q = query(collectionRef, where('email','==', email))
        const snapshot = await getDocs(q)
        snapshot.forEach((data)=>setCurrentUser({...data.data()}))
    }

    const fetchPosts = ()=>{
        return getDocs(collection(firestore, 'posts'))
    }

    const fetchPostDp = async(email)=>{
        const collectionRef = collection(firestore, 'users')
        const q = query(collectionRef, where('email','==', email))
        const snapshot = await getDocs(q)
        
        var dpUrl = ''
        snapshot.forEach((data)=>{
            dpUrl = data.data().dp
        })

        return dpUrl
    }

    const uploadImage = async(image)=>{
        const imageRef = ref(storage, `uploads/posts/images/${Date.now()}`)
        const imageRefInFirestore = await uploadBytes(imageRef, image)
        setImageUrl(imageRefInFirestore)
    }

    const getImage = (path)=>{
        return getDownloadURL(ref(storage, path))
    }

    const updateLikeInFirestore = (docId)=>{
        addDoc(collection(firestore, `posts/${docId}/likes`),{
            uid: user.uid,
            userEmail: currentUser.email,
            userName: currentUser.uname,
            likeDate: Date.now()
        }).then((docRef)=>{
            // do nothing
        }).catch((err)=>{
            console.log(err)
        })
    }

    const postCommentHandler = ({postNum, comment})=>{
        addDoc(collection(firestore, `posts/${postNum}/comments`),{
            uid: user.uid,
            comment,
            userEmail: currentUser.email,
            userName: currentUser.uname,
            commentDate: Date.now()
        }).then((docRef)=>{
            // do nothing
        }).catch((err)=>{
            console.log(err)
        })
    }

    const deleteLikeFromFirestore = async({postNum, likeId})=>{
        await deleteDoc(doc(firestore, `posts/${postNum}/likes`, likeId))
        console.log('done')
    }

    const deleteCommentFromFirestore = async(commentPath)=>{
        await deleteDoc(doc(firestore, `posts/${commentPath[6]}/comments`, commentPath[8]))
        window.location.reload()
    }

    const userLikedCheck = async({email, postId})=>{
        const collectionRef = collection(firestore, `posts/${postId}/likes`)
        const q = query(collectionRef, where('userEmail','==', email))
        const snapshot = await getDocs(q)
        var checker = null
        snapshot.forEach((data)=>{
            checker = data._key.path.segments[8]
        })

        return checker
    }

    const fetchLikes = (docId)=>{
        return getDocs(collection(firestore, `posts/${docId}/likes`))
    }

    const fetchComments = (docId)=>{
        return getDocs(collection(firestore, `posts/${docId}/comments`))
    }

    const postUploadToFirebase = (caption)=>{
        addDoc(collection(firestore, 'posts'), {
            caption,
            imageURL: imageUrl.ref.fullPath,
            uid: user.uid,
            userEmail: currentUser.email,
            userName: currentUser.uname,
            uploadDate: Date.now()
        }).then((docRef)=>{
            window.location.reload()
        }).catch((err)=>{
            alert(err)
        })
    }

    const deletePost = async ({imageURL, postNum})=>{
        deleteObject(ref(storage, imageURL))
        .then(()=>{
            // console.log("file deleted from storage")
        })
        .catch((err)=>{
            console.log(err)
        })
        await deleteDoc(doc(firestore, "posts", postNum))
        window.location.reload()
        
    }


    const isLoggedIn = user ? true : false;

    return <firebaseContext.Provider value={
        {deleteCommentFromFirestore, 
        fetchComments, 
        postCommentHandler, 
        deleteLikeFromFirestore, 
        userLikedCheck, 
        fetchLikes, 
        updateLikeInFirestore, 
        adminEmail, 
        deletePost, 
        fetchPostDp, 
        noPost,
        setNoPost, 
        fetchPosts, 
        currentUser, 
        postUploadToFirebase, 
        getImage, 
        imageUrl, 
        setImageUrl, 
        uploadImage, 
        user, 
        signInLoginUserPass, 
        isLoggedIn, 
        signUpLoginUserPass, 
        putDataInFirestore, 
        userLogOut, 
        googleAuth}
        }>
        {props.children}
    </firebaseContext.Provider>
}