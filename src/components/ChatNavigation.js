import React from "react";
// import { disableRightMiddleClick } from "../utilities/helper";
import "../main.scss";
import "./ChatNavigation.scss";
const firebase = require("firebase");

class ChatNavigation extends React.Component {
  render() {
    const chatsToOrder = [...this.props.chats];
    const orderedChats = chatsToOrder.sort(
      (a, b) =>
        b.messages[b.messages.length - 1].timestamp -
        a.messages[a.messages.length - 1].timestamp
    );
    if (this.props.chats.length > 0) {
      return (
        <div
          className="chat-navigation"
          // style={{ zIndex: this.props.zIndexValue }}
          style={{ left: this.props.leftValue }}
        >
          <button onClick={this.props.logOut}>Log out</button>
          <main className="chat-navigation__section">
            <ul className="chat-navigation__section__chats">
              {orderedChats.map((chat, index) => {
                return (
                  <li
                    key={index}
                    className="chat-navigation__section__chats__chat"
                    // onClick={() => this.selectChat(index)}
                    onClick={() =>
                      this.selectChat(
                        this.props.chats.findIndex(
                          (element) => element === orderedChats[index]
                        )
                      )
                    }
                  >
                    <div
                      className="chat_navigation__section__chats__chat__avatar"
                      style={{
                        fontWeight:
                          !chat.receiverHasRead && !this.userSentMessage(chat)
                            ? 700
                            : 400,
                      }}
                    >
                      {
                        // chat.users
                        //   .filter((user) => user !== this.props.email)[0]
                        //   .split("")[0]
                        chat.users.filter(
                          (user) => user !== this.props.email
                        )[0]
                      }
                    </div>
                    <div className="chat-navigation__section__chats__chat__message">
                      <>
                        {/* {chat.messages[
                          chat.messages.length - 1
                        ].message.substring(0, 30)} */}
                        {chat.messages[chat.messages.length - 1].message !==
                        null
                          ? chat.messages[
                              chat.messages.length - 1
                            ].message.substring(0, 30)
                          : "GIF"}
                      </>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button className="btn btn--new-chat" onClick={this.newChat}>
              New chat
            </button>
          </main>
          {/* <button
            className="chat-navigation__toggle-nav"
            onClick={this.props.toggleNav}
          >
            Go to ChatMain
          </button> */}
        </div>
      );
    } else {
      return (
        <div className="chat-navigation">
          <button onClick={this.props.logOut}>Log out</button>
          <main className="chat-navigation__section">
            <button className="btn btn--new-chat" onClick={this.newChat}>
              New chat
            </button>
          </main>
        </div>
      );
    }
  }
  newChat = () => {
    this.props.newChat();
  };
  selectChat = (index) => {
    this.props.selectChat(index);
    this.props.toggleNav();
  };
  userSentMessage = (chat) =>
    chat.messages[chat.messages.length - 1].sender === this.props.email;
}

export default ChatNavigation;
