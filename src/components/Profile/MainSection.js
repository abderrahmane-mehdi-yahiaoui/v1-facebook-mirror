import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from '../Modal/Modal'
import { Post, PostHeader, PostBottom, PostCreation } from '../Post/index.js'
import { IconButton } from '../Buttons'
import { useAuth, usePost } from '../Context'
import db, { app } from '../../config/Firebase'
import Intro from './Intro'
export default function MainSection({ user, owner, match }) {
    const { currentUser } = useAuth()
    const [posts, setPosts]= useState([])
    const [error, setError] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading]= useState(true)

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
        const image= e.target.files[0]
        if(image){
            setPhoto(image)
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
       
        const fetchPosts=()=>{
            if(currentUser  && user){
                db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
                setPosts(snapshot.docs.map((doc) =>({id: doc.id, data: doc.data() }))))
                setTimeout(()=>{
                    setLoading(false)
                }, 1000)   
            }
           
        }
        return()=> fetchPosts()
    },[currentUser, user]);
   
    
    return (
        <>
            <Wrapper>
                <Section >         
                    <Intro master={user?.role === 'master'} />
                </Section>
                <Section>
                    <PostCreation
                        path={`${match.url}/${currentUser.uid}`}
                        openModal={openModal}
                        message={owner ? "What's on your mind?" : "Write something to"}
                        writeTo={!owner && user?.firstName}
                        buttons={
                            <>
                                <IconButton
                                    label={!owner ? "Photo/Video" : "Live Video"}
                                    space="8"
                                    shape="rectangle" size="rec-medium" type="primary" hoverable
                                    icon={!owner ? "photo-video" : "camera"}
                                    src={`1`}
                                    fontSize=".9457rem"
                                    fontWeight="600"
                                    textColor="secondary"
                                >
                                    {!owner && <input
                                        type="file" className="hiddenInput"
                                        accept={`images/*`}
                                        onChange={imageUploadChange}
                                        title={`upload a photo or video`}
                                        aria-label={`upload a photo or video`}
                                    />}
                                </IconButton>
                                <IconButton
                                    label={!owner ? "Tag a Friend" : "Photo/Video"}
                                    space="8"
                                    shape="rectangle" size="rec-medium" type="primary" hoverable
                                    icon={!owner ? "friends__tag" : "photo-video"}
                                    src={`1`}
                                    fontSize=".9457rem"
                                    fontWeight="600"
                                    textColor="secondary"
                                >
                                    {owner && <input
                                        type="file" className="hiddenInput"
                                        accept={`images/*`}
                                        onChange={imageUploadChange}
                                        title={`upload a photo or video`}
                                        aria-label={`upload a photo or video`}
                                    />}
                                </IconButton>
                                <IconButton
                                    label={!owner ? "Feeling/Activity" : "Life Event"}
                                    space="8"
                                    shape="rectangle" size="rec-medium" type="primary" hoverable
                                    icon={!owner ? `feelings` : "flag-event"}
                                    src={!owner ? `1` : '11'}
                                    fontSize=".9457rem"
                                    fontWeight="600"
                                    textColor="secondary"
                                />
                            </>
                        }
                    />
                    <Post  posts={posts} loading={loading} path={`/profile`} currentUser={currentUser} />
                </Section>
            </Wrapper>
            <Modal ref={modalRef} width={500} height={428} >
                <div id="post-modal">
                    <PostHeader closeModal={closeModal} />
                    <PostBottom closeModal={closeModal} photo={photo} />
                </div>
            </Modal>
        </>
    )
}



const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    max-width:100%;
    height:100%;
    align-items:center;
    margin-top:8px;
    padding:0 16px;
    flex-wrap:wrap;
    justify-content:center;
    width:auto;
    align-items:flex-start;
    width: 100%;
    @media only screen and (max-width: 700px){
       padding: 0px;
    }

`
const Section = styled.section`
    display: inherit;
    flex-direction:column;
    height:100%;
    position:relative;
    margin: 8px;
    @media only screen and (max-width: 700px){
        margin: 8px 0px;
    }
    &:nth-of-type(1){
        flex-basis: 360px;
        position:sticky;
        top:0;
       
    }
    &:nth-of-type(2){
        flex-basis:500px;
    }
    @media only screen and (max-width: 930px){
        flex-basis: unset !important;
        position:relative !important;
        width:100%;

        & >.sm-screen, #post-block{
            max-width:unset;

        }
    }
    
`
