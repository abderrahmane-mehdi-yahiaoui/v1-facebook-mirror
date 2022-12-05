import React, {forwardRef, useImperativeHandle, useState} from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import {TopModal} from './Modal'
import { Bottom } from '../Styles/Styles'
import { Button } from '../Buttons'
const Dialog = forwardRef((props, ref)=>{
    const [display, setDisplay] = useState(false);
    
    useImperativeHandle(ref, ()=>{
        return{
            openDialog: ()=> open(),
            closeDialog: ()=> close(),
        }
    });
    const open=()=>{
        setDisplay(true)
    }
    const close=()=>{
        setDisplay(false)
    }
    if(display){
        return ReactDom.createPortal(
            <Overlay>
                <Center>
                    <Dialogbox height={props.height} width="600">
                        <TopModal heading={props.heading} justifyContent="flex-start" closeModal={props.onDiscard}/>
                        <MessageArea>
                            <Message>
                                {props.message}
                            </Message>
                        </MessageArea>
                        <BottomX>
                            <Button submit={props.onDiscard} padding="12" type="secondary-hover" textColor="accent">cancel</Button>   
                            <Button submit={props.onConfirm} padding="12" type="primary">{props.confirm}</Button>
                        </BottomX>
                    </Dialogbox>
                </Center>
            </Overlay>,
            document.getElementById('modal-portal')
        )
    }return null
})
export default Dialog;

const Overlay = styled.div`
    position: fixed;
    top:0;
    bottom: 0;
    right:0;
    left:0;
    background-color: var(--overlay-alpha-80);
    z-index: 52;
    width: 100%;
    height: 100%;
    overflow: hidden;
    max-height:100%;
`
const Center = styled.div`
    max-height:100vh;
    min-height:100%;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
`
const Dialogbox = styled.div`
    position: relative;
    background-color: var(--card-background);
    min-height:auto;
    min-width:200px;
    height:${(props) => props.height};
    width:${(props) => props.width}px;
    z-index:5;
    border-radius: 5px;
    max-width: calc(100vw - 5%);
`
const MessageArea= styled.div`
    padding: 12px 16px;
    width:100%;
    overflow:hidden;
    word-break-:break-word;
`
const Message = styled.span`
    color: var(--primary-text);
    font-size: .9375rem;
    font-weight:normal;
    font-family: inherit;
`
const BottomX = styled(Bottom)`
    padding-bottom: 8px;
    padding-right:8px;
`