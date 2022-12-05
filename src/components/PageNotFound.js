import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Typography from './Typography'
import { Button } from './Buttons'
export default function PageNotFound(props) {
    const history = useHistory()
    const handleReplace=()=>{
        history.replace('/')
    }
    return (
        <Container {...props}>
            <CenterElement>
                <NotFound>
                    <img className="img--broken-link" src="https://www.facebook.com/images/comet/empty_states_icons/404/404_failed_loading_gray_wash.svg" alt=""/>
                    <TextWrapper>
                        <Typography Color="secondary" as="span" font="medium2" text="This page isn't available"/>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography Color="secondary" as="span" font="medium" text="The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct."/>
                    </TextWrapper>
                    <Button submit={handleReplace}  type="primary" buttonText="primary" padding="40">Go to News Feed</Button>
                </NotFound>
            </CenterElement>
        </Container>
    )
}
const Container = styled.div`
    width:100%;
    height: calc(100vh - var(--header-size));
    overflow:hidden;
    background:var(--body-bg);
    display:flex;
    justify-content:center;
`
const CenterElement = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100%;
    width:500px;
`
const NotFound = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    & .img--broken-link{
        height:118px;
        width:118px;
    }
    & >*{
        margin-bottom:20px;
    }
`
const TextWrapper = styled.div`
     & >*{
         display:block;
         text-align:center;

     }
`