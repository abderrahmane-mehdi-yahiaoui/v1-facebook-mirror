import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/Context/AuthContext'
import CatchError from './CatchError'
ReactDOM.render(
  <React.StrictMode>
    <CatchError>
      <AuthProvider>
        <Router>
          <App />
        </Router>
    </AuthProvider>
    </CatchError>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
