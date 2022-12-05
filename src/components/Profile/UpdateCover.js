import React, {useState, useRef} from 'react';
import {Modal, TopModal, Dialog} from '../Modal';
import {IconButton} from '../Buttons';
import styled from 'styled-components'
import * as Style from '../Styles/Styles'
import { useAuth} from '../Context'
import {app} from '../../config/Firebase'

export default function UpdateCover({ coverModalRef, closeModal, user}) {
    const { updateProfileCover, currentUser } = useAuth()
    const [cover, setCover]=useState(null)
    const [error, setError]=useState(false)
    const [loading, setLoading]=useState(false)
    let metaData = {
        contentType: 'image/jpeg'
    }
    function handleCoverChange(e){
        const image = e.target.files[0]
        if(image){
            setCover(image)
            openDialog()
        }
    }
    async function updateCover(e){
        e.preventDefault()
        if(cover){
            const storageRef = app.storage().ref()
            const uploadTask = storageRef.child(`/users/${currentUser.uid}/profile-cover`)
            await uploadTask.put(cover, metaData)
            try{
                setLoading(true)
                closeDialog()
                
                updateProfileCover(await uploadTask.getDownloadURL())
                closeModal()
                setLoading(false)
            }
            catch(error){
                console.log(error)
                setError(true)
    
            }
            
        }
    }
 
    const handleImageDrop = async (image, e) =>{
        
        if(image){
            setCover(image)
            openDialog()
        }

    }
   
    const handleCancel=e=>{
        e.preventDefault()
        setCover(null)
        closeDialog() 
    }
    const dialogRef = useRef()
    const openDialog=()=>{
        dialogRef.current.openDialog()
    }
    const closeDialog=()=>{
        dialogRef.current.closeDialog()
    }
    const handleOndragOver = (e) =>{
        e.preventDefault()
    }
    
    const handleOndrop = (e) =>{
        e.preventDefault()
        e.stopPropagation()
        let imageFile = e.dataTransfer.files[0];
        handleImageDrop(imageFile)
    }
    return (
        <>
        <Modal ref={coverModalRef} width="548">
            <TopModal heading="Update cover photo" closeModal={closeModal} />
            <CenterBox>
                <ItemContainer onDrop={handleOndrop}  onDragOver={handleOndragOver} >
                    <IconButton type="secondary" size="large" icon="upload-arrow" variante="primary" src="12" />
                    <span>
                        Upload Photo
                        
                    </span>
                    
                    <Style.HoverButton />
                    <input 
                        type="file" className="hiddenInput"  
                        accept={`images/*`} 
                        onChange={handleCoverChange}
                        aria-label="Drop or upload a photo"
                        title="Drop or upload a photo"
   
                    />
                </ItemContainer>
            </CenterBox>
        </Modal>
        <Dialog ref={dialogRef} width="548" 
            heading={`Confirm changing`}
            message={`Do you confirm changing your cover photo?`}
            confirm={`confirm`}
            
            onConfirm={!loading ? updateCover: undefined}
            onDiscard={handleCancel}
        />
        </>
    )
}


const CenterBox = styled.div`
    padding: 12px;
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
`
const ItemContainer = styled.div`
    border-radius:8px;
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    width: 100%;
    position: relative;
    padding: 6px;
    &:hover > ${Style.HoverButton}{
        opacity:1;
    }
    & > span{
        color: var(--primary-text);
        font-size:inherit;
        font-weight:inherit;
        margin-left:8px;
    }

`