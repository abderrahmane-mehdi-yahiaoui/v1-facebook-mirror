import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useHistory, Route} from 'react-router-dom'
import {  Avatar} from '../Avatar'
import { ReactComponent as MessengerIcon } from '../../ressources/Icons/messenger.svg'
import { ReactComponent as BellIcon } from '../../ressources/Icons/bell.svg'
import { ReactComponent as CaretIcon } from '../../ressources/Icons/caret.svg'
import Typography from '../Typography'
import { IconButton } from '../Buttons'
import { HoverButton, ButtonContainer, Flex, Hover } from '../Styles/Styles'
import db from '../../config/Firebase'
import Icon from '../Icons'
import { useAuth } from '../Context/AuthContext'
import styled from 'styled-components'
import DropDown from './DropDown'
export default function RightLinks(props) {
    const { currentUser, logout } = useAuth()
    const [user, setUser]=useState()
    const [error, setError] = useState('')
    const [loading, setLoading]=useState(true)
    const history = useHistory()    
    function handleLogout(e) {
        e.preventDefault()
        logout()
    } 
    useEffect(() => {
        const fetchUser =  () => {
            try{
                 db.collection('users').doc(currentUser.uid).onSnapshot((doc) => {
                setUser(doc.data())
                })
                setLoading(false)
                setError(false)
            }catch{
                setError(true)
                console.error('error', error)
            }
        }
        return  ()=> fetchUser();
    })
    
    const html = document.documentElement
    const lightTheme = "light"
    const darkTheme = "dark"
    let theme
    if (localStorage ) {
        theme = localStorage.getItem("theme")
      }
    
    if(currentUser){
      if (theme === lightTheme || theme === darkTheme) {
        html.classList.add(theme)
        html.setAttribute('theme', theme)
      } else {
        html.classList.add(lightTheme)
        html.setAttribute('theme', lightTheme)
      }
    }
      const switchTheme = e => {
        if (theme === darkTheme) {
          html.classList.replace(darkTheme, lightTheme)
          html.setAttribute('theme', lightTheme )
          localStorage.setItem("theme", "light")
          theme = lightTheme
        } else {
          html.classList.replace(lightTheme, darkTheme)
          html.setAttribute('theme', darkTheme )
          localStorage.setItem("theme", "dark")
          theme = darkTheme
        }
      }
    return (
        <ItemsContainer>
            <LinkItems id="avatar" avatar item={
                <Route  path={`/profile/${currentUser.uid}`} children={({match})=>(
                    <NavLink to={`/profile/${currentUser.uid}`} className="profile__link" activeClassName="active-link">
                        <IconButton className="avatarButton" size="avatar" type={match ? `focus-accent`: `secondary`} hoverable={!match && true}   custom="custom">
                        <Avatar user={user} src={user?.photoURL} size="28" loading={loading}/>
                        {!props.loading ? <TextWrap>
                            <Typography as="span" text={user?.displayName} Color={match ? `accent`:`primary`} font="small" capitalize /> 
                        </TextWrap>:  <div className="loading-text"><div style={{marginLeft:'5px', width:'50px !important'}} className="loading"></div></div>}
                        
                       
                        </IconButton>
                    </NavLink>
                )}/>
                    
                }
            />
            <LinkItems   
                item={<Icon name="plus_ultra" variante="primary" src="2" size="20"/>} 
                dropdown={
                    <>
                    <DropDownItem heading="Create" />
                    <DropDownItem icon="edit" variante="primary" src="3" label="Post" subheading="Share a post on News Feed." />
                    <DropDownItem icon="book" variante="primary" src="6" label="Story" subheading="Share a photo or write something."/>
                    <DropDownItem divider icon="event-star" variante="primary" src="6" label="Life Event" subheading="Add a life event to your profile."/>
                    <DropDownItem icon="flag" variante="primary" src="7" label="Page" subheading="Connect and share customers and fans."/>
                    <DropDownItem icon="horn" variante="primary" src="7" label="Ad" subheading="Avertise your business, brand or organization."/>
                    <DropDownItem icon="groups-ic" variante="primary" src="7" label="Group" subheading="Connect with people who share your interests."/>
                    <DropDownItem icon="plus-event" variante="primary" src="7" label="Event" subheading="Bring people together with a public or private event."/>
                    <DropDownItem icon="basket" variante="primary" src="6" label="Marketplace Listing" subheading="Connect with people who share your interests."/> 
                    </>
                }
            />
                    
            
            <LinkItems  
                item={<MessengerIcon />}
                
            />
            <LinkItems item={<BellIcon />}/>
            <LinkItems item={<CaretIcon/>} 
                dropdown={<>
                    <DropDownItem  divider for="avatar" label={currentUser.displayName} subheading="See your profile" onClick={e=> {e.preventDefault(); history.push(`/profile/${currentUser.uid}`)}}>
                        <Avatar user={currentUser} src={currentUser.photoURL} size="62"/>
                    </DropDownItem>
                    <DropDownItem divider variante="primary" icon="exclamation-feedback" src="8" label="Give Feedback" subheading="Help us improve the new Facebook" rightIcon />
                    <DropDownItem icon="cog" variante="primary" src="9" label="Settings" rightIcon />
                    <DropDownItem icon="interogation-help" variante="primary" src="8" label="Help & Support" rightIcon />
                    <DropDownItem icon="half-moon" variante="primary" src="8" label="Display & Accessibility" rightIcon onClick={switchTheme} />
                    <DropDownItem icon="open-door" src="8" label="Logout" onClick={ handleLogout} variante="primary" />
                </>}
            />
        </ItemsContainer>
    )
}

