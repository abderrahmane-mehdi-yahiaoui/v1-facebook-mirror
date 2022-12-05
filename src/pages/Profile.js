import React, {useEffect, useState} from 'react'
import {useParams, Switch, Route} from 'react-router-dom'
import { useAuth } from '../components/Context'
import db from '../config/Firebase'
import styled from 'styled-components'
import { ProfileHeader, MainSection } from '../components/Profile'
import Header from '../components/Navigation/Header';
import PageNotFound from '../components/PageNotFound'
export default function Profile({ match }){
    const { currentUser } = useAuth()
    const [user, setUser]= useState()
    const [error, setError]=useState(false)
    const [loading, setLoading]=useState(true)

    const {uid}= useParams()
   
    useEffect(() => {
        
        const fetchUser = db.collection('users').doc(uid).onSnapshot((doc) => {
                setUser(doc.data())
                
            })
            setTimeout(()=>{
                setLoading(false)
                
            }, 1000)
            
        
        return ()=> fetchUser
    }, [uid, user])
    useEffect(()=>{
            if(user && match.path === '/profile/:uid'){
                document.title = `${ user?.displayName } | Facebook Clone`
            }
        return() => document.title='Facebook Clone'
        
    }, [user, match.path])
    const owner = currentUser.uid === uid
    return(
        <div id="profile">
            <Header />
            <ProfileHeader uid={uid} match={match} user={user} owner={owner} loading={loading} />
            <Main>
                <Switch>
                 
                    <Route exact path={match.path}  >
                        <MainSection  user={user} owner={owner} match={match} />
                    </Route>
                    <Route path="*" component={PageNotFound}/>
                </Switch>
            </Main>
        </div>
    )
    
}

const Main = styled.main`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
`
 


/* function Profile() {
    const { updateProfilePhoto, updateDisplayName, currentUser } = useAuth()
    const [photoURL, setPhotoURL] = useState(currentUser.photoURL)
  
    const [displayName, setDisplayName] = useState(" ")
   

    const promises = []
    function onChange(e) {
        if (e.target.files.length) {
            promises.push(setPhotoURL(URL.createObjectURL(e.target.files[0])));
        }
    }
    function displayNameOnChange(e) {
        if (e.target.value.length) {
            promises.push(setDisplayName(e.target.value))
        } else {
            alert('something happened')
        }
    }
    async function SubmitPhotoURL(e) {
        e.preventDefault()
        try{
            updateProfilePhoto(photoURL)
            closeModal()
        }
        catch{
                alert('something happened')
        }
    }
    async function SubmitDisplayName(e) {
        e.preventDefault()
        try {
            updateDisplayName(displayName)

        }
        catch{
            alert('something happened')
        }
    }
    
    const profileModalRef = React.useRef()
   
    const openModal = () => {
        profileModalRef.current.openModal()
        setPhotoURL("")
    };
    const closeModal = () =>{
        profileModalRef.current.closeModal()
        setPhotoURL(currentUser.photoURL)
    }
    
    const handleOndragOver = e => {
        e.preventDefault();
    }
    const handleFile = file => {
        setPhotoURL(file);
        setPhotoURL(URL.createObjectURL(file));
    }
    const handleOndrop = e => {
        e.preventDefault();
        e.stopPropagation();
        let imageFile = e.dataTransfer.files[0];
        handleFile(imageFile);
    }
  
    return (
        <div>
            <div>
                <Avatar src={currentUser.photoURL} />
                <button onClick={openModal}>update photo</button>
            </div>
            <Modal ref={profileModalRef}>
                
                    <button onClick={closeModal} style={{position:'absolute', right:'0'}}>close</button>
                    <form onSubmit={SubmitPhotoURL}>
                    {photoURL?
                        <div style={{height:'300px'}} > 
                             <img src={photoURL} style={{width:'100%', height:'300px'}}/>  
                        </div>
                        : <div style={{height:'300px', display:'flex', alignItems:'center', justifyContent:'center'}}  onDragOver={handleOndragOver}onDrop={handleOndrop}>drop your image here.</div>
                    }
                            {!photoURL && <input type="file"  onChange={onChange} />}
                            <button role="button" type="submit" style={{width:'100%', height:'40px', background:'blue' }}> update photo</button>
                    </form>
 
            </Modal>
           
            <form onSubmit={SubmitDisplayName}> 
                <input defaultValue={currentUser.displayName} onChange={displayNameOnChange} />
                <button type="submit">update name</button>
            </form>
        </div>
    )
}

export default Profile
*/