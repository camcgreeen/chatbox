import React from "react";
import "../main.scss";
import "./ChatInput.scss";

class ChatInput extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
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
          onFocus={this.userClickedInput}
        />
        <button className="btn btn--send-message" onClick={this.sendMessage}>
          Send
        </button>
      </div>
    );
  }
  handleUserInput = (e) => {
    e.keyCode === 13
      ? this.sendMessage()
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
