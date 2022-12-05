import React from 'react'
import styled from 'styled-components'
export default function Button(props) {
    return (
        <BUTTON
            className={
                `${`type-${props.type}`}
                ${props.type === 'disabled' ? `disabled` : ''}
                ${props.width ? `width-${props.width}` : ''}
                `
                
            }
            padding={props.padding}
            marginLeft={props.marginLeft}
            onClick={props.submit}
           
            {...props}
        >
            <Text
                className={
                    `${props.textColor ? `text-color--${props.textColor}`: ''}
                     ${props.buttonText ? `text-color-button-${props.buttonText}`: ''}
                    `
                }
                
                
            >
                {props.children}
            </Text>
           {props.type !== 'disabled' && <Hover />}
        </BUTTON>
    )
}

const Hover = styled.div`
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    height:100%;
    width:100%;
    opacity:0;
    background-color: var(--hover-overlay);
    transition: opacity ease-in-out 200ms;
    border-radius:inherit;
    
`
const BUTTON = styled.button`
    position:relative;
    height: 36px;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    border-radius:6px;
    outline:none !important;
    border-style:none;
    cursor:pointer;
    padding: 0px ${({padding})=> padding}px;
    margin: 0 5px;
    &.width-${(props)=>props.width}{
        width: ${(props)=>props.width}%;
    }
    &:hover > ${Hover}{
        opacity:1;
    }
    font-family: var(--apple-system);
    font-size:  .9375rem;
    font-weight:600;
    &:focus:not(.disabled), &:active:not(.disabled){
        transform:scale(.9);
    }
    &.type-primary{
        background-color: var(--primary-button-background);
    }
    &.type-secondary{
        background-color: var(--secondary-button-background);
    }
    &.type-disabled{
        background-color:var(--disabled-button-background);
    }

    &.disabled{
        cursor:not-allowed;
    }
    &.type-secondary-hover{
        background-color:transparent;
        &:focus, &:active{
            background-color:var(--primary-focused-button-background);
        }
    }
`
const Text = styled.span`
    color: white;
    word-break:break-word;
    font-family:inherit;
    font-size:inherit;
    font-weight: inherit;
    text-transform: capitalize;
    z-index:1;
    &.text-color--accent{
        color: var(--accent);
    }
    &.text-color--primary{
        color:var(--primary-text)
    }
    &.text-color--disabled{
        color:var(--disabled-text);
    }
    &.text-color-button-primary{
        color: var(--primary-button-text)
    }
  
`

Button.defaultProps={

    fontFamily: 'var(--apple-sytem)',
    padding: '12',
   
}