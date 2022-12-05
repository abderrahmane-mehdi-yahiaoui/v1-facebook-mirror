import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from './Context/AuthContext'
export default function PrivateRoute({component : Component,isPrivate, ...rest}) {
    const {currentUser} = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser && isPrivate ? <Component {...props} />:
                <Redirect to="/login" />
            }}
        >
        </Route>
    )
}


