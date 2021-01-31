import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
// import { disableRightMiddleClick } from "../utilities/helper";
// import "./main.scss";
const firebase = require("firebase");

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      // nickname: null,
      nameFirst: null,
      nameLast: null,
      signupError: "",
    };
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="authentication">
          <h1 className="authentication__h1">Sign up</h1>
          <form
            className="authentication__form"
            onSubmit={(e) => this.submitSignup(e)}
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
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => this.handleUserInput("passwordConfirmation", e)}
            />
            <input
              type="text"
              placeholder="first name"
              onChange={(e) => this.handleUserInput("nameFirst", e)}
            />
            <input
              type="text"
              placeholder="last name"
              onChange={(e) => this.handleUserInput("nameLast", e)}
            />
            <h4 className="error-text">
              {this.state.signupError ? this.state.signupError : null}
            </h4>
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
  checkNameValid = (name) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
  };
  formIsValid = () =>
    this.state.password === this.state.passwordConfirmation &&
    this.state.email !== null &&
    this.state.password !== null &&
    this.state.passwordConfirmation !== null &&
    this.state.nameFirst !== null &&
    this.state.nameSecond !== null &&
    this.checkNameValid(this.state.nameFirst) &&
    this.checkNameValid(this.state.nameLast);
  handleUserInput = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "passwordConfirmation":
        this.setState({ passwordConfirmation: e.target.value });
        break;
      case "nameFirst":
        this.setState({ nameFirst: e.target.value });
        break;
      case "nameLast":
        this.setState({ nameLast: e.target.value });
        break;
      default:
        break;
    }
  };
  submitSignup = (e) => {
    e.preventDefault();
    if (!this.formIsValid()) {
      switch (true) {
        case this.state.email === null:
          this.setState({ signupError: "You must enter an email address" });
          return;
        case this.state.password === null:
          this.setState({ signupError: "You must enter a password" });
          return;
        case this.state.password !== this.state.passwordConfirmation:
          this.setState({ signupError: "Passwords do not match" });
          return;
        case this.state.nickname === null:
          this.setState({ signupError: "You must enter a nickname" });
          return;
        case !this.checkNicknameValid(this.state.nickname):
          this.setState({ signupError: "Nickname must only include letters." });
          return;
      }
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email.toLowerCase(),
        this.state.password
      )
      .then(
        (authRes) => {
          const userObj = {
            email: authRes.user.email,
            // firstName: this.state.firstName,
            // lastName: this.state.lastName,
            // nickname: this.state.nickname,
            nameFirst: this.state.nameFirst,
            nameLast: this.state.nameLast,
            lastLoggedOut: null,
            online: false,
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email.toLowerCase())
            .set(userObj)
            .then(
              async () => {
                this.props.history.push("/dashboard");
              },
              (dbError) => {
                this.setState({ signupError: "Failed to add user" });
              }
            );
        },
        (authError) => {
          this.setState({ signupError: authError.message });
        }
      );
  };
}

export default Signup;
