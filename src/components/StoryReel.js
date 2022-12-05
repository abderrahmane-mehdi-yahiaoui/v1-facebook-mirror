import React from 'react'
import { Story, Create, LinkStory } from './Story'
import styled from 'styled-components'
import { useAuth } from './Context/AuthContext'
import { IconButton } from './Buttons'
function StoryReel() {
    const { currentUser } = useAuth()
    return (
        <ReelWrapper>
            <ReelContainer>
                <Create
                    image={currentUser.photoURL}
                />
                <Story 
                    image="https://drwyjmricaxm7.cloudfront.net/repository/Seoul-Day-Tours-and-Activities--South-Korea--On-The-Go-Tours-435851504695803_crop_800_600.jpg"
                    profileImage="https://hw-media.herworld.com/public/2020/05/Km.jpg"
                    storyUser="KimGoEun offICIel"        
                    viewed={true}
                />
                <Story 
                    image="https://dsj1e5gc359pm.cloudfront.net/uploads/products/44/main/04471bca-940-Eland-cruise-Janmsil3.jpg?w=800"
                    profileImage="https://i.pinimg.com/originals/db/fd/ce/dbfdcedda40567e83bb00736b1a92e0b.jpg"
                    storyUser="TaeHyung offICIel"        
                    viewed={true}
                />
                <Story 
                    image="https://drwyjmricaxm7.cloudfront.net/repository/Seoul-Day-Tours-and-Activities--South-Korea--On-The-Go-Tours-435851504695803_crop_800_600.jpg"
                    profileImage="https://hw-media.herworld.com/public/2020/05/Km.jpg"
                    storyUser="KimGoEun offICIel"        

                />
                <Story 
                    image="https://data.whicdn.com/images/338243532/original.jpg"
                    profileImage="https://i.pinimg.com/originals/db/fd/ce/dbfdcedda40567e83bb00736b1a92e0b.jpg"
                    storyUser="Mehdi"        

                />
                
            </ReelContainer>
            <ButtonContainer>
                <LinkStoryX to="/stories" aria-label="See all stories" tabIndex="0" />  
                <IconButton size="medium48" type="popover" src="2" icon="arrow-right" iconSize="20" variante="secondary"/>
                
                <Hover />
            </ButtonContainer>
        
        </ReelWrapper>
    )
}
const ReelWrapper = styled.div`
    position:relative;
`
const ReelContainer = styled.div`
    margin-top: 24px;
    padding-bottom: 24px;
    display: flex;
    flex-direction: row;
    position:relative;
    
`
const Hover = styled.div`
    position:absolute;
    border-radius:inherit;
    bottom: 0;
    left: 0px;
    right: 0px;
    top: 0px;
    opacity:0;
    background-color: var(--input-bg)
    transition: all ease-in-out 200ms;
`

const ButtonContainer = styled.div`
    position:absolute;
    left: calc(100% - 24px);
    top: calc(50% - 24px - 8px);
    border-radius:555px;
    &  button:hover ~ ${Hover}{
        opacity:1;
        z-index:2;
        
    }
    
    
`
const LinkStoryX = styled(LinkStory)`
    position:absolute;
    top:0;
    z-index:1;
    outline:none;
`


export default StoryReel
