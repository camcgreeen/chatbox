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
          <h4 className="error-text">
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
    const messageValid = this.messageValid(this.state.message);
    if (userExists) {
      if (messageValid) {
        const chatExists = await this.checkChatExists();
        chatExists ? this.navigateToChat() : this.createNewChat();
      } else {
        this.setState({ newChatError: "Cannot send an empty message." });
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
    console.log(chat.exists);
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
