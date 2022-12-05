import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'
import Login from './components/Logins'
import {Home, Bookmarks, Profile} from './pages'
import PageNotFound from './pages/PageNotFound'
import './ressources/styles/App.css'
import { useAuth } from './components/Context/AuthContext'
import { PostProvider } from './components/Context/PostContext'
import PrivateRoute from './components/PrivateRoute'
export function App() {
  const { currentUser } = useAuth()
  
  return (
    <PostProvider>
        <div className="app">
          <div className="app__body">
            <Switch>
              <PrivateRoute isPrivate exact path="/bookmarks" component={Bookmarks} />
            
              <PrivateRoute isPrivate path="/profile/:uid" component={Profile} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute isPrivate exact path="/" component={Home} />
              <PrivateRoute isPrivate path="*" component={PageNotFound}  />
            </Switch>
          </div>
      </div>
    </PostProvider>
    

  )
}




