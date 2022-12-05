import React, {useState} from 'react'
import styled from 'styled-components'
import * as Style from '../Styles'
import { HoverLink } from '../.././Styles/Styles'
import Icon from '../../Icons'
import db from '../../../config/Firebase'
import Typography from '../../Typography'
import { useAuth } from '../../Context'
export default function Interaction(props) {
    const {currentUser}= useAuth()
    return (
        <StyledContainer>
            <Reactions
                reaction={'Love'}
                reactions={'Love'}
                reactionType={'Love'}
                reactionUserId={props.reactionUserId}
                reactionUser={currentUser.displayName}
            />
            <Interactions postId={props.postId} reactionUser={props.reactionUser} />
        </StyledContainer>
    )
}


const Reactions = props => {

    if (props.reactions) {
        return (
            <ReactionsBanner>
                <Style.PaddingSides className="__bottom-top">
                    <ReactionsContainer>
                        <ReactionType reactionType={props.reactionType} reaction={props.reaction} reactionUser={props.reactionUser} />
                        <p className="secondary-text" >
                            {props.reaction > 2 ?
                                `${props.reactionUser} and ${props.reaction}` :
                                `${props.reactionUser}`
                            }
                        </p>
                    </ReactionsContainer>
                </Style.PaddingSides>
            </ReactionsBanner>

        )
    } return null
}
const ReactionType = props => {
    function GetReaction() {
        
        switch (props.reactionType) {
            default:
                return <Icon name="like" size="18"  src="5" />;
            case 'Like':
                return (
                    <Icon name="like" variante="accent" size="18" src="5" />
                )
            case 'Love':
                return (

                    <Emoji aria-label={`Love`}>
                        <Icon name="love-reaction" size="18" cover />
                    </Emoji>

                )
            case 'Care':
                return (

                    <Emoji aria-label={`Care`}>
                        <Icon name="care-reaction" size="18" cover />
                    </Emoji>

                )
            case 'Haha':
                return (

                    <Emoji aria-label={`Haha`}>
                        <Icon name="haha-reaction" size="18" cover />
                    </Emoji>

                )
            case 'Wow':
                return (

                    <Emoji aria-label={`Wow`}>
                        <Icon name="wow-reaction" size="18" cover />
                    </Emoji>

                )
            case 'Grr':
                return (

                    <Emoji aria-label={`Grr`}>
                        <Icon name="angry-reaction" size="18" cover />
                    </Emoji>

                )
            case 'Sad':
                return (

                    <Emoji aria-label={`Sad`}>
                        <Icon name="sad-reaction" size="18" cover />
                    </Emoji>

                )
        }
    }
   
    return (
       
        <>
            <div>
                <GetReaction reactionType={props.ReactionType} />
            </div>
        </>
    )

}

export const EmojiBanner = (props) =>{
    const LikeRef= React.useRef()
    const LoveRef= React.useRef()
    const LaughRef= React.useRef()
    const AngryRef = React.useRef()
    const SadRef = React.useRef()
    const CareRef = React.useRef()
    const SurpriseRef= React.useRef()
    const postRef = db.collection('posts').where('postId', '==', props.postId)
    async function handleLike(){
        props.setCurrentReact({
            name: LikeRef.current.name,
        })
        
        
    }
    
    const handleLove=()=>{
        props.setCurrentReact({
            name: LoveRef.current.name,
            
        })
        
    }
    const handleSad=()=>{
       
        props.setCurrentReact({
            name: SadRef.current.name,
            
        })
       
    }
    const handleCare=()=>{
        props.setCurrentReact({
            name: CareRef.current.name,
            
        })
    }
    const handleAngry=()=>{
        props.setCurrentReact({
            name: AngryRef.current.name,
            
        })
    }
    const handleSurprise=()=>{
        props.setCurrentReact({
            name: SurpriseRef.current.name,
            
        })
    }
    const handleLaugh=()=>{
        props.setCurrentReact({
            name: LaughRef.current.name,
            
        })
    }
    return(
        <BannerContainer>
            <div className="banner">
                <Emoji aria-label={`Like`} name="Like" ref={LikeRef} onClick={handleLike} >
                    <Icon name="like-reaction"  size="39" cover />
                </Emoji>
                <Emoji aria-label={`Love`} onClick={handleLove} name="Love"  ref={LoveRef}>
                    <Icon name="love-reaction" size="39" cover />
                </Emoji>
                <Emoji aria-label={`Care`} name="Care" onClick={handleCare} ref={CareRef}>
                    <Icon name="care-reaction" size="39" cover />
                </Emoji>
                <Emoji aria-label={`Haha`} name="Haha" onClick={handleLaugh} ref={LaughRef}>
                        <Icon name="haha-reaction" size="39" cover />
                    </Emoji>
                    <Emoji aria-label={`Wow`} name="Wow" onClick={handleSurprise}ref={SurpriseRef}>
                        <Icon name="wow-reaction" size="39" cover />
                    </Emoji>
                    <Emoji aria-label={`Sad`} name="Sad" onClick={handleSad} ref={SadRef}>
                        <Icon name="sad-reaction" size="39" cover />
                    </Emoji>
                    <Emoji aria-label={`Grr`} name="Grr" onClick={handleAngry} ref={AngryRef}>
                        <Icon name="angry-reaction" size="39" cover />
                    </Emoji>
                </div>
            </BannerContainer> 
        )
}


