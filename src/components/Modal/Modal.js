import React, {forwardRef, useImperativeHandle, useState} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { IconButton } from '../Buttons'
import { HoverButton } from '../Styles/Styles'
const Modal = forwardRef((props,ref) => {
    const [display, setDisplay] = useState(false);
  
    useImperativeHandle(ref, () => {
      return {
        openModal: () => open(),
        closeModal: () => close()
      }
    });
  
    const open = () => {
      setDisplay(true)
      
    };
  
    const close = () => {
      setDisplay(false);
      
    };  
    
    if(display){
        return ReactDOM.createPortal(
            <>
                <Overlay className={props.neutral ? `neutral-bg`: `overlay-bg`}>
                   <Child id="overlay" className={props.neutral? `child--login` : `child--main`}>
                       <GrandChild>
                            <ModalBox className={props.neutral? 'modal-bg--n modal-shadow': 'modal-bg'} width={props.width} height={props.height} backgroundColor={props.backgroundColor}>
                                { props.children }
                            </ModalBox> 
                       </GrandChild>
                    </Child>
                </Overlay>    
            </>,
            document.getElementById('modal-portal')
        )
    } return null
})



export default Modal;
export function TopModal(props){
    return(
        <TopContainer justifyContent={props.justifyContent}>
            <Heading >
                <h2 dir="auto">{props.heading}</h2>
            </Heading>
            <ButtonContainer aria-describedby={`close ${props.areaDescrpibedby && props.areaDescrpibedby}`}>
                <Inner onClick={props.closeModal}>
                    <IconButton  variante="secondary" size="s" type="secondary" icon="times" iconSize="20" src="2" />
                    <HoverButton />
                </Inner>
            </ButtonContainer>
        </TopContainer>
    )
}


const Overlay = styled.div`
    position: fixed;
    top:0;
    bottom: 0;
    right:0;
    left:0;
    z-index: 50;
    width: 100%;
    height: 100%;
    overflow: hidden;
    max-height:100%;
    &.overlay-bg{
        background-color: var(--overlay-alpha-80);
    }
    &.neutral-bg{
        background-color: rgba(255, 255, 255, .8) !important;
    }
`
const Child = styled.div`
    position:fixed;
    
    max-height: 100%;
    min-height:100%;
    width:100%;
    z-index: 3;
    overflow-y:auto;
    &.child--main{
        padding: calc(var(--header-size) + 16px) 8px;
    }
    &.child--login{padding: 25px 0px;}
`
const GrandChild = styled.div`
    height:100%;
    width:100%;
    min-height:500px;
    display:flex;
    align-items:center;
    justify-content:center;
`

const ModalBox = styled.div`
    position: relative;
    background-color: ${(props)=> props.backgroundColor};
    min-height:140px;
    min-width:200px;
    height:${(props) => props.height};
    width:${(props) => props.width}px;
    z-index:5;
    border-radius: 5px;
    max-width: calc(100vw - 5%);
    &.modal-bg{
        background-color: var(--card-background);
    }
    &.modal-bg--n{
        background-color:white;
    }
    &.modal-shadow{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
    }
    box-shadow: 0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset);
`
const TopContainer = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: ${({justifyContent})=> justifyContent};
    border-bottom: 1px solid var(--divider);
    padding: 0 16px;
`
const Heading = styled.div`
    display: flex;
    align-items: center;
    color:var(--primary-text);
    font-size: 1.25rem;
    & > h2{
        font-size:inherit;
        color:inherit;
        text-transform: capitalize;
    }
    &.flex-column{
        flex-direction:column;
    }
`
const ButtonContainer = styled.div`
    position: absolute;
    right:10px;
   
    
`
const Inner = styled.div`
    position:relative;
    overflow:hidden;
    border-radius:555px;
    &:focus, &:active > *{
        transform: scale(0.9);
    }
    &:hover > ${HoverButton}{
        opacity:1;
    }
    
`
TopContainer.defaultProps={
    justifyContent:'center',
}
ModalBox.defaultProps={
    height:"100%",
    width:"390",
   
    
}
