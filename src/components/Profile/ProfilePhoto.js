import React, {useState} from 'react';
import styled from 'styled-components';
import { IconButton } from '../Buttons';
import { Avatar } from '../Avatar'
import Modal, { TopModal } from '../Modal/Modal';
import UpdatePhoto from './UpdatePhoto'
import *as Style from '../Styles/Styles'
export default function ProfilePhoto({ owner, user, openModal, profileModalRef, closeModal, loading}) {
    const [showOptions, setShowOptions] = useState(false)
    const handleShowOptions=(e)=>{
        e.preventDefault()
        setShowOptions((prev)=> !prev)
    }
    return (
        <>
        <ProfilePhotoContainer>
            <PhotoParent>
                <ProfilePhotoInner onClick={handleShowOptions}>
                    <ContainOverlay>
                        <Avatar user={user} src={user?.photoURL} size="168" loading={loading}/>
                        <HoverOverlay />
                    </ContainOverlay>
                </ProfilePhotoInner>
                <Option  user={user} showOptions={showOptions} openModal={openModal} owner={owner} setShowOptions={setShowOptions}/>
                {!loading && user && owner ?
                    <ButtonContainer onClick={openModal}>
                        <ContainOverlay>
                            <IconButton type="secondary" size="s" iconSize="20" icon="camera-flat" src="10" variante="primary" />
                            <HoverOverlay />
                        </ContainOverlay>
                    </ButtonContainer> :
                    ''
                }
            </PhotoParent>
        </ProfilePhotoContainer> 
        <Modal ref={profileModalRef} width="700">
            <TopModal heading="update profile photo" closeModal={closeModal} />
            <UpdatePhoto closeModal={closeModal}/>
        </Modal>
        </>
    )
}
function Option({ owner, showOptions, openModal, setShowOptions, user }){
    const closeALL=()=> {openModal(); setShowOptions(false)}
    return showOptions && (
        <OptionContainer>
            <div className="container">
                <Style.ItemContainer>
                  {user?.photoURL !== '' &&   <span>See profile photo</span> }
                    <HoverOverlay />
                </Style.ItemContainer>
                {owner && <Style.ItemContainer role="button" onClick={closeALL}>
                    <span >Update profile photo</span>
                    <HoverOverlay />
                    </Style.ItemContainer>}
            </div>
        </OptionContainer>
    )
}

const HoverOverlay = styled.div`
    height:100%;
    width:100%;
    position:absolute;
    top:0;
    right:0;
    right:0;
    left:0;
    background-color:var(--hover-overlay);
    opacity:0;
`
const ContainOverlay = styled.div`
    position:relative;
    border-radius:555px;
    overflow:hidden;
    height:100%;
    width:100%;  
`



const ProfilePhotoContainer = styled.div`
    position:absolute;
    border:none;

    transform: translateY(-86%);
    border-radius:555px;
    border-top-right-radius:50%;
    border-top-left-radius:50%;
    border-bottom-right-radius:50%;
    border-bottom-left-radius:50%;
    background-color: var(--card-background);
    padding:4px;
`
const PhotoParent = styled.div`
    position:relative
`
const ProfilePhotoInner = styled.div`
    background-color: var(--body-bg);
    position:relative;
    overflow:hidden;
    width:100%;
    height:100%;
    border-top-right-radius:50%;
    border-top-left-radius:50%;
    border-bottom-right-radius:50%;
    border-bottom-left-radius:50%;
    cursor:pointer;
    transition: all ease-in-out 200ms;
    outline:none;
    
    &:hover ${HoverOverlay}{
        opacity:1;
    }
    &:active, &:focus{
        transform: scale(.97);
        outline:none;
    }
`
const ButtonContainer = styled.div`
    position:absolute;
    bottom: 25px;
    right: 25px;
    cursor:pointer;
    transform: translate(50%, 50%);
    transition: opacity ease-in-out 200ms;
    outline:none;
    &:hover ${HoverOverlay}{
        opacity: 1;
    }
`
const OptionContainer = styled.div`
    position: absolute;
    background: var(--card-background);
    height: 79px;
    width: 344px;
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    overflow: hidden;
    transform: translate(-25%, 5%);
    box-shadow: 0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset);
    &>.container{
        position:relative;
        height:100%;
        width:100%;
        display:flex;
        flex-direction:column;
        justify-content:space-evenly;
        

    }
    & ${Style.ItemContainer}{
        border-radius:0;
        flex-basis:100%;
    }
    & ${Style.ItemContainer}:hover > ${HoverOverlay}{
        opacity:1;
    
    }
    
`


