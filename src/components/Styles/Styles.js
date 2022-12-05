import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
 
export const Flex = styled.div`
    display:flex;
    ${(props)=> props.direction &&`
        flex-direction:${props.direction};`
    }
    ${(props)=>props.justify &&`
    justify-content: ${props.justify};`
    }
    ${(props)=> props.align &&
        `align-items:${props.align};`
    }
    ${(props)=> props.wrap &&`
        flex-wrap:wrap;`
    }
`

export const NavigationList = styled.li`
    width:100%;
    height:100%;
    max-width: 110px;
    min-width: 56px;
    display:flex;
    align-items:center;
    justify-conntent;
    position:relative;
    transition: all ease-in-out 300ms;
    &.profile-list{
        width: unset !important;
        min-width:72px;
    }
    
`
export const HoverLink = styled.div`
    position:absolute;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    bottom: 4px;
    left: 0px;
    right: 0px;
    top: 4px;
    opacity:0;
    background-color: var(--input-bg)
`
export const Hover= styled.div`
    position:absolute;
    border-radius: inherit;
    bottom: 0;
    left: 0px;
    right: 0;
    top: 0;
    opacity:0;
    background-color: var(--hover-overlay);
    transition: all ease-in-out 200ms;
`
export const NavigationLink = styled(NavLink)`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    max-width: 110px;
    min-width: 56px;
    height: 100%;
    position: relative;
    text-transform: capitalize;
    color: var(--secondary-text);
    z-index:1;
    & svg > path{
        fill: var(--secondary-icon);
    }
    &.--activeLink{
        color: var(--accent);
    }
    &.--activeLink svg  path{
        fill: var(--accent);
    }
    &.--activeLink:before{
        position: absolute;
        content: '';
        height:3px;
        width:100%;
        background-color: var(--accent);
        bottom:0;
        left: 0;
        right:0;
        border-radius: 2px;
    }
    &:hover:not(&.--activeLink) ~ ${HoverLink}{
        opacity:1;
        &.margin{
            margin: 0 -5px;
        }
    }
    &.profile-nav-link{
        padding:0 10px;
    }
   
`
export const SpaceIgnore = styled.div`
    width:100%;
    height: ${({ ignore }) => ignore}px;
    background:transparent;
`
export const HoverOverlay= styled.div`
    height:100%;
    width:100%;
    position:absolute;
    top:0;
    right:0;
    right:0;
    left:0;
    background-color:var(--hover-overlay);
    opacity:0;
    transition: all ease-in-out .2s;
    border-radius:inherit;
`
export const LoadingState = styled.div`
    background-color: blue;
    height:100%:
    width:100%;
    position:absolute;
    z-index:55;
`


export const HoverButton = styled.div`
    background-color:var(--hover-overlay);
    position:absolute;
    top:-8px;
    right:-8px;
    bottom:-8px;
    left:-8px;
    opacity:0;
    border-radius:4px;
    cursor:pointer;
    
`
export const ButtonContainer = styled.div`
    position:relative;
    &:hover > ${HoverButton}{
        opacity:1;
    }
`

export const EditButton = styled.span`
    color:var(--accent);
    font-size: 1.0625rem;
    word-break: break-word;
    text-transform: capitalize;
    cursor:pointer;
    z-index:1;
    
`
export const Bottom = styled.div`
    padding-top:16px;
    height:70px;
    width:100%;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
`

export const ItemContainer = styled.div`
    border-radius:8px;
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    width: 100%;
    position: relative;
    padding: 6px;
    cursor:pointer;
    &:hover > ${HoverButton}{
        opacity:1;
    }
    &:hover > ${HoverOverlay}{
        opacity:1;
    }
    & > span{
        color: var(--primary-text);
        font-size:inherit;
        font-weight:inherit;
        margin-left:8px;
    }

`