const Interactions = props => {

    const [currentReact, setCurrentReact]=useState({
        name: '',

    })
    
    
    return (
        <>
            <StyledContainer>
                <Style.PaddingSides>
                    <Divider />
                    <ButtonGroup>
                        <ButtonContainer>
                            <Button  id="reaction-button" >
                               <ReactionType  reactionType={currentReact.name} currentReact={currentReact.name}/>
                               <Typography
                                    as="span"
                                    text={!currentReact.name? 'like': currentReact.name} 
                                    font="small"
                                    weight="600"
                                    capitalize
                                    Color="secondary"                                    
                                />
                                
                                <HoverLink />
                                <EmojiBanner reactionUser={props.reactionUser} setCurrentReact={setCurrentReact} postId={props.postId}/>
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button>
                                <Icon name={`comment`} src={`5`} size={`18`} variante="secondary" />
                                <span className="secondary-text">comment</span>
                                <HoverLink />
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button>
                                <Icon name={`share`} src={`5`} size={`18`} variante="secondary" />
                                <span className="secondary-text">share</span>
                                <HoverLink />
                            </Button>
                        </ButtonContainer>
                    </ButtonGroup>
                    <Divider />
                </Style.PaddingSides>
            </StyledContainer>
        </>
    )
}
const ReactionsBanner = styled.div`
    width:100%;
    height:40px;
    position:relative;
    display:flex;
    &:before{
        content:"";
        position:absolute;
        left:0;
        width:3px;
        height:100%;
        background-color:var(--accent);
        border-radius:55px;
    }
    & > div.{

    }

`
const StyledContainer = styled(Style.Container)`
    overflow:unset;
`
const ReactionsContainer = styled.div`
    display:flex;
    align-items:center;
`
const Emoji = styled.button`
    display:flex;
    align-items:center;
    height:100%;
    object-fit:contain;
    cursor:pointer;
    outline:none;
    border-style:none !important;
    border-radius:55px;
    background: var(--input-bg);
    margin-right:2px;
    & > img{
        height:18px;
        width:18px;
    }
`
const ButtonGroup = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    height:40px;
`

const BannerContainer = styled.div` 
    z-index:3;
    left:-1px;
    width:fit-content;
    position:absolute;
    top:50px;
    display:none;
    background:var(--card-background);
    border-radius:55px;
    transition: all linear 200ms;
    box-shadow: 0 0 0 1px var(--media-inner-border),0 2px 2px var(--shadow-1);
    & .banner{
        display:flex;
        align-items:center;
        height:100%;
        padding: 5px 0;
        & ${Emoji}{
            margin:0 4px;
            transition:transform ease-in-out 200ms;
            &:hover{
                transform: scale(1.23) rotate(5deg);
            }
        }
    }
    
`
const ButtonContainer = styled.div`
    height:100%;
    width:100%;
    position:relative;
   

`
const Button = styled.button`
    outline:none;
    background: transparent;
    border-style:none;
    border-radius:5px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
    cursor:pointer;
    
    & >*:not(${HoverLink}){
        z-index:1;
    }
    & > span{
        margin-left:5px;
        font-size: .9375rem;
        font-weight: 600;
        text-transform:capitalize;
        
    }

    &:hover ${HoverLink}{
        opacity:1;
     
    }
    &#reaction-button:hover ${BannerContainer}{
        display:block;
        transform: translateY(-93%);
        top:0;

    }
    
`
const Divider = styled.hr`
    width:100%;
    height:1px;
    background-color:var(--divider);
    margin:2px 0px;
`






