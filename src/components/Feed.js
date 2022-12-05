import React, { useState, useRef, useEffect } from 'react'

import {Post, PostHeader, PostBottom, PostCreation} from './Post/index.js'
import { IconButton } from './Buttons'
import styled from 'styled-components'
import Modal from './Modal/Modal';
import {  useAuth } from './Context'
import db, { app } from '../config/Firebase'
import { Hover } from './Styles/Styles'
import Typography from './Typography'
function Feed() {
    const { currentUser } = useAuth()
    const [loading, setLoading]=useState(true)
    const [posts, setPosts]=useState([])
    const [photo, setPhoto] = useState(null)
    const [error, setError] = useState(false)
    const modalRef = useRef()

    const openModal = () => {
        modalRef.current.openModal()
        document.body.classList.add('no-scroll')
    };
    const closeModal = () => {
        modalRef.current.closeModal()
        setPhoto(null)
        document.body.classList.remove('no-scroll')
    }
    let metaData = {
        contentType: 'image/jpeg'
    }
    const imageUploadChange= async(e) => {
        if(e.target.files){
            const image = e.target.files[0]
            const storageRef = app.storage().ref()
            const imageRef = storageRef.child(`/post-photo/${currentUser.uid}/${image.name}`)
            await imageRef.put(image, metaData)
            setPhoto(await imageRef.getDownloadURL())
            openModal()
        }
        else {
            setPhoto(null)
            setError(true)
            console.log('error', error)
            return
        }

    }
    useEffect(()=>{
       if(!currentUser) return
        const fetchPosts=db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
                setPosts(snapshot.docs.map((doc) =>({id: doc.id, data: doc.data() }))))
                setTimeout(()=>{
                    setLoading(false)
                }, 1000)   
               
        return ()=>{ fetchPosts() }
    },[currentUser]);
    return (
        <FeedContainer>
      
            <ReelContainer>
                <Story>
                    <Button>
                        <IconButton type="primary-focused" size="medium" iconSize="20" icon="plus_ultra" src="2" variante="accent"/>
                        <div className="flex">
                            <Typography as="span" weight="600" font="medium" text="Create a story" Color="primary" />
                            <Typography as="span" weight="normal" font="sub" text="Share a photo or video." Color="secondary" />
                        </div>
                        <Hover />
                    </Button>  
                </Story>
            </ReelContainer>
            
            <PostCreation
                loading={loading}
                path={`profile/${currentUser.uid}`}
                openModal={openModal}
                message={"What's on your mind, "}
                writeTo={`${currentUser.displayName}?`}
                buttons={
                    <>
                        <IconButton
                            label={"Live Video"}
                            space="8"
                            shape="rectangle" size="rec-medium" type="primary" hoverable
                            icon={"camera"}
                            src={`1`}
                            fontSize=".9457rem"
                            fontWeight="600"
                            textColor="secondary"
                        />
                        <IconButton
                            label={"Photo/Video"}
                            space="8"
                            shape="rectangle" size="rec-medium" type="primary" hoverable
                            icon={"photo-video"}
                            src={`1`}
                            fontSize=".9457rem"
                            fontWeight="600"
                            textColor="secondary"
                        >
                            <input
                                type="file" className="hiddenInput"
                                accept={`images/*`}
                                onChange={imageUploadChange}
                                title={`upload a photo or video`}
                                aria-label={`upload a photo or video`}
                            />
                        </IconButton>
                        <IconButton
                            label={"Feeling/Activity"}
                            space="8"
                            shape="rectangle" size="rec-medium" type="primary" hoverable
                            icon={`feelings`}
                            src={`1`}
                            fontSize=".9457rem"
                            fontWeight="600"
                            textColor="secondary"
                        />
                    </>
                }
            />
            <Modal ref={modalRef} width={"500"} height={428} >
                <div id="post-modal">
                    <PostHeader closeModal={closeModal} />
                    <PostBottom closeModal={closeModal} photo={photo} />
                </div>
            </Modal>
            <Post posts={posts} loading={loading} path={`/profile`} currentUser={currentUser} />
            
        </FeedContainer>
    )
}

export default Feed

const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
` 

const Story = styled.div`
    background: var(--card-background);
    width:100%;
    border-radius6px;
    padding: 6px 8px;
    border-radius: 7px;
    position:relative;
    box-shadow: 0 1px 2px var(--shadow-2);
   
    @media only screen and (max-width: 700px){
        border-radius:0px;
    }
`
const ReelContainer = styled.div`
    margin-top: 24px;
    margin-bottom:24px;
    display: flex;
    flex-direction: row;
    position:relative;
    max-width:590px;
    width:100%;
    justify-content:center;
    @media only screen and (max-width: 1000px){
        max-width:unset;
    }
`
const Button = styled.div`
    border-radius:8px;
    display:flex;
    padding:8px;
    position:relative;
    cursor:pointer;
    align-items:center;
    &:hover ${Hover}{
        opacity:1;
    }
    & >.flex{
        display:flex;
        flex-direction:column;
        margin-left:6px;
        padding:6px 0px;
    }
    
`