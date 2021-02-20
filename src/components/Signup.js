import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { disableRightMiddleClick } from "../utilities/helpers";
import "../main.scss";

const firebase = require("firebase");

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
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
            <Link to="/login" className="account__link">
              Login
            </Link>
          </h5>
        </div>
      </>
    );
  }
  componentDidMount = () => {
    disableRightMiddleClick();
  };
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
        case this.state.nameFirst === null:
          this.setState({ signupError: "You must enter a first name" });
          return;
        case this.state.nameLast === null:
          this.setState({ signupError: "You must enter a last name" });
          return;
        case !this.checkNameValid(this.state.nickname):
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
            nameFirst: this.state.nameFirst,
            nameLast: this.state.nameLast,
            lastLoggedOut: null,
            online: false,
            profilePictureUrl: "https://i.imgur.com/ZtGfcXy.png",
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email.toLowerCase())
            .set(userObj)
            .then(
              () => {
                const camEmail = "c.c.green@outlook.com";
                const chatCamUsers = [camEmail, this.state.email].sort();
                const chatCamDocKey = chatCamUsers.join(":");
                const chatCamObj = {
                  messages: [
                    {
                      gifRef: null,
                      message: "Hey there! 👋",

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 7,
                    },
                    {
                      gifRef: null,
                      message:
                        "Welcome to Chatbox, a real-time chat application built with React and Firebase",

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 6,
                    },
                    {
                      gifRef:
                        "https://media4.giphy.com/media/p6P5KdqRljCrVoZj79/giphy.gif?cid=054422c3eurumthxw6z3v80yrujtkke22l1c4uwyzgeqd7f3&rid=giphy.gif",
                      message: null,

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 5,
                    },
                    {
                      gifRef: null,
                      message: "I'm Cam Green, the creator of this app",

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 4,
                    },
                    {
                      gifRef: null,
                      message:
                        "I have included some dummy chats to show you the functionality of the app as it turns out it’s quite hard to demo a chat application without lots of users!",

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 3,
                    },
                    {
                      gifRef: null,
                      message:
                        "Click on one these chats in the chat list to the side or send a nice message to a friend using their email address with the + button (the friend must also have signed up on Chatbox)",

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 2,
                    },
                    {
                      gifRef: null,
                      message:
                        "Feel free to contact me right here, or on my email address mailto:hello@camgreen.works, and I will get back to you as soon as I can! 😀",

                      sender: camEmail,
                      timestamp: Date.now(),
                    },
                  ],
                  receiverHasRead: false,
                  user1Typing: false,
                  user2Typing: false,
                  users: chatCamUsers,
                };
                firebase
                  .firestore()
                  .collection("chats")
                  .doc(chatCamDocKey)
                  .set({ ...chatCamObj })
                  .then(() => {
                    const janeEmail = "jane.doe@gmail.com";
                    const chatJaneUsers = [janeEmail, this.state.email].sort();
                    const chatJaneDocKey = chatJaneUsers.join(":");
                    const chatJaneObj = {
                      messages: [
                        {
                          gifRef: null,
                          message:
                            "I'm here to tell you that you can send emojis with the emoji button, like this:",

                          sender: janeEmail,
                          timestamp: Date.now() - 60000 * 23,
                        },
                        {
                          gifRef: null,
                          message: "😁😁😁",

                          sender: janeEmail,
                          timestamp: Date.now() - 60000 * 22,
                        },
                        {
                          gifRef: null,
                          message:
                            "You can send GIFs with the GIF icon button, using the Giphy API",

                          sender: janeEmail,
                          timestamp: Date.now() - 60000 * 21,
                        },
                        {
                          gifRef:
                            "https://media0.giphy.com/media/8Iv5lqKwKsZ2g/giphy.gif?cid=054422c3esjdb7maxup41cz0uudxss9dcpn41a9h97r4b5vu&rid=giphy.gif",
                          message: null,

                          sender: janeEmail,
                          timestamp: Date.now() - 60000 * 20,
                        },
                      ],
                      receiverHasRead: false,
                      user1Typing: false,
                      user2Typing: false,
                      users: chatJaneUsers,
                    };
                    firebase
                      .firestore()
                      .collection("chats")
                      .doc(chatJaneDocKey)
                      .set({ ...chatJaneObj })
                      .then(() => {
                        const johnEmail = "john.bellamy@gmail.com";
                        const chatJohnUsers = [
                          johnEmail,
                          this.state.email,
                        ].sort();
                        const chatJohnDocKey = chatJohnUsers.join(":");
                        const chatJohnObj = {
                          messages: [
                            {
                              gifRef: null,
                              message:
                                "To show you the *other user is typing* feature, my isTyping flag has been set to true for the rest of eternity",

                              sender: johnEmail,
                              timestamp: Date.now() - 60000 * 27,
                            },
                            {
                              gifRef: null,
                              message: "Tiring!",

                              sender: johnEmail,
                              timestamp: Date.now() - 60000 * 26,
                            },
                            {
                              gifRef: null,
                              message: "Below is the typing indicator 👇",

                              sender: johnEmail,
                              timestamp: Date.now() - 60000 * 25,
                            },
                          ],
                          receiverHasRead: false,
                          user1Typing: true,
                          user2Typing: true,
                          users: chatJohnUsers,
                        };
                        firebase
                          .firestore()
                          .collection("chats")
                          .doc(chatJohnDocKey)
                          .set({ ...chatJohnObj })
                          .then(() => {
                            this.props.history.push("/dashboard");
                          });
                      });
                  });
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
