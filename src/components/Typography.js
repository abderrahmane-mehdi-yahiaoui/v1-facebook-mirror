import React from 'react'
import styled from 'styled-components'
export default function Typography(props, { tag }) {
    const {Color, font, weight, custom, capitalize, link}= props 
    
   
    const validTags =[
        'p','h1','h2','h3','h4','h5','h6','span','div','article',
    ]
    React.useEffect(()=>{
        const check =()=>{ 
            if(tag !== validTags){
                const errMessage = `${tag} cannot be used as a Typography tag. Only ${validTags} can be used as Typography tag`;
                throw errMessage;
            }
            if(!tag || tag === undefined){
                const errMessage = `Typography is a custom React component, it cannot be null or undefined`
                throw errMessage;
            }
        }
        return()=> check
    })
   
    const classNames =[
        `color-${Color}`,
        font && `font-size-${font}`,
        props.family && `font-family--${props.family}`,
        capitalize && 'capitalize',
        weight && `font-weight-${weight}`,
        link === true  && 'anchors',
        custom && props.custom,
    ]
return <StyledTypography  className={ classNames } {...props}>{props.text} {props.addition && props.addition}</StyledTypography>;
}

const StyledTypography = styled.div`
    word-break:break-word;
    max-width:100%;

    &.color-${(props)=> props.Color}{
        color: var(--${(props)=> props.Color}-text);
    }
    &.font-size-${(props)=> props.font}{
        font-size:var(--font-size-${(props)=> props.font}); 
    }
    &.font-weight-${(props)=> props.weight}{
        font-weight: ${(props)=> props.weight};
    }
    &.font-family--${(props)=> props.family}{
        font-family: var(--font-family--${(props)=>props.family})
    }
    &.capitalize{
        text-transform: capitalize;
    }
    &.uppercase{
        text-transform:uppercase;
    }
    &.anchors{
        text-decoration:none;
        cursor:pointer;
        &:visited{
            color: ${(props)=> props.Color};
        }
        &:hover{
            text-decoration: underline;
        }
    }

`



