import React from 'react'
import Icon from '../Icons'
import './buttons.css';
import styled from 'styled-components'
import { Hover } from '../Styles/Styles';
export default function IconButton(props){
    const className = `icon-button 
        ${props.type && props.type} 
        ${props.size} 
        ${props.shape} 
        ${props.hoverable && props.type ?  `hoverable hoverable--${props.type}` : '' }
        ${props.custom && props.custom}
        ${props.hover && 'hover'}
    `
    const className2 =`
        ${props.space && `space--${props.space}`}
    `
    return (
        <Button className={className}
            onClick={props.onClick}
            tabIndex={props.tabIndex}
            FontSize={props.FontSize}
            FontWeight={props.FontWeight}
            textColor={props.textColor}
        >
            <Container>
                {props.icon &&  <Icon 
                    size={props.iconSize}
                    src={props.src}
                    name={props.icon}
                    image={props.image && props.image}
                    variante={props.variante}
                />}
                {props.children}
                {props.label && <Text className={className2 + `${props.textColor && `text--${props.textColor}`}`}>{props.label}</Text>}
            </Container>
            {props.hover ? <Hover /> : ''}
        </Button>    
    )
    
};
const Text = styled.span`
    margin-left:3px;
    text-transform:capitalize;
    font-size:inherit;
    font-weight:inherit;
    &.text--primary{
        color: var(--primary-text);
    }
    &.text--secondary{
        color: var(--secondary-text);
    }
    &.text--accent{
        color: var(--accent);
    }
`
const Container= styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    width:100%;
    height:100%;
   
    
`

const Button = styled.button`
    font-size: ${({FontSize})=> FontSize };
    font-weight: ${({FontWeight})=> FontWeight };
    position:relative;
    &.hover{
        background:transparent;
        &:hover > ${Hover}{
            opacity:1;
        }
        &:hover{
            background:transparent;
        }
    }
    
`
Text.defaultProps={
    
}
IconButton.defaultProps = {
    
    size: "medium",
    shape: "rounded",
    FontSize: '.9375rem',
    FontWeight:'600'
}
