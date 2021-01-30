import React from "react";
import "../main.scss";
import "./ChatInput.scss";

const firebase = require("firebase");

class ChatInput extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      userTyping: false,
    };
  }
  render() {
    return (
      <div className="chat-input">
        <input
          type="text"
          onKeyUp={this.handleUserInput}
          placeholder="Type a message..."
          id="chat-input"
          className="chat-input__input"
          onBlur={() => this.setState({ userTyping: false })}
          onFocus={this.userClickedInput}
        />
        <button className="btn btn--send-message" onClick={this.sendMessage}>
          Send
        </button>
      </div>
    );
  }
  componentDidUpdate = async (prevProps, prevState) => {
    const docKey = this.buildDocKey();
    const userEmails = docKey.split(":");
    const userIndex = userEmails.findIndex((user) => user === this.props.email);
    if (this.props.chat !== undefined) {
      if (!prevState.userTyping && this.state.userTyping) {
        console.log("user now typing");
        this.updateTypingStatus(userIndex, true, docKey);
      } else if (prevState.userTyping && !this.state.userTyping) {
        console.log("user stopped typing");
        this.updateTypingStatus(userIndex, false, docKey);
      }
    }
  };
  updateTypingStatus = (index, status, docKey) => {
    if (index === 0) {
      console.log("user1Typing");
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ user1Typing: status });
    } else if (index === 1) {
      console.log("user2Typing");
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ user2Typing: status });
    }
  };
  buildDocKey = () =>
    [this.props.email, this.props.friendEmail].sort().join(":");
  // handleUserInput = async (e) => {
  //   if (!this.state.userTyping) {
  //     await this.setState({ userTyping: true });
  //   }
  //   e.keyCode === 13
  //     ? this.sendMessage()
  //     : this.setState({ inputText: e.target.value });
  // };
  handleUserInput = async (e) => {
    if (!this.state.userTyping) {
      await this.setState({ userTyping: true });
    }
    e.keyCode === 13
      ? this.setState(
          { inputText: e.target.value, userTyping: false },
          this.sendMessage()
        )
      : this.setState({ inputText: e.target.value });
  };
  messageValid = (text) => text && text.replace(/\s/g, "").length;
  sendMessage = () => {
    if (this.messageValid(this.state.inputText)) {
      this.props.sendMessage(this.state.inputText);
      document.getElementById("chat-input").value = "";
    }
  };
  userClickedInput = () => this.props.markMessageAsRead();
}

export default ChatInput;
