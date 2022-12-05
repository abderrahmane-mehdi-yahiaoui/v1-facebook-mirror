import React, {useState, useEffect} from 'react'
import { Avatar } from '../../Avatar'
import { Link } from 'react-router-dom'
import { IconButton } from '../../Buttons'
import {Verified} from '../../Verified'
import * as Style from '../Styles'
import { ItemContainer} from '../../Styles/Styles'
import styled from 'styled-components'
import { usePost} from '../../Context'
import db from '../../../config/Firebase'
import Icon from '../../Icons'
import Typography from '../../Typography'
export default function Information(props){
    const [showOptions, setShowOptions]= useState(false)
    const [postUser, setPostUser]=useState('')
    const handleShow=e=>{
        setShowOptions((showOptions)=> !showOptions)
        console.log(showOptions)
    }
    const owner = props.user === props.currentUser
    useEffect(() => {
        const fetchUser =db.collection('users').doc(props.user).onSnapshot((doc)=>{
            setPostUser(doc.data())
        })
        return () => fetchUser
        
    }, [props.user])
    return (
        <div className="p-relative">
            <Style.PaddingSides>
                <Style.Center className="__top--8">
                    <Style.FlexBetween>
                        <InfoContainer>
                            <Style.Holder>
                                <Link to={props.path}>
                                    <Avatar user={!props.loading} src={postUser?.photoURL} loading={props.loading} hover/>
                                </Link>
                            </Style.Holder>
                            <Style.Holder>
                                
                                <Link className={postUser?.verified ? 'transform-scale-verified primary-text': 'primary-text' } to={props.path} style={postUser?.verified &&{display:'flex', alignItems:'center'}}>
                                    {!props.loading ?<Text>{props.name}</Text>: <div className="loading-text"><div className="loading"></div></div> }
                                   {postUser?.verified ? <Icon style={{transform:'scale(.7)', display:'flex', alignItems:'center', justifyContent:'center'}} src="2" size="16" name="verified" aria-label="Verified Account" />: ''}

                                </Link>
                                <span className="secondary-text" >
                                    <Typography
                                        link
                                        Color="secondary"
                                        weight="400"
                                        font="sub"
                                        as="span" 
                                        text={ !props.loading ? new Date(props.timestamp?.toDate()).toUTCString(): <div className="loading-text"><div className="loading"></div></div>}
                                    />
                                </span>
                            </Style.Holder>
                        </InfoContainer>
                        <div >
                            {!props.loading && <IconButton onClick={ handleShow}  hover size="s" icon="kebbab__menu" src="3" />}
                        </div>
                       
                    </Style.FlexBetween>
                </Style.Center>
            </Style.PaddingSides>
            <Options showOptions={showOptions} owner={owner} postId={props.postId} />
        </div>
        
    )
}
const Options = ({postId, showOptions, owner}) =>{
    const { deletePost } = usePost()
    const handleDeletePost=e=>{
        e.preventDefault()
        deletePost(postId)
    }
    if(showOptions){
       
        return(
            <CardHandler>
                <Card>
                    {owner ?<> <ItemContainer role="button" onClick={handleDeletePost}>
                        <span>Delete</span> 
                        <HoverOverlay />
                    </ItemContainer>
                    <ItemContainer role="button">
                        <span>Edit</span>
                        <HoverOverlay />
                    </ItemContainer></>: null}
                    <ItemContainer role="button">
                        <span>Save</span>
                        <HoverOverlay />
                    </ItemContainer>
                </Card>
            </CardHandler>
        )
    }
    return null;
}
const InfoContainer = styled.span`
    display:flex;
    height:100%;
    width:100%;
`

const Text = styled.span`
    font-size: .9375rem;
    font-weight: 600;
    text-transform:capitalize;
`
const SubText = styled.span`
    font-weight:400;
    font-size: .6rem;
`
const CardHandler = styled.div`
    position:absolute;
    right: 12px;
    transform: translateY(-6%);
    z-index:1;
    box-shadow: 0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset);
`
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
const Card = styled.div`
    background: var(--card-background);
    border: 1px solid var(--input-bg);
    width:160px;
    min-height:50px;
    max-height: calc(100vh - 20px);
    height:100%;
    border-radius:6px;
    overflow:hidden;
    & > ${ItemContainer}{
        border-radius:0;
        &:hover ${HoverOverlay}{
            opacity: 1
        }
    }
`

