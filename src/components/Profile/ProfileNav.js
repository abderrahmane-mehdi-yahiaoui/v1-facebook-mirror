import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components';
import { Avatar } from '../Avatar'
import { NavigationList, NavigationLink, HoverLink } from'../Styles/Styles';
import Icon from '../Icons'
import { Verified } from '../Verified';
import { IconButton } from '../Buttons';
import Modal, {TopModal} from '../Modal/Modal';
import {Update} from './Update'
import UseMediaQuery from '../Hooks/UseMediaQuery'

export default function ProfileNav({ match, user, setCollapse,collapse, owner,  }) {
    const limitLinks = 4;
    const [navHeight, setNavHeight] = useState()
    const [show, setShow]= useState(false)
    const [hideAfterScroll, setHideAfterScroll]=useState(false)


    const deviceMatch = UseMediaQuery("(max-width:900px)");


  
    useEffect(() => {
        const ScrollListen = () => {
            if(match.path === '/profile/:uid'){
                if (window.scrollY >  448) { 
                    setHideAfterScroll(true)
                    setCollapse(true)
                    if(show){
                        setShow(false)
                    }
                } else {
                    setCollapse(false)
                    setHideAfterScroll(false)
                }
            }
            
        }
        window.addEventListener("scroll", ScrollListen);
        return () => {
            window.removeEventListener("scroll", ScrollListen)
        }

    })
    const handleScrollTop=(e)=>{
        e.preventDefault();
        window.scrollTo(0, 0)
    }
    const ref = useRef()
    useEffect(()=>{
        document.onreadystatechange=()=>{
            setNavHeight(ref.current.clientHeight)
            console.log(ref.current.clientHeight)
        }
    }, [navHeight])
    const currentURL = document.location
    const updateModalRef = useRef()
   
    const openModal = () => {
        if (owner) {
            updateModalRef.current.openModal()
            document.body.classList.add('no-scroll')
        }

        return 
    };
    
    const closeModal = () => {
        updateModalRef.current.closeModal()
        document.body.classList.remove('no-scroll')
    }
    const handleDropdown = ()=>{
        setShow((prev)=> !prev)
    }
    return (
        <>
        <Navigation ref={ref}>
        <div className="divider" />
        <ItemsContainer>
            <ul id="profile-ul">
                { !hideAfterScroll &&
                    <>
                    {ArrayLinks.slice(0, !deviceMatch ? limitLinks : 0).map((link, index) => (
                    <NavigationList key={index} className={`profile-list ${deviceMatch && `profile-list--small-device`}`} >
                        <NavigationLink to={
                            link.title !== 'post' ?
                            `${match.url}/section=${link.path}` :
                            `${match.url}`}
                            className={`profile-nav-link`}
                            activeClassName="--activeLink"
                            exact
                        >
                            <span>{link.title}</span>
                            
                        </NavigationLink>
                        <HoverLink />
                    </NavigationList>
                    ))}
                    </>
                }
                
                
                {!hideAfterScroll && <NavigationList className="profile-list">
                    <NavigationLink  onClick={handleDropdown} as="div" className={`expand-button ${deviceMatch ? `--activeLink`:``} `}>
                        <span>more</span><span><Icon name={`caret__down`} src={`2`} size="12" variante={deviceMatch? `accent`: `secondary`} /></span>
                    </NavigationLink>
                    <HoverLink />
                    <Dropdown show={show} >
                        {ArrayLinks.slice(!deviceMatch? limitLinks: 0, ArrayLinks.length).map((link, index)=>(
                            <NavigationList key={index +1}>
                                <NavigationLink exact to={
                                    link.title !== 'post' ?
                                    `${match.url}/section=${link.path}` :
                                    `${match.url}`
                                } 
                                activeClassName="--active-sub-link" className="sub-link">
                                    {link.title}
                                </NavigationLink>
                                <HoverLink />
                            </NavigationList>
                            
                        ))}
                    </Dropdown>
                </NavigationList>}
               
              <NavigationList className={`nav-avatar ${hideAfterScroll && `nav-avatar--show`}`}>
                    <NavigationLink exact to={currentURL} onClick={handleScrollTop}>
                        <span>
                            <Avatar user={user} src={user?.photoURL} />
                        </span>
                        <span className="txt-overflow--177" style={{marginLeft:'2px'}}>
                            {user?.displayName}
                        </span>
                        <Verified verified={user?.verified} />
                    </NavigationLink>
                    <HoverLink className="margin"/>
                </NavigationList>
            </ul>
            <div className="right">
                <ButtonContainer className="edit-profile">
                    <IconButton label={!owner ?"Messenger" : "Edit Profile"} onClick={owner ? openModal : undefined} shape="rectangle" icon={!owner ? "messenger" : "edit-pen"} cover iconSize="16" variante="primary" type="secondary" size="avatar" textColor="primary"  fontSize=".9457rem" fontWeight="600"/>
                    <HoverLink />
                </ButtonContainer>
                <ButtonContainer>
                    <IconButton  shape="rectangle" icon={!owner ? "friend-checked" : "eye-view"} src={owner && "2"} size="rec-small" cover iconSize={!owner ?"16":"20"} variante="primary" type="secondary"    />
                    <HoverLink />
                </ButtonContainer>
                <ButtonContainer>
                    <IconButton type="secondary" shape="rectangle" size="rec-small" icon="search" variante="primary" iconSize="16" src="2"/>
                    <HoverLink />
                </ButtonContainer>
                <ButtonContainer>
                    <IconButton type="secondary" shape="rectangle" size="rec-small" icon="kebbab__menu" variante="primary" iconSize="20" src="3"/>      
                    <HoverLink />      
                </ButtonContainer>
                
            </div>
        </ItemsContainer>
    </Navigation>
    
    <Modal ref={updateModalRef} width="700">
        <TopModal heading="update profile" closeModal={closeModal} />
        <Update user={user}  owner={owner} />
    </Modal>
    
    </>
    )
}

