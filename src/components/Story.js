import React from 'react'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IconButton } from './Buttons'

export function StoryContainer({ children, image, createStory, to}) {
    return (
        <StoryWrapper>
            <Container>
            <LinkStory to={to}>
                <Shadow >
                    <ImageContainer createStory={createStory}>
                        <ImageOverlay src={image} onError={(e)=>{e.target.onError = null; e.target.src="https://i.stack.imgur.com/l60Hf.png"}}/>
                    </ImageContainer>
                </Shadow>
                {children}
            </LinkStory>
            </Container> 
        </StoryWrapper>
    )
}
export function Story({ image, viwed, profileImage, storyUser, storyID }) {

    return (
        <StoryContainer image={image} to={`story/:id`}>
            <ProfileAvatarContainer>
                <ProfileAvatar
                    src={profileImage}
                    viwed={viwed}
                    size="small"
                    onError={(e)=>{e.target.onError = null; e.target.src="https://i.stack.imgur.com/l60Hf.png"}}
                />
            </ProfileAvatarContainer>
            <StoryOwnerContainer>
                <ProfileName>{storyUser}</ProfileName>
            </StoryOwnerContainer>
        </StoryContainer>
    )
}
export function Create({ image }) {
    return (
        <StoryContainer image={image} createStory={true} to={`story/create`}>
            <CreateContainer>
                <ButtonContainer>
                    <IconButton type="accent" size="s32" icon="plus" src="3" variante="always-white"/>
                </ButtonContainer>
                <span>Create a story</span>
            </CreateContainer>
        </StoryContainer>
    )
}
const StoryWrapper = styled.div`
    position: relative;
    width: 112px;
    height: var(--story-height);
    box-shadow: 0 5px 17px -7px rgba(0, 0, 0, .75);
    border-radius: 10px;
    &:not(:last-of-type){
        margin-right: 10px;
    }
    
    cursor: pointer;
    overflow-y:hidden;
    overflow-x:hidden;
  
`

const Container = styled.div`
    height:100%;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    
`
const ImageContainer = styled.div`
    height: ${({createStory}) => !createStory  ?  `100%` : `calc(var(--story-height) - var(--story-create))`};
    overflow:hidden;
`
const ImageOverlay = styled.img`
    height:100%;
    width:100%;
    object-fit: cover;
    transition: all ease-in-out 500ms;
    white-space:no-wrap;
    
`
const Shadow = styled.div`
    background-image: linear-gradient(0deg, var(--always-dark),transparent);
    top:0;
    bottom:0;
    right:0;
    left:0; 
    position:absolute;
    height:100%;
    width:100%;
    opacity:.8;
    transition: all ease-in-out 500ms;
    &:hover  > ${ImageContainer}{
        background-color: var(--hover-overlay);
        opacity: .8 ;
           & > ${ImageOverlay}{
                transform: scale(1.02);
           }
            
        
    }
    border-radius:10px;
    overflow:hidden;
`


const ProfileAvatarContainer= styled.div`
    position:absolute !important;
    top:0;
    left:0;
    padding:12px;
`

const ProfileAvatar = styled(Avatar)`
    border:4px solid ${({viwed}) => viwed? "#33363A" : " #2e81f4"};
    
`
const StoryOwnerContainer = styled.div`
    position:absolute;
    padding:12px;
    bottom:0;
    width:100%;
    text-align:left;
` 
const ProfileName = styled.span`
    word-wrap:wrap;
    break-word:break-word;
    font-weight:600;
    color: white;
    font-size: .9375rem;
`
export const LinkStory = styled(Link)`
    display: flex;
    flex-direction: column-reverse;
    height:100%;
    width:100%;
    
`
const CreateContainer = styled.div`
    position:relative;
    height: var(--story-create);
    background-color:var(--card-background);
    display: flex;
    padding-right: 16px;  
    padding-left:16px; 
    padding-bottom: 12px;
    padding-top: 28px;
    display:flex;
    justify-content:center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius:10px;
    & span{
        font-family: var(--apple-system);
        font-size: .9375rem;
        font-weight:600;
        color: var(--primary-text);
        word-break:break-word;
        text-align:center;
    }
        
`
const ButtonContainer = styled.span`
    position:absolute;
    width:40px;
    height:40px;
    display: flex;
    justify-content: center;    
    background: var(--card-background);
    border-radius: 55px;
    display: flex;
    align-items: center;
    top:-19px;
`

