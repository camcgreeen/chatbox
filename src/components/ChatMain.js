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
      friendLastLoggedOut: "",
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
              <button className="toggle-nav" onClick={toggleNav}>
                Go to ChatNavigation
              </button>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div className="chat-main">
          <div className="chat-main__header">
            <button className="toggle-nav" onClick={toggleNav}>
              Go to ChatNavigation
            </button>
            <h1>{this.props.friendName}</h1>
            {/* {this.props.friendOnline
              ? " | (online_symbol) | Active"
              : ` | (offline_symbol) ${this.state.friendLastLoggedOut}`} */}
            {this.props.friendOnline ? (
              <div className="chat-main__header__friend">
                <div
                  className="chat-main__header__friend__symbol"
                  style={{ backgroundColor: "#6EFF7C" }}
                ></div>{" "}
                <p>Active now</p>
              </div>
            ) : (
              <div className="chat-main__header__friend">
                <div
                  className="chat-main__header__friend__symbol"
                  style={{ backgroundColor: "#838191" }}
                ></div>
                <p>{this.state.friendLastLoggedOut}</p>
              </div>
            )}
          </div>
          <div className="chat-main__body" id="chat-container">
            {chat.messages.map((message, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={
                      message.sender === email
                        ? "chat-main__body__message chat-main__body__message--user"
                        : "chat-main__body__message chat-main__body__message--friend"
                    }
                  >
                    {message.gifRef === null ? (
                      <>
                        <div
                          className={
                            message.sender === email
                              ? "message message--user"
                              : "message message--friend"
                          }
                        >
                          {message.message}
                        </div>
                        {/* <div className=""></div> */}
                      </>
                    ) : (
                      <img
                        src={message.gifRef}
                        alt=""
                        className={
                          message.sender === email
                            ? "message message--user"
                            : "message message--friend"
                        }
                      />
                    )}
                  </div>
                </>
              );
            })}
          </div>
          {this.checkFriendTyping(friendEmail, this.state.usersTyping) && (
            <div className="chat-main__body__message chat-main__body__message--friend">
              {"Friend is typing..."}
            </div>
          )}
          <ChatInput
            sendMessage={sendMessage}
            sendGif={this.props.sendGif}
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
    this.updateHeaderTimestamp(this.props.friendLastLoggedOut);
    setInterval(
      () => this.updateHeaderTimestamp(this.props.friendLastLoggedOut),
      60000
    );
    setTimeout(() => {
      const chatContainer = document.getElementById("chat-container");
      if (chatContainer) {
        chatContainer.scrollTo({
          left: 0,
          top: chatContainer.scrollHeight,
          behaviour: "auto",
        });
      }
    }, 800);
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.chat !== undefined && this.props.chat !== undefined) {
      if (prevProps.friendLastLoggedOut !== this.props.friendLastLoggedOut) {
        this.updateHeaderTimestamp(this.props.friendLastLoggedOut);
      }
      if (prevProps.chat.messages.length < this.props.chat.messages.length) {
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer) {
          chatContainer.scrollTo({
            left: 0,
            top: chatContainer.scrollHeight,
            behaviour: "smooth",
          });
        }
      }
    }
  };
  updateHeaderTimestamp = (timestamp) => {
    const friendLastLoggedOut = this.convertHeaderTimestamp(timestamp);
    this.setState({ friendLastLoggedOut });
  };
  convertHeaderTimestamp = (timestamp) => {
    if (timestamp) {
      const hourMs = 3600000;
      const dayMs = 86400000;
      const weekMs = 604800000;
      const yearMs = 31540000000;

      const difference = Date.now() - timestamp;
      // const difference = yearMs;

      let plural;
      let dateString;
      let dateArray;
      let dateFormatted;

      switch (true) {
        case difference < hourMs:
          const differenceMins = Math.ceil(difference / 1000 / 60);
          plural = differenceMins >= 2;
          return `${differenceMins} ${plural ? "mins" : "min"} ago`;
        case difference < dayMs:
          const differenceHours = Math.round(difference / 1000 / 60 / 60);
          plural = differenceHours >= 2;
          return `${differenceHours} ${plural ? "hours" : "hour"} ago`;
        case difference < weekMs:
          dateString = new Date(timestamp).toString();
          return `${dateString.split(" ")[0]}`;
        case difference < yearMs:
          dateString = new Date(timestamp).toString();
          dateArray = dateString.split(" ");
          dateFormatted = [dateArray[0], dateArray[1], dateArray[2]].join(" ");
          return `${dateFormatted}`;
        case difference >= yearMs:
          dateString = new Date(timestamp).toString();
          dateArray = dateString.split(" ");
          dateFormatted = [
            dateArray[0],
            dateArray[1],
            dateArray[2],
            dateArray[3],
          ].join(" ");
          return `${dateFormatted}`;
        default:
          //
          return "";
      }
    }
  };
}

export default ChatMain;
