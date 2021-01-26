import React from "react";
// import { disableRightMiddleClick } from "../utilities/helper";
import "../main.scss";
import "./ChatMain.scss";
const firebase = require("firebase");

class ChatMain extends React.Component {
  render() {
    return (
      <div className="chat-main">
        ChatMain
        <button
          className="chat-main__toggle-nav"
          onClick={this.props.toggleNav}
        >
          Go to ChatNavigation
        </button>
      </div>
    );
  }
}

export default ChatMain;
