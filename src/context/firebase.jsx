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
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { useNavigate } from "react-router-dom";

const firebaseContext = createContext(null);

// const firebaseConfig = {
//     apiKey: "AIzaSyDWcOmSGhs7rjRh1u0nkjfnF4Iwd07kX0E",
//     authDomain: "instagram-87c95.firebaseapp.com",
//     projectId: "instagram-87c95",
//     storageBucket: "instagram-87c95.appspot.com",
//     messagingSenderId: "864345540422",
//     appId: "1:864345540422:web:0006de6d8ccb6378878747"
// };

const firebaseConfig = {
    apiKey: "AIzaSyC9K6IqaXISk7EJ8xsEvVr99_viiEi--Lg",
    authDomain: "instagram-beta-f4791.firebaseapp.com",
    projectId: "instagram-beta-f4791",
    storageBucket: "instagram-beta-f4791.appspot.com",
    messagingSenderId: "504052711345",
    appId: "1:504052711345:web:4a37a041d9dc72ec61c790"
};

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
    // const navigate = useNavigate();
    // console.log(currentUser)
    // user && user.displayName && console.log(user.photoURL)
    // const uploadedImageUrl = (url)=>{
    //     setImageUrl(url)
    // }
    // user && console.log(user.displayName === null)

    useEffect(()=>{
        if ( user && user.displayName ){
            setCurrentUser({uname: user.displayName, email: user.email, dp: user.photoURL})
        } else if (user){
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
            // console.log(result.user)
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
        // console.log(user.displayName)
        const collectionRef = collection(firestore, 'users')
        const q = query(collectionRef, where('email','==', email))
        const snapshot = await getDocs(q)
        
        var dpUrl = ''
        // console.log(snapshot)
        snapshot.forEach((data)=>{
            dpUrl = data.data().dp
        })
        
        // console.log(dpUrl)
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
            // console.log(docRef)
        }).catch((err)=>{
            alert(err)
        })
    }

    // const updatePostNo = async(email)=>{
    //     const collectionRef = collection(firestore, 'users')
    //     const q = query(collectionRef, where('email','==', email))
    //     const snapshot = await getDocs(q)
    //     console.log(snapshot)
    // }


    const isLoggedIn = user ? true : false;

    return <firebaseContext.Provider value={{fetchPostDp, noPost ,setNoPost, fetchPosts, currentUser, postUploadToFirebase, getImage, imageUrl, setImageUrl, uploadImage, user, signInLoginUserPass, isLoggedIn, signUpLoginUserPass, putDataInFirestore, userLogOut, googleAuth}}>
        {props.children}
    </firebaseContext.Provider>
}