import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import './rowSidebar.css';
import db from '../../config/Firebase';
import { SidebarRow, SidebarData, ToggleButton } from './index.js';
import { useAuth } from '../Context/AuthContext'
import { Verified } from '../Verified'
import Typography from '../Typography'
export default function Sidebar(props) {
    const { currentUser } = useAuth()
    const [user, setUser]=useState()
    const defaultLinks = 8
    const [ShowLinks, setShowLinks] = useState(defaultLinks)
    const showMore = (e) =>{
        e.preventDefault()
        setShowLinks(SidebarData.length)
    }
    const showLess = (e)=>{
        e.preventDefault()
        setShowLinks(defaultLinks)
    }
    useEffect(() => {
        const fetchUser = async () => {
            db.collection('users').doc(currentUser.uid).onSnapshot((doc) => {
                setUser(doc.data())
            })
        }
        fetchUser()
    }, [currentUser.uid])
    
    return (
        
        <>  
            <SidebarParent id="sidebar">
                <Container>
                    <Wrapper className={`hidden-scrollbar sidebarWidth--${props.sidebarWidth}`}>
                        <ul>
                            <SidebarRow 
                                avatar={<Avatar className="sidebarIcon" user={user} src={user?.photoURL} />}
                                path={`/profile/${currentUser.uid}`}
                                title={user?.displayName}
                                verified={
                                    <Verified verified={user?.verified}/>
                                }
                            />
                            {SidebarData.slice(0, ShowLinks).map((item, index)=>(
                                <SidebarRow     
                                    key={index}
                                    path={item.path}
                                    title={item.title}
                                    icon={item.icon}
                                />
                            ))}
                            <ToggleButton 
                                lessThan={ShowLinks < SidebarData.length}
                                onClick={ShowLinks < SidebarData.length? showMore : showLess}
                            />
                            <div className="sidebar-divider" />
                        </ul>
                        <div className="copyright">
                            <Typography href="https://www.linkedin.com/in/mehdi-abderrahmane-yahiaoui-3b12981a0" title="Made by Yahiaoui Mehdi" font="sub" as="a" target="_blank"  Color="secondary" text={`Facebook Clone © ${new Date().getFullYear()}`}/>
                        </div>
                    </Wrapper>
                </Container>
            </SidebarParent>
        </>
    )
}

const SidebarParent= styled.aside`
    position:relative;
    grid-area: sidebar;
    overflow-y: auto;
    width: 330px;
    display: flex;
    height:100%;
`
const Container = styled.div`
    height: 100%;
    width: 100%;
    
    overflow-y: auto;
    overflow-x: hidden;
    background-color: inherit;
    &::-webkit-scrollbar{
        width: 8px;
        opacity:.5;
    }
`
const Wrapper = styled.div`
   
    padding-top: 16px;
    position: fixed;
    height: 100%;
    overflow: auto;
    height: calc(100vh - var(--header-size));
    & .copyright{
        display:flex;
        align-items:center;
        justify-content:center;
        width:100%;
        margin-bottom:2px;
    }
    &.sidebarWidth--home{
        width: 291px;
    }
    &.sidebarWidth--bookmarks{
        width: 100%;
    }
`
