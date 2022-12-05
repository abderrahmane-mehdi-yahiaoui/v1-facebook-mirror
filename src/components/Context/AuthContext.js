import React, {createContext, useContext, useState, useEffect}from 'react'
import  db, { auth } from '../../config/Firebase'
const AuthContext = createContext()
export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)
  
    async function signup( firstName, lastName,  email,  pwd,  gender){
        return await auth.createUserWithEmailAndPassword(email, pwd).then((auth)=>{
            auth.user.updateProfile({
                displayName: firstName + ' ' + lastName,
                photoURL: 'https://i.stack.imgur.com/l60Hf.png'
            }).then((response)=>{
                db.collection("users").doc(auth.user.uid).set({
                    uid: auth.user.uid,
                    email: auth.user.email,
                    displayName: auth.user.displayName,
                    photoURL: auth.user.photoURL,
                    firstName,
                    lastName,
                   
                    bio: '',
                    cover: null,
                })
            })
        })    
    }

    
    async function login(email, password){
        return await auth.signInWithEmailAndPassword(email, password)
    }
    async function logout(){
        return  await auth.signOut()
    }
    
    async function updateDisplayName(displayName){
        return await auth.currentUser.updateProfile({
            displayName: displayName
        }).then((res)=>{
            db.collection("users").doc(auth.currentUser.uid).update({
                displayName: displayName
            })
        })
    }
     
    async function updateProfilePhoto(photoURL){
        await auth.currentUser.updateProfile({
            photoURL
        })
        db.collection('users').doc(auth.currentUser.uid).update({
            photoURL
        })
        
    }
 
    
    async function updateProfileCover(cover){
        await db.collection("users").doc(auth.currentUser.uid).update({
            cover: cover
        })
    }
    async function updateBio(bio){
        await db.collection("users").doc(auth.currentUser.uid).update({
            bio
        })
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)       
        })
        
        return  unsubscribe;
    }, [])

    
   
    const value = {
        currentUser,
        signup,
        login,
        logout,
        updateDisplayName,
        updateProfilePhoto,
        db,
        updateProfileCover,
        updateBio,
        
        
    }
    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}


