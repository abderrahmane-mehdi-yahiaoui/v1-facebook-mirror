import React from 'react';
import './icons.css';
import './emoji.css';
import styled from 'styled-components';

export default function Icon({ 
    name, 
    size ,
    src,
    image,
    cover,
    variante,
    ...rest 
    })
{
    
    return( 
        <ICON  
            className={` 
                ${name} 
                icon-list${src} 
                variante-${variante}
                ${cover && 'cover'}
                size--${size}
            `} 
            size={size}
            {...rest} 

        />
    )
}

const ICON = styled.i`
        background-size: auto;
        background-repeat: no-repeat;
        display: inline-block;
            &.size--${({size})=> size}{
                height: ${({size})=> size}px;
                width: ${({size})=>  size}px;
            }
            &.variante-none{
                -webkit-filter: none;
            }
            &.variante-always-white{
                -webkit-filter: var(--filter-always-white) !important;
            }
            &.variante-primary{
                -webkit-filter: var(--filter-primary-icon);
            }
            &.variante-secondary{
                -webkit-filter: var(--filter-secondary-icon);
            }
            &.variante-accent{
                -webkit-filter: var(--filter-accent);
            }

    `
Icon.defaultProps={
    size:'24',
    variante:'none'
}