import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icons'
import Typography from '../Typography'
import { Hover } from '../Styles/Styles';
import styled from 'styled-components'
export function SidebarRow(props) {
    return (
        <>
        <Wrapper >
            <li className="SidebarList" key={props.index}>
                <Link className="SidebarLink"
                    key={props.index}
                    to={props.path}
                    data-label={props.dataLabel}
                >
                    <span key={props.index} style={{display:"flex"}}>{!props.avatar ? <Icon name={props.icon} cover size={'28'}/>: props.avatar}</span>
                    <Typography capitalize style={{marginLeft:'.7em'}}  text={props.title} Color="primary" font="small" weight="500" />
                    
                    {props.verified && props.verified}
                </Link>
            </li>
            <Hover />
        </Wrapper>
        </>
    )
}
const Wrapper = styled.div`
    margin-left: 8px;
    margin-right: 8px;
    border-radius:6px;
    position:relative;
    cursor:pointer;
    &:hover ${Hover}{
        opacity:1;
    }
`