import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../Context'
import { InfoBanner } from './InfoBanner'
import { ProfilePhoto, ProfileNav } from './index'
import * as Style from '../Styles/Styles'

export default function ProfileHeader({ uid, match, user, owner, isLoading, loading }, props) {
    const { currentUser } = useAuth()
    const [collapse, setCollapse] = useState(false)
    const [error, setError]= useState(false)
    const [photoURL, setPhotoURL] = useState(user?.photoURL)
    const profileModalRef = useRef()
    const openModal = () => {
        if (owner) {
            try{
                profileModalRef.current.openModal()
                document.body.classList.add('no-scroll')
                setPhotoURL(null)
            }catch{
                if(error){
                    console.error(error)
                }
            }
            
        }
    };
    const closeModal = () => {
        profileModalRef.current.closeModal()
        setPhotoURL(currentUser.photoURL)
        document.body.classList.remove('no-scroll')
    }

    return currentUser && (
        <>
            <Heading>
                <TopSection>
                    <CoverContainer>
                        <InnerContainer className={loading && " loading "}>
                        {!loading  && user ? 
                        <>
                        {user?.cover !== null ?
                            <img    
                                src={user?.cover} 
                                alt="" 
                            />: ''
                        }
                        <HoverOverlay /> </> : <div className="loading"></div>
                        }
                        </InnerContainer>
                    </CoverContainer>
                </TopSection>
                <BottomContainer>
                    <ProfilePhoto user={user} owner={owner} openModal={openModal} closeModal={closeModal} profileModalRef={profileModalRef} loading={loading} />
                   <InfoBanner user={user} owner={owner} />
                </BottomContainer>
                <BottomContainer id="nav-fixing" className={collapse && `scroll`}>
                    <ProfileNav user={user} match={match} setCollapse={setCollapse} owner={owner} />
                </BottomContainer>
            </Heading>
          
        </>
    )
}


const Heading = styled.header`
    display:flex;
    flex-direction: column;
    width:100%;
    background:var(--header-bg);
    flex-wrap:no-wrap;
    align-items: stretch;
    max-height:510px;
    height:fit-content;
    justify-content:center;
`
const TopSection = styled.section`
    width:100%;
    display:flex;
    justify-content:content;
    flex-direction:column;

`
const CoverContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    height:350px;
    overflow:hidden;
    
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
const ContainOverlay = styled.div`
    position:relative;
    border-radius:555px;
    overflow:hidden;
    height:100%;
    width:100%;
`
const InnerContainer = styled.div`
   
    position:relative;
    overflow:hidden;
    max-width: 930px;
    width:100%;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: max(0px, min(8px, 9999 * (-100% - 4px + 100vw))) 8px;
    border-bottom-left-radius: max(0px, min(8px, 9999 * (-100% - 4px + 100vw))) 8px;
    transition: all ease-in-out 100ms;
    background-color: var(--body-bg);
    z-index: 0;
    & > img {
        position:absolute;
        width:100%;
        height:100%;
        top:0;
        bottom:0;
        object-fit: cover;
        
    }
    &:hover > ${ContainOverlay}{
        opacity:1;
    }
    

`

const BottomContainer = styled.div`
    background-color: var(--header-bg);
    display:flex;
    flex-direction:row;
    position:relative;
    width:100%;
    justify-content:center;
    min-height:63px;
    &#nav-fixing{
        z-index:3;
    }
    &#nav-fixing.scroll{
        position:fixed;
        top:calc(var(--header-size) - 1px);
        border-bottom: 1px solid var(--input-bg);
        
    }
`




