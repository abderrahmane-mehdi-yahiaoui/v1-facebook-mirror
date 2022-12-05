import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../Avatar'
import Icon from '../../Icons';
import { TopModal } from '../../Modal/Modal'
import { useAuth } from '../../Context/AuthContext'
import './postModal.css'
export default function PostHeader(props) {
    const { currentUser } = useAuth()

    return (
        <div className="post-modal__top">
            <TopModal heading="create post" closeModal={props.closeModal}/>
            <div className="middle-modal">
                <div className="information-and-privacy">
                    <span className="left">
                        <Link to={`/profile/${currentUser.uid}`} className="" >
                            <Avatar
                                src={currentUser.photoURL}
                                hover
                                user={currentUser}
                            />
                        </Link>
                    </span>
                    <span className="right">
                        <div className="right-top">
                            <Link to={`/profile/${currentUser.uid}`} className="secondary-text">
                                <h4 style={{ color: "inherit" }}>{currentUser.displayName}</h4>
                            </Link>
                        </div>
                        <div className="right-bottom">
                            <div className="privacy-button">
                                <Icon name={`friends__list`} size="12" variante="primary" />
                                <span className="secondary-text text">Friends</span>
                                <Icon name={`caret__down`} src={`2`} size="12" variante="primary" />
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>

    )
}

