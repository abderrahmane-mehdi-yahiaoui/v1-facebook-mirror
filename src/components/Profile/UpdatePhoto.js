import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Context';
import styled from 'styled-components';
import { IconButton, Button } from '../Buttons';
import { Avatar } from '../Avatar';
import { Bottom } from '../Styles/Styles'
import { Dialog } from '../Modal';
import {app} from '../../config/Firebase'
import { v4 as uuidv4} from 'uuid'
export default function ProfilePhoto({ closeModal  }) {
    const [showCase, setShowCase] = useState()
    return (
        <Container>
            <Screen setShowCase={setShowCase} showCase={showCase} closeModal={closeModal} />
        </Container>
    )
   
}
function Screen({ closeModal, showCase, setShowCase}) {
    const {currentUser} = useAuth()
    const { updateProfilePhoto } = useAuth()

    const [photoURL, setPhotoURL] = useState(null)
    const [preview, setPreview] = useState({state: false, image:null})

    let metaData = {
        contentType: 'image/jpeg'
    }
    function handleProfileChange(e){
        const image = e.target.files[0]
        if(image){
            setPreview({state: true, image: URL.createObjectURL(image)})
            setPhotoURL(image)
            setShowCase('PREVIEW_AND_SAVE')
        }
    }
    async function SubmitProfilePhoto(e){
        e.preventDefault()
        if(photoURL){

            const storageRef = app.storage().ref()
            const uploadTask = storageRef.child(`/users/${currentUser.uid}/profile-photo`)
            await uploadTask.put(photoURL, metaData)
            try{
                updateProfilePhoto(await uploadTask.getDownloadURL())
                closeModal()
            }
            catch(error){
                console.log(error)
            }
            
        }
    }
  
   const handleFile = async (image) => {
        setPreview({state: true, image: URL.createObjectURL(image)})
        setPhotoURL(image)
        setShowCase('PREVIEW_AND_SAVE')
    }
    const handleOndragOver = (e) => {
        e.preventDefault()
    }
    
    const handleOndrop = (e) => {
        e.stopPropagation()
        let image = e.dataTransfer.files[0];
        handleFile(image)
    }


    const dialogRef = useRef()
    const openDialog = () => {
        dialogRef.current.openDialog()
    }
    const closeDialog = () => {
        dialogRef.current.closeDialog()
    }
    const handleCancel = e => {
        e.preventDefault()
        closeDialog()
    }
    const handleDiscard = e => {
        setPhotoURL(null)
        setPreview(false)
        closeDialog()
        closeModal()
    }

    switch (showCase) {
        default:
            return (

                <ButtonContainer  onDrop={handleOndrop} handleOndrop={handleOndrop} onDragOver={handleOndragOver}  >
                    <IconButton label="upload photo" shape="rectangle" type="focus-accent" textColor="accent" size="update-100" icon="plus" variante="accent" src="3" fontSize=".9375rem;" fontWeight="600">
                        <input
                            type="images" className="hiddenInput"
                            accept={`images/*`}
                            onChange={handleProfileChange}
                            aria-label="Drop or upload a photo"
                            title="Drop or upload a photo"
                        />
                    </IconButton>             
                </ButtonContainer>

            )
        case 'PREVIEW_AND_SAVE':
            return (
                <>

                    <CenterBox>
                        <Avatar src={preview.image} size="168" user={preview.image} />
                    </CenterBox>
                    <div className="divider" />
                    <Bottom>
                        <GroupeButtons>
                            <Button submit={openDialog} padding="12" type="secondary-hover" textColor="accent">cancel</Button>
                            <Button submit={SubmitProfilePhoto} padding="40" type="primary">save</Button>
                        </GroupeButtons>
                    </Bottom>
                   


                    <Dialog ref={dialogRef} width="548"
                        heading={`discard changes`}
                        message={`Are you sure that you want to discard your changes?`}
                        confirm={`discard`}
                        onConfirm={handleDiscard}
                        onDiscard={handleCancel}
                    />
                </>
            )
    }

}
const Container = styled.div`
    padding: 16px;
    display:flex;
    overflow:hidden;
    flex-direction:column;
`
const ButtonContainer = styled.div`
    width:100%;
`
const CenterBox = styled.div`
    padding: 16px;
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
`

const GroupeButtons = styled.div`  
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`
