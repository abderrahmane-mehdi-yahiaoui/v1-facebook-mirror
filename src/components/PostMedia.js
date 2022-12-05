import React from 'react'
import '../ressources/styles/postCreation.css'
import Icon from './Icons'
export function PostMedia({
    postCreationClass,
    IconContainer,
    name,
    src,
    size,
    PostMediaTitle,
    upload,
    title,
}) {
    return (
        <div className={postCreationClass + " postCreation__heightWidth"} >
            <button className="semiButton" >
                <div className="postCreationFlex" >
                    <span className={IconContainer + " marginRight8 "} type="button" upload>
                        <Icon name={name}
                            size={size}
                            src={src}
                        />
                       { upload && <input type="file" className="hiddenInput" title={title} aria-label={title} />}
                    </span>
                    <span className="text-color"> 
                        {PostMediaTitle}
                    </span>
                </div>
            </button>
        </div>
    )
}