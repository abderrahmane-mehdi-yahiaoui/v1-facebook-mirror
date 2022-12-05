import React from 'react';
import styled from 'styled-components'
import {Hover} from '../Styles/Styles'
export default function Avatar(props){

   
    return(
        <Wrapper size={props.size} className={`size-${props.size }`}>
            {!props.loading && props.user ?
            <>
                <AvatarImage  src={props.src ? props.src : "https://i.stack.imgur.com/l60Hf.png"} alt={props.alt} onError={e=> {e.target.onError = null; e.target.src="https://i.stack.imgur.com/l60Hf.png"}} />
                {props.hover && <Hover />}
            </>
            :
            <div className="loading" />
            }

        </Wrapper>
    )
} 
const Wrapper = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
    border-top-right-radius:100px;
    border-top-left-radius:100px;
    border-bottom-right-radius:100px;
    border-bottom-left-radius:100px;
    cursor:pointer;
    font-size: ${({fontSize})=> fontSize};
    overflow:hidden;
    background-color:var(--input-bg);
    &:hover > ${Hover}{
        opacity:1;
    }
    &.size-${({size})=> size}{
        height:${({size})=> size}px;
        width:${({size})=> size}px;
    }
`
const AvatarImage = styled.img`
    height:100%;
    width:100%;
    object-fit:cover;
    border-top-right-radius:100px;
    border-top-left-radius:100px;
    border-bottom-right-radius:100px;
    border-bottom-left-radius:100px;

`
Avatar.defaultProps={
    size:'40',
    fontSize:'1.25rem'
}