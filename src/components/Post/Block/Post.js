import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Information from './Information';
import Content from './Content';
import Interaction from './Interaction';
import Comment from './Comments/Comments';
import { useAuth } from '../../Context'


export default function Post(props){
    const {currentUser}= useAuth()
    
    
    if(!props.loading){
        return(
            <>{props.posts.map(post=> 
            <Wrapper key={post.data.postId} >
                <Block id="post-block">
                    <Information  
                        user={post.data.authorUid}
                        name={post.data.postAuthor}
                        photoURL={post.data.authorPic}
                        path={`${props.path}/${post.data.authorUid}`}
                        verified={props.verified}
                        timestamp={post.data.timestamp}
                        loading={props.loading}
                        currentUser={currentUser.uid}
                        postId={post.data.postId}
                    />
                    <Content 
                        caption={post.data.caption}
                        image={post.data.image}
                        loading={props.loading}
                    />
                     
                    <Interaction
                        // reactions={`Love`}
                     reactionUser={currentUser.uid}
                        reactionUserId={post.data.authorUid}
                        postId={post.data.postId}
                    />
                    <Comment postId={post.data.postId}  user={currentUser} currentUserPhoto={currentUser.photoURL}/>
                    
                </Block>
            </Wrapper>)
        }</>)
    }
    return(
        <>
            <Wrapper >
                <Block id="post-block">
                    <Information
                        loading={props.loading}
                    />
                    <Content loading={props.loading} />
                </Block>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    margin-bottom: 16px;
    
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Block = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width:100%;
    min-height: 210px;
    height: auto;
    background-color: var(--card-background);
    border-radius: 8px;
    box-shadow: 0 1px 2px var(--shadow-2);
    @media only screen and (max-width: 1000px){
        max-width:unset;
    }
    @media only screen and (max-width: 700px){
        border-radius:0px;
    }
    
`