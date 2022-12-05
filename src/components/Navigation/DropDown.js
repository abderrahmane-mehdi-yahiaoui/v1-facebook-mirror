import React, {useRef, useEffect} from 'react'
import styled from 'styled-components'
export default function DropDown({ open, setOpen, children, toggleRef}) {
    const dropRef = useRef()
    
    const handleClickOutside = (event) =>{
        if(dropRef.current && !dropRef.current.contains(event.target)) setOpen(false)
       
    }
    const handleKeyEvent = (event)=>{
        if(event.key === 'Escape') setOpen(false)
    }
    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true)
        document.addEventListener('keypress', handleKeyEvent, true)
        return()=>{
            document.removeEventListener('click', handleClickOutside, false)
            document.removeEventListener('keypress', handleKeyEvent, false)
        }
    })
    return open && (
        <Card ref={dropRef}>
            <Menu>
                { children }
            </Menu>
        </Card>
    )
}

const Card = styled.div`
    position: absolute;
    top: calc(var(--header-size) - 4px);
    width: 360px;
    right: 18px;
    background-color: var(--card-background);
    border: .001em solid var(--input-bg);
    border-radius: var(--border-radius);
    padding: .5rem;
    overflow-y: auto;
    transition: height var(--speed) ease;
    z-index: 10;
    max-height: calc(99vh - var(--header-size));

`
const Menu = styled.div`
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden !important;
`
