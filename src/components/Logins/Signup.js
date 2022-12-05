import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Typography from '../Typography'
import { Flex } from '../Styles/Styles'
import {IconButton} from '../Buttons'
import Icon from '../Icons'
import {useAuth} from '../Context'
import useMediaQuery from '../Hooks/UseMediaQuery'
export default function Signup(props) {
    const { signup }= useAuth()
    const history = useHistory()
    const [validEmail, setValidEmail]= useState(false)
    const [email, setEmail]= useState({ email: '', confirmed: false})
    const [error, setError]= useState(false)
    const [fnameError, setFnameError]= useState({message:'', state:false})
    const [lnameError, setLnameError]= useState({message:'', state:false})
    const [emailError, setEmailError]= useState({message:'', state:false})
    const [confEmailError, setConfEmailError]= useState({message:'', state:false})
    const [firstName, setFirstName]= useState('')
    const [lastName, setLastName]= useState('')
    const [pwd, setPwd]= useState('')
    const [pwdError, setPwdError]=useState({state:false, message:''})
    const [gender, setgender]=useState(null)
    const [genderError, setGenderError]= useState({state:false, message:''})
    const [loading, setLoading]= useState(false)
    let validDomains = ['.com', '.fr', '.net', '.co.uk', '.dz']
    const emailChange=(e)=>{
       const value = e.target.value 
       if(value !== ''){
            if(value.includes('@')){
                if(validDomains.some(el=> value.includes(el))){
                    setValidEmail(true)
                    setEmail({ email : value})
                    setEmailError({ state: false, message: ''})
                    setError(false)
                }else{
                    setValidEmail(false)
                }    
            }
       }if(value === ''){
            setValidEmail(false)
            setEmail({ email: '', confirmed: false})
            setEmailError({state: true, message: "You'll use this if you log in and if you ever need to reset your password"})
            setError(true)
       }
    }
    
    const confirmEChange=(e)=>{
        const value = e.target.value
        if(value === email.email){
            setEmail({confirmed: true, email: value})
            setConfEmailError({state: false, message: ""})
            setError(false)
        }if(value !== email.email){
            setConfEmailError({state: true, message: "Please re-enter your email adress."})
            setError(true)
        }
        if(value === ''){
            setConfEmailError({state: true, message: "Please re-enter your email adress."})
            setError(true)
        }
 
        console.log(email)
    }
    const FNameChange=e=>{
        const value = e.target.value
        if(value === ''){
            setFnameError({state: true, message: "What's your name?" })
            setError(true)
        }
        if(value.length >= 30){
            setFnameError({state: true, message: "The name you provided is too long" })
            setError(true)
        }
        if(value !== '' && value.length < 30){
            setFnameError({state: false, message: "" })
            setFirstName(value)
            setError(false)
        }
        
    }
    const LNameChange=e=>{
        const value = e.target.value
        if(value === ''){
            setLnameError({state: true, message: "What's your name?" })
            setError(true)

        }
        if(value !== '' && value.length >= 23){
            setFnameError({state: true, message: "The name you provided is too long" })
            setError(true)
        }
        if(value !== '' && value.length < 23){
            setLnameError({state: false, message: "" })
            setLastName(value)
            setError(false)
        }
    }
    const PwdChange=e=>{
        const value = e.target.value
        
        if(value === ''){
            setPwdError({state: true, message: "Enter a password" })
            setError(true)
        }if(value !== ''){
          
            
                    setPwd(value)
                    setPwdError({ state: false, message: ''})  
                    setError(false)
                
             
           
            
        }
    }
    const genderChange =e=>{
        const value = e.target.value;
        if(value){
            setgender(value)
            setError(false)
        }
    }

    /* Sign UP phase*/
    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        if(email.email === ''){
            setEmailError({state: true, message: "You'll use this if you log in and if you ever need to reset your password"})
            setError(true)
        }
        
        if( !email.confirmed)
            { 
                setEmailError({state: true, message: "Please re-enter your email adress."})
                setError(true)
            }
        if(firstName === '' ){
            setFnameError({state: true, message: "What's your name?" })
        }
        if(lastName === ''){
            setLnameError({state: true, message: "What's your name?" })
        }
        if(gender === null){
            setGenderError({state: true, message: "What is your gender?"})
            setError(true)
            
        }
        if(pwd === ''){
            setPwdError({state: true, message: 'Enter a password'})
            setError(true)
        }
        
        try{
            if(!error){
                await signup(firstName, lastName, email.email, pwd ) 
                history.replace('/')
                setError(false, {message: ''})
                setLoading(false)
            }
           
        }catch (error){
            setEmailError({state: true, message: "The email you provided seem to be already taken. Please choose another one."})
            setError(true)
            console.log(error)
            setLoading(false)
            
        }
        setLoading(false)
    }
    React.useEffect(()=>{
        console.log(loading)
    }, [loading])
    const smDevice = useMediaQuery("(max-width:500px)")
    return (
        <>
        <TopModal>
            <Flex direction="column">
                <Typography weight="600" family="helv" font="large" Color="darkGray" text="Sign Up"/>
                <Typography font="small2" Color="lightGray" text="It's quick and easy."/>
            </Flex>
            <ButtonContainer aria-describedby={`close ${props.areaDescrpibedby && props.areaDescrpibedby}`}>
                <Inner onClick={props.closeModal}>
                    <IconButton  variante="secondary" size="s" type="secondary" icon="times" iconSize="20" src="2" />
                </Inner>
            </ButtonContainer>
        </TopModal>
        <Form onSubmit={handleSubmit} >
            {error && error.message}
            <Flex justify={smDevice ? `column`: 'row'}>
                <InputContainer className="name m-top-bottom" error={fnameError.state}>
                    <Input autoFocus onBlur={FNameChange} onChange={FNameChange} placeholder="First name" className="name" name="first-name" />
                    <ErrorHandler error={
                        fnameError.state
                        } 
                        message={fnameError.message}
                    />
                </InputContainer>
                <InputContainer className="name m-bottom" error={lnameError.state}>
                    <Input onBlur={LNameChange} onChange={LNameChange} placeholder="Last name" className="name" name="last-name"  />
                    <ErrorHandler error={
                        lnameError.state
                        } 
                        errorType="last-name"
                        message={lnameError.message}
                    />
                </InputContainer>
            </Flex>
            <Flex direction="column">
                <InputContainer className="m-bottom" error={emailError.state}>
                    <Input onBlur={emailChange} onChange={emailChange} type="email" placeholder="Email" className="" name="email"  />
                    <ErrorHandler error={
                        emailError.state
                        } 
                        
                        message={emailError.message}
                    />

                </InputContainer>
                {validEmail && <InputContainer  className="m-bottom" error={confEmailError.state}>
                    <Input onBlur={confirmEChange} onChange={confirmEChange} type="email" placeholder="Re-enter email" className="" name="email-confirm"  error={error} />
                    <ErrorHandler error={
                        confEmailError.state
                        } 
                        
                        message={confEmailError.message}
                    />
               
                </InputContainer> }
               
                <InputContainer className="m-bottom" error={pwdError.state}>
                    <Input onBlur={PwdChange} onChange={PwdChange} type="password" placeholder="Password" className="" name="New password" />
                    <ErrorHandler error={
                        pwdError.state
                        } 
                        
                        message={pwdError.message}
                    />
                </InputContainer>
                
            </Flex>

            {/* <Typography as="h6" Color="secondary" text="Gender" /> */}
            {/* <RadioForm>
                <InputContainer className="m-top-bottom radio">
                    <Flex align="center" justify="space-between">
                        <label>Female</label>
                        <div  onChange={genderChange}>
                        <RadioButton type="radio" name="gender" value="female" required/>
                        </div>
                        
                    </Flex>
                </InputContainer>
                <InputContainer className="m-top-bottom radio">
                    <Flex align="center" justify="space-between">
                        <label>Male</label>
                        <div  onChange={genderChange}>
                        <RadioButton type="radio" name="gender" value="male" required/>
                        </div>
                    </Flex>
                </InputContainer>
            </RadioForm> */}
            <Bottom>
                <SignupButton disabled={loading && true} type="submit">{!loading ? 'Sign up': <span><img style={{height:'16px', width:'11px' }} src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/GsNJNwuI-UM.gif" alt="" /></span>}</SignupButton>
            </Bottom>
        </Form>
        </>
    )
}
export const ErrorHandler =(props)=>{
    const {error, message, errorType} = props
    if(error ){
        return (
            <><ErrorCarrier tabIndex="0" role="button"><Icon name="error-exclamation"  src="5" /></ErrorCarrier>
                <ErrorMessage className={errorType === "last-name" ? 'error-last-n' : ''}>
                    <ChevronContainer className={errorType === "last-name"? 'error--chevron-top': ''}>
                        <Typography as="span" style={{color:'#fff'}} Color="primary" text={message}/>
                    </ChevronContainer>
                </ErrorMessage>
            </>
        )
    }
    return null
}
const TopModal = styled.div`
    padding:16px 10px;
    position:relative;
    border-bottom: 1px solid #dadde1;
`
const ButtonContainer = styled.div`
    position:absolute;
    right:10px;
    top:12px;
`
const Inner = styled.div`
    position:relative;
    overflow:hidden;
    border-radius:555px;
    &:focus, &:active > *{
        transform: scale(0.9);
    }
  
`
const Form = styled.form`
    padding:16px;
`
export const InputContainer = styled.div`
    position:relative;
    background: #f5f6f7;
    border-radius:5px;
    width:100%;
    &.name{
        width:194px;
    }
    &.m-top-bottom{
        margin:0px 8px 10px 0px;
    }
    &.m-bottom{
        margin-bottom:10px;
    }
    &.radio{
        background: #fff;
        display:flex;
        padding:12px;
        & label{
            margin-right:5px;
        }
    }
    &.white-bg{
        background-color: #fff !important;
    }
    border: ${(props)=> !props.error? `1px solid #ccd0d5`: `1px solid red`};
    height:41px;
    & ${Flex}{
        width:100%;
    }
