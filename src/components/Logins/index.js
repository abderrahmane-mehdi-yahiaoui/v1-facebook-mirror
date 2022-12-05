import React, {useEffect} from 'react'
import LoginContainer from './LoginContainer'
import { Redirect } from 'react-router-dom'
import './login.css'
import {useAuth} from '../Context/AuthContext'
// import UseClickOutside from '../Hooks/UseClickOutside'
function Login(props) {
    const { currentUser } = useAuth()
    useEffect(()=>{
        if(!currentUser){
            document.title = ` Facebook Clone | Login`
        }
    return() => document.title='Facebook Clone'
    
}, [currentUser])
    if(!currentUser){
        return(
        <div className='f__login'>
            <div className='f__loginTop'>
                <div className='f__brand'>
                    <img
                        src="../ressources/images/facebookLogo.svg"
                        srcSet='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'
                        alt='facebook'
                    />
                </div>
                <h2 className='f__loginInfo'>
                    Connect with friends and the world around you on Facebook.
                </h2>
            </div>
            <LoginContainer />
        </div>)
    }
    return <Redirect to="/" />
}

export default Login