const LinkItems = props =>{
    const [open, setOpen]= useState(false)
    const toggleRef = useRef()
    const handleToggle=()=>{
        setOpen((prev)=> !prev)
    }
    return(
        <>
        <List onClick={handleToggle} {...props} ref={toggleRef}>
        {!props.avatar?
            <Button role="button" tabIndex="0" className={open && 'button-active'}>
                {props.item}
                <HoverButton />
            </Button>
            : props.item
        }
        </List>
        <DropDown open={open} setOpen={setOpen} >
            {props.dropdown}
        </DropDown>
        </>
    )
}
function DropDownItem(props) {
    return (
        <>
            {props.heading && 
                <div className="heading__container">
                    <Typography  as="h1" text={props.heading} Color="primary" />

                </div>}
            {!props.heading && 
                <>
                
                <span  for={props.for}  onClick={props.onClick} role="button" className="dropdown__item">
                    <IconButton  variante={props.variante} icon={props.icon} type="secondary" size={!props.children? `s`: 'large'} src={props.src} iconSize={!props.children?`20`: `62`}>
                        {props.children}
                    </IconButton>
                    
                    <div className="dropdown__item-text-container">
                        <Flex direction="column">
                        <Typography as="span" text={props.label} Color="primary" font="small" weight="500"/>
                        
                        {props.subheading && <Typography text="span" Color="secondary" font="sub" text={props.subheading} className="dropdown__itemSubheading" />}
                        </Flex>
                    </div>    
                    {props.rightIcon && 
                    <span className="chevron-right__container">
                        <Icon name="chevron-right" src="2" iconSize="24" variante="secondary" /></span>}
                </span>
                    {props.divider && <hr className="divider" /> }
                </>
            }
        </>
    )
}


const ItemsContainer = styled.ul`
    display:flex;
 
    padding-right:16px;
    align-items:center;
    position:fixed;
    right:0;
    top:0;
    height:var(--header-size);
    z-index:60;
    & > .active-link{
        background:var(--accent);
    }
`
const List = styled.li`
  
    text-align:center;
    margin-right:5px;
    @media only screen and (max-width:1105px){
        &#avatar{
            display:none;
        }
    }
    
`

const Button = styled.div`
    height:40px;
    width:40px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:var(--secondary-button-background);
    overflow:hidden;
    border-radius:55px;
    cursor:pointer;
    position:relative;
    outline:none;
    border-style:none;
    z-index:5;
    &:hover ${HoverButton}{
        opacity:1;
    }
    &:focus, &:active, &.button-active{
        background: var(--primary-focused-button-background) ;
    }
    &:focus svg, &.button-active svg, &:focus i, &.button-active i{
        -webkit-filter: var(--filter-accent);
    }
    & svg{
        height:20px;
        width:20px;
        -webkit-filter:var(--filter-primary-icon);
    }
`
const TextWrap = styled.div`
 
    margin-left: .2em;

    &  * {
        text-overflow: ellipsis;
        max-width: 100px;
        overflow: hidden;
        margin-left: .2em;
        white-space:nowrap;
        display:block;
    }
`