const Dropdown = props=>{
   
    return props.show&& (
        
        <Card>
            <CardInner>{props.children}</CardInner>
        </Card>
    )
}



const ArrayLinks = [
    {
        title: 'post',
        path: '.',
    },
    {
        title: 'about',
        path: 'about',
    },
    {
        title: 'friends',
        path: 'friends',

    },
    {
        title: 'photos',
        path: 'photos',
    },
    {
        title: 'story archive',
        path: 'story-archive'

    }
]

const Navigation = styled.nav`
    max-width: 930px;
    width:100%;
    height:61px;
    position:relative;

`
const ButtonContainer = styled.span`
    width:fit-content;
    position:relative;
    overflow:hidden;
    z-index:3;
    border-radius:8px;
    
    
    & > button{
        padding: 0 12px !important;
        border-radius:inherit;
        
    }
    & > ${HoverLink}{
        top:0;
        bottom:0;
    }
    &:hover > ${HoverLink}{
        opacity:1;
        z-index:-1;
    }
`
const ItemsContainer = styled.div`
    display:flex;
    height:100%;
    flex-direction:row;
    justify-content:space-between;
    & > ul{
        display:flex;
        padding-left:20px;
        & ${NavigationLink}.expand-button{
           cursor:pointer;
           &.expand-button--small-device{
               background:accent;
           }
        }
        @media only screen and (max-width: 500px){
            & >.nav-avatar{
                display:none;
            }
        }
        & >.nav-avatar{
            position:absolute;
            left:-1000px;
            transition: left linear 150ms;
            max-width:fit-content;
            width:100%;
            &.nav-avatar--show{
                left:20px;
            }
            & ${NavigationLink}{
                max-width:unset;
                width:100%;
                position:relative;
                & .expand-button{
                    cursor:pointer;
                }
            }
        }
        
    }
    & >.right{
        display:inherit;
        justify-content:space-evenly;
        align-items:center;
        width:fit-content;
        max-width:300px;
        width:100%;
        &> *{
            margin-right:6px;
        }
        @media only screen and (max-width: 1000px){
            justify-content:flex-end;
        }
        @media only screen and (max-width: 1000px){
            & ${ButtonContainer}:not(.edit-profile){display:none;}
        }
        
        
       
    }
`


const Card = styled.div`
    background:var(--card-background);
    position:absolute;
    width:340px;
    z-index:10;
    overflow-y:hidden;
    overflow: auto;
    max-height: calc(100vh - 365px);
    top: 63px;
    border-radius: 6px;
    

`
const CardInner = styled.div`
    position:relative;
    padding: 1px 3px 0px 3px;
    display:flex;

    width:100%;
    flex-direction:column;
    overflow-y:auto;
    & ${NavigationList}{
        max-width:unset;
        height:50px;
    }
    & ${NavigationLink}.sub-link{
        max-width:unset;
        width:100%;
        cursor:pointer;
        justify-content:flex-start;
        padding-left:10px;
        &.--active-sub-link:before{
            position: absolute;
            content: '';
            height:3px;
            width:100%;
            background-color: var(--input-bg);
            bottom:0;
            left: 0;
            right:0;
            border-radius: 2px;
        }
    }
}

`