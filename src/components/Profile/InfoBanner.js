import React, {useState} from 'react';
import styled from 'styled-components'
import * as Style from '../Styles/Styles'
import { Verified } from '../Verified';
import Typography from '../Typography';
import UpdateBio from './UpdateBio'
export function InfoBanner({ user, owner}) {
    const [show, setShow]= useState(false)
    const handleShow = e =>{
        e.preventDefault()
        setShow((prev)=> !prev)
    }
    return (
        <> 
            <Banner>
            <Style.SpaceIgnore ignore="16" />
                <Container>
                    <Style.Flex dir="auto" id="user-cred" style={{textAlign:'center'}} align="center">
                        {user? <><Typography 
                            dir="auto"
                            Color="primary"  as="h1"
                            capitalize
                            text={user?.displayName}
                            addition={
                                <Verified verified={user?.verified}/>
                            }
                        />
                         
                       </>: 
                        <div className="loading-text"><div className="loading"></div></div>}
                    </Style.Flex>
                   
                    {user?.bio !== null && 
                        <>
                            <Style.SpaceIgnore ignore="12" />
                            {!show? 
                                <Style.Flex dir="auto" direction="column" align="center">
                                    <Typography 
                                        Color="primary"
                                        dir="auto" as="span"
                                        text={user?.bio}
                                        font="small2"
                                    />
                                    {user ?
                                    <>
                                        {owner && 
                                        <EditBio onClick={handleShow}>
                                            {user?.bio !== '' | null ? `Edit`: `Add bio`}
                                        </EditBio>
                                        }
                                    </>
                                    : <div className="loading-text lt--50"><div className="loading"></div></div>
                                    }
                                </Style.Flex>
                                :
                                <UpdateBio bioValue={user?.bio} handleShow={handleShow}/>
                            }
                            
                           
                        </>
                    }
                </Container>
            </Banner>
        </>
    )
}


const Banner = styled.div`   
    max-width:924px;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding-top:18px;
    padding-bottom:25px;
`
const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:6px;
    max-width:100%;
`



const EditBio = styled.span`
    color: var(--accent);
    font-size: .9375rem;
    font-weight:600;
    cursor:pointer;
    &:hover{
        text-decoration: underline;
    }
`

