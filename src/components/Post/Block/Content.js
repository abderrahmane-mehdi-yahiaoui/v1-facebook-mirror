import React from 'react'
import * as Style from '../Styles'
import styled from 'styled-components'

export default function Content(props){
    return(
        <Style.Container>
            <Caption caption={props.caption}/>
            <Image image={props.image} alt={props.alt} {...props.rest}/>
        </Style.Container>
    ) 
}


const Caption = props =>{
    if(props.caption){
        return(
            <Style.Container>
                <Style.PaddingSides>
                        <Style.Holder>
                            <CaptionText dir="auto" className="primary-text">
                                {!props.loading ? props.caption: <div className="loading-text"><div className="loading"></div></div>}
                            </CaptionText>
                        </Style.Holder>
                </Style.PaddingSides>
            </Style.Container>
        )
    }return null
    
}
const Image = props =>{
    if(props.image){
        return(
            <Style.Container>
                <Style.Center className="__top--8">
                    <div className="img-container">
                        <ImageContainer src={props.image} alt={props.alt} 
                            onError={(e)=>{e.target.onError = null; e.target.src = '' ; e.target.style.opacity='0'}}
                        />
                    </div>
                </Style.Center>
            </Style.Container>
        )
    }return null
   
}



const CaptionText = styled.p`
    word-break:break-word;
    max-width:100%;
`
const ImageContainer = styled.img`
    object-fit: cover;
    max-height: 400px;
    height:100%;
    width:100%;
`

