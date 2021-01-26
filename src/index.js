import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import "./main.scss";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserAuthentication from "./components/UserAuthentication";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBLPfFC6AT9gHnm4rLP4qJPefL2IP2t3Wk",
  authDomain: "chatbox-7b75a.firebaseapp.com",
  projectId: "chatbox-7b75a",
  storageBucket: "chatbox-7b75a.appspot.com",
  messagingSenderId: "1068497569992",
  appId: "1:1068497569992:web:cd34fe942f7f080087bdfd",
});

const routing = (
  <BrowserRouter>
    <div id="routing-container">
      {/* <Switch> */}
      <div className="user-authentication-container">
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
      </div>
      <div className="dashboard-container">
        <Route path="/dashboard" component={Dashboard}></Route>
      </div>
      {/* </Switch> */}
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>{routing}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
