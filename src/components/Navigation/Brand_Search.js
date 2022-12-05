import React, {useEffect, useRef, useState, createRef} from 'react'
import { Link } from 'react-router-dom'
import * as Iconx from '../Icons/static'
import Icon from '../Icons'
import styled from 'styled-components'
import { IconButton } from '../Buttons'
import useClickOutside from '../Hooks/UseClickOutside'

export default function BrandSearch() {
    const { ref, setVisibility, visibility} = useClickOutside()

    const inputRef = useRef()
    const handleExpand=(e)=>{
        e.preventDefault()
        inputRef.current.focus()
        setVisibility(true)
        
    }

    return (
        <Wrapper>
            <Container className={visibility ? 'focus': ''}>
                <div className="container">
                    <Link to="/" id="facebook">
                        <Iconx.FacebookLogo size='40px' fill="#fff" />
                    </Link>
                    <span className="action--icon">
                        <IconButton type="secondary" icon={`arrow__left-header`} variante="secondary" iconSize={`20`} src="2" />
                    </span>
                </div> 
                <Search onClick={handleExpand} className={`${visibility && 'search--expand'} search`} ref={ref}>
                    <form onSubmit={(e)=> e.preventDefault()}>
                        <input  ref={inputRef} className="search--input" placeholder="Search Facebook"/>
                    </form>
                    <span className="search--button">
                        <Icon  role="button"   variante="secondary" name={`search`} src={`2`} size="16" />
                    </span>
                    
                </Search>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height:100%;
    width:100%;
    display:flex;
    align-items:center;

`
const Container = styled.div`
    display:flex;
    align-items:center;
    position:fixed;
    z-index:60;
    top:0;
    left:10px;
    #facebook{
        transition: opacity ease-in-out 400ms;
    }
    &.focus #facebook{
        opacity:0;
    }
    
    &.focus .container span.action--icon{
        left:0;
    }
        & > div.container{
            position:relative;
            display: flex;
            align-items: center;
            height:var(--header-size);
            
        }
        & span.action--icon{
            position:absolute;
            left:-100px;
            height:var(--header-size);
            transition: all ease-in-out 400ms;
            display: flex;
            align-items: center;
        }
    
       
`
const Search = styled.div`
    background:var(--input-bg);
    height:40px;
    min-width:40px;
    overflow:hidden;
    border-radius:55px;
    position:relative;
    display:flex;
    flex-direction:row-reverse;
    justify-content:flex-end;
    margin-left:10px;
    transition:width ease-in-out 200ms;
    @media only screen  and (max-width: 1150px){
        width:40px;
        cursor:pointer;
        &.search--expand{
            width:240px;
            & .search--input{
                display:block;
            }
            & .search--button{
                opacity:0;
                width:10px;
            }
        }
       
        & .search--input{
            display:none;
        }
        
    }

        &  form{
            height:40px;
            overflow:hidden;
        }
        & >.search--button{
            height:100%;
            width: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all ease-in-out 400ms;
        }
        & .search--input{
            background:transparent;
            border-style:none;
            height:40px;
            padding:unset;
            color: var(--primary-text);
            font-size:.9567rem;
            outline:none;
        }
        &:focus-within .search--button{
            opacity:0;
            width:10px;
        }
`
