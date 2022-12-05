import React from 'react';
import BrandSearch from './Brand_Search';
import styled from 'styled-components'
import MainLinks from './MainLinks'
import RightLinks from './RightLinks'
import './header.css'
export default function Header() {
    return (
        <>
        <Wrapper>
            <div style={{height:'56px', width:'320px'}}>
                <BrandSearch />
            </div>
            <Barre>
                <Container>
                    <MainLinks />
                    
                </Container>
            </Barre>
           <RightLinks />
        </Wrapper> 
        
        </>
    )
}
const Wrapper = styled.div`
    position:relative;
`
const Barre= styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background:var(--header-bg);
    z-index:5;
`
const Container = styled.div`
    height: var(--header-size);
    position:relative;
    width:100%;
    max-width:100%;
    overflow: hidden;
    border-bottom: .01em solid var(--divider);
`
const Fixing = styled.div`
    width:100%;
    max-width:100%;
    height:var(--header-size);
    background: tansparent;
   
`