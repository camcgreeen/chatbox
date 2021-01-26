import React from "react";
// import { disableRightMiddleClick } from "../utilities/helper";
import "../main.scss";
import "./ChatNavigation.scss";
const firebase = require("firebase");

class ChatNavigation extends React.Component {
  render() {
    return (
      <div
        className="chat-navigation"
        // style={{ zIndex: this.props.zIndexValue }}
        style={{ left: this.props.leftValue }}
      >
        ChatNavigation{" "}
        <button
          className="chat-navigation__toggle-nav"
          onClick={this.props.toggleNav}
        >
          Go to ChatMain
        </button>
      </div>
    );
  }
}

export default ChatNavigation;
