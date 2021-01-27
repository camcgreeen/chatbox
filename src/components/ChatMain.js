import React from "react";
// import { disableRightMiddleClick } from "../utilities/helper";
import ChatInput from "./ChatInput";
import NewChat from "./NewChat";
import "../main.scss";
import "./ChatMain.scss";

const firebase = require("firebase");

class ChatMain extends React.Component {
  render() {
    const {
      toggleNav,
      chat,
      email,
      newChatFormVisible,
      sendMessage,
    } = this.props;
    if (chat === undefined) {
      return (
        <div className="chat-main">
          {newChatFormVisible ? (
            <NewChat
              navigateToChat={this.props.navigateToChat}
              createNewChat={this.props.createNewChat}
            />
          ) : (
            <>
              ChatMain
              <button className="chat-main__toggle-nav" onClick={toggleNav}>
                Go to ChatNavigation
              </button>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div className="chat-main" id="chat-container">
          ChatMain
          <button className="chat-main__toggle-nav" onClick={toggleNav}>
            Go to ChatNavigation
          </button>
          <div className="chat-main__header">
            Your conversation with{" "}
            {chat.users.filter((user) => user !== email)[0]}
          </div>
          {chat.messages.map((message, index) => {
            return (
              <>
                <div
                  key={index}
                  className={
                    message.sender === email
                      ? "chat-main__message chat-main__message--user"
                      : "chat-main__message chat-main__message--friend"
                  }
                >
                  {message.message}
                </div>
              </>
            );
          })}
          <ChatInput sendMessage={sendMessage} />
        </div>
      );
    }
    // return (
    //   <div className="chat-main">
    //     ChatMain
    //     <button
    //       className="chat-main__toggle-nav"
    //       onClick={this.props.toggleNav}
    //     >
    //       Go to ChatNavigation
    //     </button>
    //   </div>
    // );
  }
  componentDidUpdate = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
  };
}

export default ChatMain;
