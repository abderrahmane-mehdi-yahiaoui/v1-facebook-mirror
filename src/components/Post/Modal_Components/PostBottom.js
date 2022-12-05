import React, {  useEffect, useState } from 'react';
import { useAuth, usePost } from '../../Context';
import { IconButton, Button } from '../../Buttons';
import Icon from '../../Icons';
import db, {app} from '../../../config/Firebase';

export default function PostBottom({ closeModal, photo, }) {
    const { currentUser } = useAuth()
    const { handlePost, id } = usePost()
    const initialValue = `What's on your mind, ${currentUser.displayName} ?`
    const [caption, setCaption] = useState("")
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)
    const [preview, setPreview]=useState(null)

    let metaData = {
        contentType: 'image/jpeg'
    }
    function imageUploadChange(e){
        const photo = e.target.files[0]
        if(!photo){setImage(null)}
        if(photo){
            setPreview(URL.createObjectURL(photo))
            setImage(photo)
        }
    }
   
   
    const handleCaption=e=>{
        const value = e.target.value
        if(!value){ setCaption("")}
        setCaption(value)
    }

    function closePreview(e) {
        e.preventDefault()
        setImage(null)
        setPreview(null)
    }
    useEffect(()=>{
        if(photo){
            setImage(photo)
            setPreview(URL.createObjectURL(photo))
        }
    }, [photo])
    async function postHandler(e) {
        e.preventDefault()
        if (caption !== '' || image !== null) {
            if(image){
                const storageRef = app.storage().ref()
                const uploadTask = storageRef.child(`/posts/${id}/${image.name}`)
                await uploadTask.put(image, metaData)
                setImage(await uploadTask.getDownloadURL())
            }
            handlePost(caption, image)
            setImage(null)
            setCaption("")
            closeModal()
        }else {
            setError('something happened while uploading your post')
        }
    }
    const handleOndragOver = e => {
        e.preventDefault();
    }
    const handleFile = async(image) => { 
        const storageRef = app.storage().ref()
        const imageRef = storageRef.child(`/profile-photo/${currentUser.uid}/${image.name}`)
        await imageRef.put(image, metaData)
        setImage(await imageRef.getDownloadURL())
    }
    const handleOndrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let imageFile = e.dataTransfer.files[0];
        handleFile(imageFile);
    }
    
    
    return (
        <div className="post-modal__bottom">
            <div>
                <div className="text-area__container" onDragOver={handleOndragOver}onDrop={handleOndrop} >
                    <textarea 
                        id="content-editable"
                        
                        onChange={handleCaption}           
                        placeholder={initialValue}
                      
                    />
                    <div className="bottom-barre">
                        <div className="bottom-barre__container">
                            {!preview && <button><Icon name={`colored__text`} size="38"/></button>}
                            <button><Icon name={`emoji`} src={`3`} /></button>
                        </div>
                    </div> 
                    {preview && image && 
                        <div className="image-preview_container">                
                            <img className="image-preview" src={preview}  alt="" />
                            <IconButton onClick={closePreview} type="secondary" hoverable  icon="times" variante="secondary"iconSize="20" src="2" size="s28" />
                        </div>
                    }
                </div> 
                <div className="add-to-post">
                    <div role="button" className="add-to-post-button">
                        <span className="text">
                            add to your post
                        </span>
                        <div className="add-to-post__right">
                            <IconButton hover  size="s" icon="photo-video" src="1"   title="upload a photo or video">
                                <input 
                                    type="file" className="hiddenInput"  
                                    accept={`images/*`} 
                                    onChange={imageUploadChange}
                                    title={`upload a photo or video`} 
                                    aria-label={`upload a photo or video`}
                                />
                            </IconButton>
                            <IconButton 
                                
                                size="s" 
                                icon="friends__tag" 
                                src="1"  
                                disabled
                                hover
                                title="tag a friend"
                            />
                            <IconButton 
                               
                                size="s" 
                                icon="feelings" 
                                src="1"  
                                disabled
                                hover
                            />
                            <IconButton 
                               
                                size="s" 
                                icon="marker" 
                                src="4"  
                                disabled
                                hover
                            />
                            <IconButton 
                                
                                size="s" 
                                icon="camera" 
                                src="1"  
                                disabled
                                hover
                            />
                            <IconButton 
                               
                                size="s" 
                                icon="kebbab__menu" 
                                src="3"  
                                disabled
                                variante="secondary"
                                hover
                            />
                        </div>
                    </div>
                    <div className="post-modal__last-child">
                        <Button 
                            textColor={caption === ''   &&  'disabled'} 
                            buttonText={caption !== ''  &&  "primary"  } 
                            width="100"  type={caption === ''  ? 'disabled': 'primary'} 
                            disabled={caption === ''   ? true: false}
                            submit={postHandler}
                        >Post
                        </Button> 
                    </div>
                </div> 
            </div>         
        </div>

    )
}