`
const Input = styled.input`
    width:100%;
    border-radius:inherit;
    outline:none;
    padding: 12px;
    height:100%;
    &.name{
        width:170px;
    }
    background:transparent;
    border:none;
    color: black;
    & [placeholder]{
        color: #8d949e;
        text-transform:capitalize;
    }
`

const ErrorMessage= styled.div`
    position:absolute;
    background: rgb(195, 80, 80);
    transform: translate(-106%, -18%);
    left: -1px;
    top:1px;
    width: 100%;
    max-width: 290px;
    border-radius:3px;
    border: 1px solid rgb(154, 61, 61);
    z-index:10;
    &.error-last-n{
        transform: translate(0%,123%);
        
    }
    opacity:0;
    transition:opacity ease-in-out 200ms;
`
const ErrorCarrier = styled.span`
    position:absolute;
    right:7px;
    top:7px;
    outline:none;
    & > i{
        transform: scale(.80);
        transition: opacity ease-in-out 100ms;
    }
    &:focus ~  ${ErrorMessage}{
        opacity:1;
    }
    &:focus > i{
        opacity:0;
    }
`
const ChevronContainer = styled.div`
    padding:10px;
    position:relative;
    &:after{
        content:'';
        position:absolute;
        height:15px;
        width:15px;
        background: rgb(195,80,80);
        transform: rotate(-45deg) ;
        right: -8px;
        top:39%;
        border-right: 1px solid rgb(154,61,61);
        border-bottom: 1px solid rgb(154,61,61);;
    }
    &.error--chevron-top:after{
        top: -8px !important;
        transform: rotate(-134deg);
        right: 50%;
    }
`
const RadioForm= styled.div`
   display:flex;
   
`
const RadioButton = styled.input`
    outline:none;
    background:transparent;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;


    & >.checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    &:checked ~ .checkmark {
        background-color: #2196F3;
    }

`
const Bottom = styled.div`
    padding: 10px 0px;
    width:100%;
    text-align:center;
`
const SignupButton = styled.button`
    outline:none;
    border:none;
    border-radius:6px;
    background-color: #00a400;
    padding: 0 32px;
    text-align:center;
    min-width: 194px;
    height: 36px;
    font-size:18px;
    font-weight:600;
    color:#fff;
    cursor:pointer;
    &:hover{
        background: linear-gradient(#79bc64, #578843);
    }
`