import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../Avatar'
import {HoverOverlay} from '../../Styles/Styles'
import styled from 'styled-components'
import { useAuth } from '../../Context/AuthContext'

export default function PostCreation({message, writeTo, openModal, buttons, path, loading}){
    const { currentUser } = useAuth()
    return(
        <Wrapper className="sm-screen">
           <Top>
               <PhotoContainer>
                    <Link to={path}>
                        <Avatar user={currentUser} loading={loading} src={currentUser.photoURL}/> 
                        <HoverOverlay />
                    </Link>
               </PhotoContainer>
                <Container>
                    <InputButton onClick={openModal}>
                        <div>
                        {!loading ?
                            <>
                            <span>
                            {message} 
                            </span>        
                            <span className="__text ">
                                {writeTo}
                            </span>
                            </>
                            : <div className="loading"></div>
                        }
                        </div>
                        <HoverOverlay />
                    </InputButton> 
                </Container>
           </Top>
           <Bottom children={buttons} />
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: var(--card-background);
    max-width: 500px;
    width:100%;
    min-height: fit-content;
    padding: 12px 16px 10px 16px;
    border-radius: 10px;
    margin-bottom: 16px;
    box-shadow: 0 1px 2px var(--shadow-2);
    @media only screen and (max-width: 1000px){
        max-width:unset;
    }
    @media only screen and (max-width: 700px){
        border-radius:0px;
        padding: 12px 10px 10px 10px;
    }
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;
    flex-grow: 1;
    
`
const PhotoContainer = styled.div`
    height:37px;
    width:40px;
    overflow:hidden;
    border-radius:555px;
    position:relative;
    & > a{
        width: 100%;
        height: 100%;
        border-radius:inherit;
        &:hover ${HoverOverlay}{
            opacity:1;
        }
    }
`
const Bottom = styled.div`
    margin-top: 5px;
    border-top:  .001em solid var(--input-bg);
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding-top: 5px;
`
const Container = styled.div`
    min-height: 40px;
    display: flex;
    justify-content: flex-start;
    width: 100%;
`
const InputButton = styled.span`
    background-color: var(--input-bg);
    border-radius: 20px;
    margin-left:8px;
    padding: 8px 12px;
    border-style: none;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    & >.loading{
        border-radius:20px;
    }
    color: var(--secondary-text);
    font-size: 1.0625rem;
    cursor: pointer;
    outline: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
    line-height: 1.0667;
    position:relative;
    &:hover ${HoverOverlay}{
        opacity:1;
    }
    }
    &>.__text{
        overflow: hidden;
        text-overflow: ellipsis;
        max-width:calc(100% - 203px);
        text-indent:5px;
    }
`

