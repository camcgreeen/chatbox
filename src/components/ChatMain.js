import React from "react";
// import { disableRightMiddleClick } from "../utilities/helper";
import ChatInput from "./ChatInput";
import NewChat from "./NewChat";
import "../main.scss";
import "./ChatMain.scss";

const firebase = require("firebase");

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersTyping: [],
    };
  }
  render() {
    const {
      toggleNav,
      chat,
      email,
      friendEmail,
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
            <h1>
              Your conversation with{" "}
              {chat.users.filter((user) => user !== email)[0]}
            </h1>
            {this.props.friendOnline
              ? " | (online_symbol) | Active"
              : ` | (offline_symbol) ${this.props.friendLastLoggedOut}`}
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
          {this.checkFriendTyping(friendEmail, this.state.usersTyping) && (
            <div className="chat-main__message chat-main__message--friend">
              {"Friend is typing..."}
            </div>
          )}
          <ChatInput
            sendMessage={sendMessage}
            markMessageAsRead={this.props.markMessageAsRead}
            chat={this.props.chat}
            email={this.props.email}
            friendEmail={this.props.friendEmail}
          />
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
  findUsersTyping = () => {
    firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", this.props.email)
      .onSnapshot((result) => {
        const chats = result.docs.map((document) => document.data());
        const usersTyping = [];
        chats.forEach((chat) => {
          const userTypingObj = {};
          userTypingObj[chat.users[0]] = chat.user1Typing;
          userTypingObj[chat.users[1]] = chat.user2Typing;
          usersTyping.push(userTypingObj);
        });
        this.setState({ usersTyping });
      });
  };
  checkFriendTyping = (friend, usersTyping) => {
    for (let obj of usersTyping) {
      if (obj[friend]) {
        return true;
      }
    }
    return false;
  };
  buildDocKey = () =>
    [this.props.email, this.props.friendEmail].sort().join(":");
  componentDidMount = () => {
    setTimeout(this.findUsersTyping, 2000);
  };
  componentDidUpdate = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
  };
}

export default ChatMain;
