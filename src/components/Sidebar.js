import React from "react";
// import { disableRightMiddleClick } from "../utilities/helper";
import "../main.scss";
import "./Sidebar.scss";
const firebase = require("firebase");

class Sidebar extends React.Component {
  render() {
    if (this.props.selectedChat === null) {
      if (this.props.newChatFormVisible) {
        return <div className="sidebar">Start a new chat</div>;
      } else {
        return <div className="sidebar">No chat selected</div>;
      }
    } else {
      return (
        <div className="sidebar">your chat with {this.props.friendEmail}</div>
      );
    }
  }
}

export default Sidebar;
