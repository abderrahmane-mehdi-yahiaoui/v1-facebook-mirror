import React from 'react'
import styled from 'styled-components'
import Typography from '../Typography'
import { Flex, Hover } from '../Styles/Styles'
import HtmlIcon from '../Icons/htmlIcon.png'
import JavascriptIcon from '../Icons/JavascriptIcon.png'
export default function Intro(props) {
    const { master } = props
    if (master) {
        return (
            <Sticky>
                <Wrapper>
                    <Top>
                        <div className="text-center">
                            <Typography weight="700" as="span" font="medium3" Color="primary" text="intro" capitalize />
                        </div>
                    </Top>
                    <Bottom>

                        {IntroInfo.map((info, index) => (
                            <Celulle
                                key={index}
                                path={info.path}
                                url={info.url}
                                icon={info.icon}
                                text={info.text}
                                link={info.link}
                                social={info.social}
                            />
                        ))}
                        
                        <div className="text-center">
                            <Flex align="center">
                                <IconContainer>
                                    <IconIntro aria-label="HTML" className={'icon-container--socials'} src={HtmlIcon} alt="" />
                                </IconContainer>
                                <TextContainer>
                                    <div className="text-container--2">
                                        <span className="--text" dir="auto">
                                            <ProgressBar className="html-icon" aria-label="Progress in HTML" value="50" max="100" style={{width:"100%"}} />
                                        </span>
                                    </div>
                                </TextContainer>
                            </Flex>
                        </div>
                        <div className="text-center">
                            <Flex align="center">
                                <IconContainer>
                                    <IconIntro aria-label="CSS" className={'icon-container--socials'} src={"https://cdn.iconscout.com/icon/free/png-256/css-118-569410.png"} alt="" />
                                </IconContainer>
                                <TextContainer>
                                    <div className="text-container--2">
                                        <span className="--text" dir="auto">
                                            <ProgressBar className="css-icon" aria-label="Progress in CSS" value="50" max="100" style={{width:"100%"}} />
                                        </span>
                                    </div>
                                </TextContainer>
                            </Flex>
                        </div>
                        <div className="text-center">
                            <Flex align="center">
                                <IconContainer>
                                    <IconIntro aria-label="JavaScript" className={'icon-container--socials'} src={JavascriptIcon} alt="" />
                                </IconContainer>
                                <TextContainer>
                                    <div className="text-container--2">
                                        <span className="--text" dir="auto">
                                            <ProgressBar className="javascript-icon" aria-label="Progress in JavaScript" value="20" max="100" style={{width:"100%"}} />
                                        </span>
                                    </div>
                                </TextContainer>
                            </Flex>
                        </div>
                        <div className="text-center">
                            <Flex align="center">
                                <IconContainer>
                                    <IconIntro title="React Js" aria-label="React Js" className={'icon-container--socials'} src={"https://jasonpallone.com/React-icon.png"} alt="" />
                                </IconContainer>
                                <TextContainer>
                                    <div className="text-container--2">
                                        <span className="--text" dir="auto">
                                            <ProgressBar className="react-icon" arial-label="Progress in React JS" value="40" max="100" style={{width:"100%"}} />
                                        </span>
                                    </div>
                                </TextContainer>
                            </Flex>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Hobby text="Coding" icon="https://static.xx.fbcdn.net/images/emoji.php/v9/t46/1/32/1f4bb.png" />
                            <Hobby text="Drawing" icon="https://static.xx.fbcdn.net/images/emoji.php/v9/tea/1/32/270f.png" />
                            <Hobby text="Learning foreign languages" icon="https://static.xx.fbcdn.net/images/emoji.php/v9/t3/1/32/1f4da.png" />
                        </div>
                    </Bottom>
                </Wrapper>
            </Sticky>
        )
    }
    return null;
}

