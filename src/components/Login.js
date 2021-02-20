import React from "react";
import Navbar from ".//Navbar";
import { Link } from "react-router-dom";
import { disableRightMiddleClick } from "../utilities/helpers";
import "../main.scss";
import "./FormAuthentication.scss";

const firebase = require("firebase");

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: "",
    };
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="authentication">
          <h1 className="authentication__h1">Log in</h1>
          <form
            className="authentication__form"
            onSubmit={(e) => this.submitLogin(e)}
          >
            <input
              type="text"
              placeholder="email"
              autoFocus
              onChange={(e) => this.handleUserInput("email", e)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => this.handleUserInput("password", e)}
            />
            <h4 className="error-text">
              {this.state.loginError ? this.state.loginError : null}
            </h4>
            <button className="authentication__form__submit btn btn--submit">
              Log in
            </button>
          </form>
          <h5 className="account">
            Don't have an account?{" "}
            <Link to="/signup" className="account__link">
              Sign up
            </Link>
          </h5>
        </div>
      </>
    );
  }
  componentDidMount = () => {
    disableRightMiddleClick();
  };
  handleUserInput = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };
  submitLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.email.toLowerCase(),
        this.state.password
      )
      .then(
        () => {
          this.props.history.push("/dashboard");
        },
        (err) => {
          this.setState({ loginError: err.message });
        }
      );
  };
}

export default Login;
