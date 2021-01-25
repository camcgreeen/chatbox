import React from "react";
import Navbar from ".//Navbar";
import { Link } from "react-router-dom";
// import { disableRightMiddleClick } from "../utilities/helper";
import "../main.scss";
import "./FormAuthentication.scss";
const firebase = require("firebase");

class Login extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="authentication">
          <h1 className="authentication__h1">Log in</h1>
          <form className="authentication__form">
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <h4 className="error-text"></h4>
            <button className="authentication__form__submit btn btn--submit">
              Log in
            </button>
          </form>
          <h5 className="account">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="account__link"
              // style={{ textDecoration: "none", color: "#6937FF" }}
            >
              Sign up
            </Link>
          </h5>
        </div>
      </>
    );
  }
}

export default Login;
