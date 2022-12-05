import styled from 'styled-components'
export const PaddingSides = styled.div`
    padding-right:16px;
    padding-left:16px;
    &.__bottom-top{
        margin-top:10px;
        margin-bottom:10px;
        
    }
`
export const Center = styled.div`
    padding-top:16px;
    &.__top--8{
        padding-top:8px !important;
    }
    &.__bottom-8{
        padding-bottom:8px !important;
    }
`
export const FlexBetween = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
`
export const Container = styled.div`
    width:100%;
    min-height:10px;
    height:100%;
    max-height:100%;
    position:relative;
    overflow:hidden;
`
export const Holder = styled.span`
    display:flex;
    height:100%;
    max-width:fit-content;
    margin:2.5px;
    min-height:45px;
    flex-direction:column;
    word-break:break-word;
    justify-content:space-evenly;
        &  > a:hover{
                text-decoration:underline;
        }     
`
