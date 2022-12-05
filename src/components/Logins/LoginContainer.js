import React, { useState, useRef } from 'react'
import { Link , useHistory} from 'react-router-dom'
import './loginContainer.css'
import { useAuth } from '../Context/AuthContext';
import {Modal} from '../Modal'

import styled from 'styled-components'
import Signup, {ErrorHandler} from './Signup';

function LoginContainer() {

    const [error, setError] = useState()
    const [email, setEmail]=useState(null)
    const [emailError, setEmailError]=useState({message:'', state:false})
    const [password, setPassword]=useState(null)
    const [passwordError, setPasswordError]=useState({message:'', state:false})
    const [loading, setLoading] = useState(false)   
    const history = useHistory()

    const handleEmailChange=e=>{
        const value = e.target.value
        if(value === null || value === ''){
            setEmailError({
                message:'Email field cannot be empty',
                state:true
            })
            setError(true)
        }
        if(value !== null || value !== ''){
            setEmail(value)
            setError(false)
            setEmailError({
                message:'',
                state:false
            })
        }
        else{
            setError(true)
            setEmailError({
                message:'An error occured, please try again',
                state:true
            })
        }
    }
    const handlePassordChange=e=>{
        const value = e.target.value
        if(value === null || value === ''){
            setPasswordError({
                message:'Password field cannot be empty.',
                state:true
            })
            setError(true)
        }
        if(value !== null || value !== ''){
            setPassword(value)
            setError(false)
            setPasswordError({
                message:'',
                state:false
            })
        }
        else{
            setError(true)
            setPasswordError({
                message:'An error occured, please try again',
                state:true
            })
        }
    }

    const { login } = useAuth()
    function handleSubmit(e) {
        e.preventDefault() 
        if(password === null || password === ''){
            
            setError(true)
            setPasswordError({
                message:'Password field cannot be empty.',
                state:true
            })
        }
        if(email === null ){
            setError(true)
            setEmailError({
                message:'Email field cannot be empty.',
                state:true
            })
        }
        
        try{
            if(!error){
                setLoading(true)
                login(email, password).then(()=>{
                    history.push('/')
                    setLoading(false)
                    setError('')    
                    setLoading(false)
                    setPasswordError({state:false, message:''})
                    setEmailError({state:false, message:''})
                    setEmail(null)
                    setPasswordError(null)
                })
            }
        }catch(error){
            setError(true)
            console.log(error)
            setLoading(false)
            return
        }
        
    }
    // function signinWithGoogle(e){
    //     e.preventDefault()
    //     try{
    //         setError("")
    //         setLoading(true)
    //         loginWithGoogle()
            
    //         history.push('/')
    //     }catch(error){
    //         setError("failed to log in with google", error)
    //         console.log(error)
    //     }
    //     setLoading(false)
    // }
    const registerRef = useRef()
    const openModal=()=>{
        registerRef.current.openModal()
        document.body.classList.add('no-scroll')
    }
    const closeModal=()=>{
        registerRef.current.closeModal()
        document.body.classList.remove('no-scroll')
    }
    return (
        <>
        <div className='rightContainer'>
            <div className='login__container'>
                {error && <div>{error}</div>}
                <div className='top__container'>
                    <form onSubmit={!loading ? handleSubmit: undefined } className="flex flex-column ">
                        <InputContainer error={emailError.state}>
                            <Input
                                type='text'
                                className='login__input  '
                                placeholder='Email or Phone number'
                                onChange={handleEmailChange}
                                onBlur={handleEmailChange}
                                name="email"
                            />
                            <ErrorHandler error={
                                emailError.state
                                } 
                                
                                message={emailError.message}
                            />
                        </InputContainer>
                        <InputContainer error={passwordError.state}>
                            <Input
                                type='password'
                                className='login__input  '
                                placeholder='Password'
                                onChange={handlePassordChange}
                                onBlur={handlePassordChange}
                                name="password"
                            />
                            <ErrorHandler error={
                                passwordError.state
                                } 
                                
                                message={passwordError.message}
                            />
                        </InputContainer>
                       

                        <button type="submit"  className='login__button  button mb-5'>
                            Login
                        </button>
                    </form>
                    {/* <button style={{background:"blue"}} onClick={signinWithGoogle} className='login__button  button mb-5'>
                        
                            Login with Google
                    </button> */}
                    <div className='middleSection'>
                        <a
                            className='link'
                            href='/'>
                            forgot password?
                        </a>
                    </div>

                </div>
                <div className='bottom__container'>
                    <button
                        className='signUp__button  button'
                        onClick={openModal}

                        style={{background:"green"}}
                    >
                        create new account
                    </button>
                </div>
            </div>
            
        </div>
        <Modal ref={registerRef} neutral width={423} >
            <Signup closeModal={closeModal} />
        </Modal>
        </>
    )
}
export default LoginContainer;
const InputContainer= styled.div`
    position: relative;
    background: #fff;
    border-radius: 5px;
    width: 100%;
    border: ${(props)=> !props.error? `1px solid #ccd0d5`: `1px solid red`};
    margin-bottom:6px;
`
const Input = styled.input`
    width:100%;
    padding: 14px 16px;
    height:45px;
    color:#1d2129;
`