const Celulle = (props) => {
    return (
        <div className="text-center">
            <Flex align="center">
                <IconContainer>
                    <IconIntro className={!props.social ? "icon-container--icon" : 'icon-container--socials'} src={props.icon} alt="" />
                </IconContainer>
                <TextContainer>
                    <div className="text-container--2">
                        <span className="--text" dir="auto">
                            {props.text}
                            <a aria-label={props.social ? props.social : ''} dir="auto" href={props.url} target="_blank" rel="noreferrer" className="--link">
                                {props.link}
                            </a>
                        </span>
                    </div>
                </TextContainer>
            </Flex>
        </div>
    )
}
const Hobby = props => {
    return (
        <div style={{ padding: '4px', maxWidth: '100%' }}>
            <HobbyButton title={`hobby of ${props.text}`}>
                <Flex align="center" style={{ height: '100%' }}>
                    <span>
                        <img src={props.icon} alt="" style={{ widht: '32px', height: '32px' }} />
                    </span>
                    <div>
                        <Typography as="span" Color="primary" font="small" weight="600" capitalize text={props.text} />
                    </div>
                </Flex>
                <Hover />
            </HobbyButton>
        </div>
    )
}
const IntroInfo = [
    {
        text: 'Second year English student at ',
        link: ' ‎Université 8 mai 1945 - GUELMA جامعة 08 ماي 1945 - قالمة‎',
        url: 'https://univ-guelma.dz',
        icon: 'https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/id4jdGYPaIP.png'
    },
    {
        text: 'Lives in',
        link: 'Algiers, Algeria',
        icon: 'https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/X_t0JnueVu-.png?_nc_eui2=AeEW8lIVcxLmEj6a2yB3KWUnL4WPyFecqSMvhY_IV5ypI6IcOifZd5_iesLfkXyFdZ-D_uBJ5OweXIzaTB2wZZA9'
    },
    {
        text: '',
        link: '@mehdi-abderrahmane-yahiaoui',
        url: 'https://www.linkedin.com/in/mehdi-abderrahmane-yahiaoui-3b12981a0/',
        icon: "https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico",
        social: 'linkdin'
    },




]
const Sticky = styled.div`
    position:sticky;
`
const Wrapper = styled.div`
    border-radius:8px;
    box-shadow: 0 1px 2px var(--shadow-2);
    background-color: var(--card-background);
    position:relative;
    width:100%;
`
const Top = styled.div`
    padding-top:20px;
    padding-bottom:4px;
    display:flex;
    justify-content:flex-start;
    max-width:100%;
    & > .text-center{
        padding:0 16px;
        width:100%;
        
    }
`
const IconContainer = styled.div`
    padding:6px;
    margin-left: -6px;
`
const IconIntro = styled.img`
    -webkit-filter: var(--filter-placeholder-icon);
    &.icon-container--socials{
        -webkit-filter: none;
        height:20px;
        width:20px;
    }
`
const Bottom = styled.div`
    padding: 2px 16px 12px 16px;
  
   
`
const TextContainer = styled.div`
    padding: 6px;
   
    & >.text-container--2{
        margin: 5px 0px;
        
        font-family: var(--apple-system);
        & >.--text{
            font-size: var(--font-size-sub);
            display: block;
            max-width:100%;
            min-width: 291px;
            width:100%;
            color: var(--primary-text);
            & >.--link{
                margin-left:2px;
                font-weight:600;
                font-family:inherit;
                color: var(--primary-text);
                cursor:pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }

`
const HobbyButton = styled.div`
    border-radius:18px;
    padding: 0px 12px;
    border: 1px solid var(--media-inner-border);
    position:relative;
    height:38px;
    &:hover ${Hover}{
        opacity:1;
    }
`
const ProgressBar = styled.progress`
    &[value]{
        -webkit-appearance:none;
        -apearance: none;
        height:10px;
        
        
    }
    &.react-icon[value]::-webkit-progress-value{
        background:#61DBFB;
    }
    &.html-icon[value]::-webkit-progress-value{
        background:#f06529;
    }
    &.css-icon[value]::-webkit-progress-value{
        background:#2965f1;
    }
    &.javascript-icon[value]::-webkit-progress-value{
        background:#f0db4f;
    }
    &[value]::-webkit-progress-value{
       
        border-radius:18px;
       
    }
    &[value]::-webkit-progress-bar{
        border-radius:18px;
        background: var(--input-bg);
    }
`