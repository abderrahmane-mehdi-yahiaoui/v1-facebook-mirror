import React from 'react'
import { IconButton } from '../Buttons'
import Typography from '../Typography'
import styled from 'styled-components'
import { Hover } from '../Styles/Styles';
export const ToggleButton = ({onClick, lessThan}) => {
  
    return(
        <Wrapper  onClick={onClick}>
            <li className="SidebarList">
                <span
                    className="MoreButton"
                    role="button"
                   
                >
                    <IconButton type="secondary" variante="primary" size="s28" icon={lessThan? `chevron__down` : `chevron__up`}src="2" iconSize="20" />
                    <Typography capitalize style={{marginLeft:'.7em'}}  text={lessThan ? 'See more': 'See less'} Color="primary" font="small" weight="500" />
                  
                </span>
            </li>
            <Hover />
        </Wrapper>
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