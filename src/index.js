import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./components/Context/AuthContext";
import CatchError from "./CatchError";
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
  document.getElementById("root")
);
