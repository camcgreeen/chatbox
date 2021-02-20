import React from "react";
import "../main.scss";
import "./NewChat.scss";

const firebase = require("firebase");

class NewChat extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      message: null,
      newChatError: "",
    };
  }
  render() {
    return (
      <div className="new-chat">
        <svg
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="new-chat__back"
          onClick={this.props.toggleNav}
        >
          <circle cx="10" cy="10" r="10" fill="#F0F0F5" />
          <g clip-path="url(#clip0)">
            <path
              d="M7.35627 9.50495L11.6561 5.20524C11.9296 4.93159 12.3731 4.93159 12.6465 5.20524C12.9199 5.47865 12.9199 5.9221 12.6465 6.19549L8.8418 10.0001L12.6464 13.8045C12.9198 14.078 12.9198 14.5214 12.6464 14.7949C12.373 15.0684 11.9295 15.0684 11.656 14.7949L7.35616 10.4951C7.21946 10.3583 7.15118 10.1792 7.15118 10.0001C7.15118 9.82085 7.21959 9.64165 7.35627 9.50495Z"
              fill="#221E41"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="10"
                height="10"
                fill="white"
                transform="translate(15 15) rotate(-180)"
              />
            </clipPath>
          </defs>
        </svg>
        <h1 className="new-chat__h1">Start a new chat</h1>
        <form className="new-chat__form" onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="friend's email"
            onChange={(e) => this.handleUserInput("email", e)}
          />
          <input
            type="text"
            placeholder="enter your message..."
            onChange={(e) => this.handleUserInput("message", e)}
          />
          <h4 className="error-text-new-chat">
            {this.state.newChatError ? this.state.newChatError : null}
          </h4>
          <button className="new-chat__submit btn btn--submit">Submit</button>
        </form>
      </div>
    );
  }
  handleUserInput = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "message":
        this.setState({ message: e.target.value });
        break;
    }
  };
  handleFormSubmit = async (e) => {
    e.preventDefault();
    const userExists = await this.checkUserExists();
    const notCurrentUser = this.state.email !== this.props.email;
    const messageValid = this.messageValid(this.state.message);
    if (userExists) {
      if (notCurrentUser) {
        if (messageValid) {
          const chatExists = await this.checkChatExists();
          chatExists ? this.navigateToChat() : this.createNewChat();
        } else {
          this.setState({ newChatError: "Cannot send an empty message." });
        }
      } else {
        this.setState({ newChatError: "Cannot send a message to yourself" });
      }
    } else {
      this.setState({ newChatError: "User does not exist." });
    }
  };
  messageValid = (text) => text && text.replace(/\s/g, "").length;
  navigateToChat = () =>
    this.props.navigateToChat(this.buildDocKey(), this.state.message);
  createNewChat = () => {
    this.props.createNewChat({
      sendTo: this.state.email,
      message: this.state.message,
    });
  };
  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.email]
      .sort()
      .join(":");
  };
  checkChatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    return chat.exists;
  };
  checkUserExists = async () => {
    const snapshot = await firebase.firestore().collection("users").get();
    const exists = snapshot.docs
      .map((_doc) => _doc.data().email)
      .includes(this.state.email);
    return exists;
  };
}

export default NewChat;
