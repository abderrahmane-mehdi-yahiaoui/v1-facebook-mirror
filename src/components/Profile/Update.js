import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Avatar } from '../Avatar'
import * as Style from '../Styles/Styles'
import ProfilePhoto from './UpdatePhoto';
import {Modal, TopModal } from '../Modal'
import {IconButton} from '../Buttons';
import UpdateCover from './UpdateCover';
import UpdateBio from './UpdateBio';
import Typography from '../Typography';
export function Update({ user, owner,  }){
    const [initial, setInitial]= useState(true)
    const [editProfilephoto, setEditProfilePhoto]= useState(false)
    const [editBio, setEditBio]=useState(false)
    const handleSwitchPP = (e) =>{
        e.preventDefault()
        setInitial(false)
        setEditProfilePhoto(true)
    }
    const handleOpenBio =(e)=>{
        e.preventDefault()
        
        setEditBio(true)
    }
    const coverModalRef = useRef()
   
    const openModal = () => {
        if (owner) {
            coverModalRef.current.openModal()
            document.getElementById('overlay').classList.add('no-scroll')
            document.body.classList.add('no-scroll')
        }

        return 
    };
    const closeModal = () => {
        coverModalRef.current.closeModal()
        document.getElementById('overlay').classList.remove('no-scroll')
    }
    return owner &&(
        initial ?(
            <GeneralUpdate 
                user={user} 
                handleOpenBio={handleOpenBio} 
                handleSwitchPP={handleSwitchPP} 
                editBio={editBio} 
                modal={
                    <UpdateCover coverModalRef={coverModalRef} closeModal={closeModal} user={user}/>
                }
                openModal={openModal}
            />
        )
        :
        editProfilephoto ?(
            <ProfilePhoto />
        ): null   
    )
}





function GeneralUpdate({ handleSwitchPP, user,  openModal, modal}){
    const [showBio, setShowBio]=useState(false)
    const handleShow=()=>{
        setShowBio((prev)=> !prev)
    }
    return(
        <>
        <Container>
           <Banner>
                <Subheading>profile picture</Subheading>
                <Style.ButtonContainer  onClick={handleSwitchPP}>
                    <Style.EditButton role="button">{user?.photoURL !== null ? "edit": "add"}</Style.EditButton>
                    <Style.HoverButton />
                </Style.ButtonContainer>
           </Banner>
           <CenterBox>
               <Element>
                    <Avatar user={user} src={user?.photoURL} size="168" />
               </Element>
           </CenterBox>
           <Banner>
                <Subheading>cover photo</Subheading>
                <Style.ButtonContainer onClick={openModal}>
                    <Style.EditButton>{user?.cover !== null ? "edit": "add"}</Style.EditButton>
                    <Style.HoverButton />
                </Style.ButtonContainer>
           </Banner>
           <CenterBox>
               <Element>
                    <Cover>
                        <img src={user?.cover} alt="" />
                    </Cover>
               </Element>
           </CenterBox>
           <Banner>
                <Subheading>bio</Subheading>
                <Style.ButtonContainer onClick={handleShow}>
                    <Style.EditButton>{user?.bio !== null ? "edit": "add"}</Style.EditButton>
                    <Style.HoverButton />
                </Style.ButtonContainer>
           </Banner>
           <CenterBox>
               <Element>
                   {!showBio? <div dir="auto"><Typography as="span" Color="primary" text={user?.bio} /></div> : <UpdateBio handleShow={handleShow} bioValue={user?.bio}/>}
               </Element>
           </CenterBox>
        </Container>
        {modal}
        </>
    )
}





const Container = styled.div`

`
const Banner = styled.div`
    width:100%;
    display:flex;
    margin:4px 0x;
    height:38px;
    align-items:flex-end;
    justify-content:space-between;
    padding: 0 16px;
`
const Subheading = styled.span`
    font-size: 1.25rem;
    font-weight:600;
    color:var(--primary-text);
    text-transform:capitalize;
`


const CenterBox = styled.div`
    padding: 12px;
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    &:last-of-type{
        margin-bottom:10px;
    }
`
const Element= styled.div`
    padding: 4px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    &.f-pad{
        padding-top:40px;
        padding-bottom:40px;
    }
    & > span{
        color: var(--primary-text);
        word-break: break-word;  
        font-size:inherit;
    }
    
`
const Cover = styled.div`
    max-width: 500px;
    height:185px;
    border-radius:8px;
    overflow:hidden;
    background-color: var(--input-bg);
    width:100%;
    & > img{
        width:100%;
        objectif-cover;
    }
`
