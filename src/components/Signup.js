import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
// import { disableRightMiddleClick } from "../utilities/helper";
// import "./main.scss";
const firebase = require("firebase");

class Signup extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="authentication">
          <h1 className="authentication__h1">Sign up</h1>
          <form className="authentication__form">
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="confirm password" />
            <h4 className="error-text"></h4>
            <button className="authentication__form__submit btn btn--submit">
              Sign up
            </button>
          </form>
          <h5 className="account">
            Already have an account?{" "}
            <Link
              to="/login"
              className="account__link"
              // style={{ textDecoration: "none", color: "#6937FF" }}
            >
              Login
            </Link>
          </h5>
        </div>
      </>
    );
  }
}

export default Signup;
