import React, {useContext, useState, createContext, useEffect} from 'react';
import  db from '../../config/Firebase';
import { useAuth } from '../Context/AuthContext'
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
const PostContext = createContext()
export function usePost(){
    return useContext(PostContext)
}

export function PostProvider({ children }){
    const [post, setPost]= useState(()=> "")
    const [posts, setPosts]=useState([])
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    
    const id = uuidv4()
    function handlePost(caption, image ){
        console.log(id)
        setPost(db.collection("posts").doc(id).set({
            postId: id,
            authorUid: currentUser.uid,
            postAuthor: currentUser.displayName,
            authorPic: currentUser.photoURL,
            caption: caption, 
            reaction:{
                reactionUser:[],
                like:0,
                love:0,
                grr:0,
                haha:0,
                sad:0,
            },
            image,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            
        }))  
        setLoading(false)  
    }
    
    async function deletePost(postId){
        const postRef = db.collection('posts').where('postId', '==', postId)
        postRef.get().then((querySnapshot)=>{
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
              });
        })
    }
    
    

    const value = {
        handlePost,
        loading,
        posts,
        deletePost,
        id,
       
    }
    return(
        <PostContext.Provider value={value}>
            { children }
        </PostContext.Provider>
    )
}