import React from "react";
import { Picker } from "emoji-mart";
import ReactGiphySearchbox from "react-giphy-searchbox";
import "emoji-mart/css/emoji-mart.css";
import "../main.scss";
import "./ChatInput.scss";

const firebase = require("firebase");

class ChatInput extends React.Component {
  constructor() {
    super();
    this.refEmoji = React.createRef();
    this.state = {
      inputText: "",
      userTyping: false,
      showEmojiPicker: false,
      showGifPicker: false,
    };
  }
  render() {
    const emojiPickerStyle = {
      position: "absolute",
      bottom: 100,
      left: 24,
      // animation: "none !important",
      opacity: this.state.showEmojiPicker ? 1 : 0,
      pointerEvents: this.state.showEmojiPicker ? "all" : "none",
    };
    const gifPickerStyle = {
      position: "absolute",
      bottom: 100,
      left: 76,
      // animation: "none !important",
      opacity: this.state.showGifPicker ? 1 : 0,
      pointerEvents: this.state.showGifPicker ? "all" : "none",
    };
    return (
      <div className="chat-input">
        {/* <button
          className="btn"
          variant="contained"
          color="primary"
          type="submit"
          onClick={() =>
            this.setState({
              showEmojiPicker: !this.state.showEmojiPicker,
              showGifPicker: false,
            })
          }
        >
          Emoji
        </button> */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="chat-input__emoji"
          // tabIndex="0"
          // onBlur={() => this.setState({ showEmojiPicker: false })}
          // onClick={() =>
          //   this.setState({
          //     showEmojiPicker: !this.state.showEmojiPicker,
          //     showGifPicker: false,
          //   })
          // }
        >
          <path
            d="M14.985 0C6.705 0 0 6.72 0 15C0 23.28 6.705 30 14.985 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 14.985 0ZM15 27C8.37 27 3 21.63 3 15C3 8.37 8.37 3 15 3C21.63 3 27 8.37 27 15C27 21.63 21.63 27 15 27ZM20.25 13.5C21.495 13.5 22.5 12.495 22.5 11.25C22.5 10.005 21.495 9 20.25 9C19.005 9 18 10.005 18 11.25C18 12.495 19.005 13.5 20.25 13.5ZM9.75 13.5C10.995 13.5 12 12.495 12 11.25C12 10.005 10.995 9 9.75 9C8.505 9 7.5 10.005 7.5 11.25C7.5 12.495 8.505 13.5 9.75 13.5ZM15 23.25C18.495 23.25 21.465 21.06 22.665 18H7.335C8.535 21.06 11.505 23.25 15 23.25Z"
            fill={this.state.showEmojiPicker ? "#6937FF" : "#221E41"}
          />
        </svg>

        {/* {this.state.showEmojiPicker && ( */}
        <Picker
          // className={classes.emojiPicker}
          // className="chat-input__picker-emoji"
          style={emojiPickerStyle}
          // ref={this.refEmoji}
          // ref={(node) => (this.refEmoji = node)}
          // onSelect={(emoji) => alert("Hey:" + emoji.native)}
          id="emoji-picker"
          onSelect={(emoji) => this.addEmoji(emoji.native)}
          // tabIndex="0"
          // onBlur={() => this.setState({ showEmojiPicker: false })}
        />
        {/* )} */}
        {/* <button
          className="btn"
          variant="contained"
          color="primary"
          type="submit"
          onClick={() =>
            this.setState({
              showGifPicker: !this.state.showGifPicker,
              showEmojiPicker: false,
            })
          }
        >
          GIFs
        </button> */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="chat-input__gif"
          // onClick={() =>
          //   this.setState({
          //     showGifPicker: !this.state.showGifPicker,
          //     showEmojiPicker: false,
          //   })
          // }
        >
          <path
            d="M19.5 13.5H17.25V22.5H19.5V13.5Z"
            fill={this.state.showGifPicker ? "#6937FF" : "#221E41"}
          />
          <path
            d="M13.5 13.5H9C8.1 13.5 7.5 14.25 7.5 15V21C7.5 21.75 8.1 22.5 9 22.5H13.5C14.4 22.5 15 21.75 15 21V18H12.75V20.25H9.75V15.75H15V15C15 14.25 14.4 13.5 13.5 13.5Z"
            fill={this.state.showGifPicker ? "#6937FF" : "#221E41"}
          />
          <path
            d="M28.5 15.75V13.5H21.75V22.5H24V19.5H27V17.25H24V15.75H28.5Z"
            fill={this.state.showGifPicker ? "#6937FF" : "#221E41"}
          />
          <rect
            x="1"
            y="1"
            width="34"
            height="34"
            rx="8"
            stroke={this.state.showGifPicker ? "#6937FF" : "#221E41"}
            stroke-width="2"
          />
        </svg>

        {/* NEED TO CHANGE THIS AS API KEY IS EXPOSED */}
        <div className="picker-gif" style={gifPickerStyle}>
          <ReactGiphySearchbox
            apiKey="i618OfhaYgdDxaTqaH1k6Ok37Wg7dy4h"
            // style={gifPickerStyle}
            onSelect={(item) => this.sendGif(item)}
            searchPlaceholder={"Search GIFs..."}
            gifListHeight={400}
            masonryConfig={[
              { columns: 2, imageWidth: 110, gutter: 5 },
              { mq: "850px", columns: 1, imageWidth: 400, gutter: 5 },
            ]}
          />
        </div>
        <input
          type="text"
          onKeyUp={this.handleUserInput}
          placeholder="Type a message..."
          id="chat-input"
          className="chat-input__input"
          onBlur={() => this.setState({ userTyping: false })}
          onFocus={this.userClickedInput}
        />
        {/* <button className="btn btn--send-message" onClick={this.sendMessage}>
          Send
        </button> */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="chat-input__send"
          onClick={this.sendMessage}
        >
          <path
            d="M3.015 31.5L34.5 18L3.015 4.5L3 15L25.5 18L3 21L3.015 31.5Z"
            fill="#221E41"
          />
        </svg>
      </div>
    );
  }
  componentDidMount() {
    // const specifiedElement = document.querySelector(".emoji-mart");
    // document.addEventListener("click", function (event) {
    //   console.log(specifiedElement);
    //   var isClickInside = specifiedElement.contains(event.target);
    //   if (isClickInside) {
    //     console.log("You clicked inside");
    //   } else {
    //     console.log("You clicked outside");
    //   }
    // });
    document.addEventListener("click", this.handleClickOutsideEmoji, false);
    document.addEventListener("click", this.handleClickOutsideGif, false);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutsideEmoji, false);
    document.removeEventListener("click", this.handleClickOutsideGif, false);
  }
  handleClickOutsideEmoji = (e) => {
    const pickerEmoji = document.querySelector(".emoji-mart");
    const symbolEmoji = document.querySelector(".chat-input__emoji");
    const clickedInPickerEmoji = pickerEmoji.contains(e.target);
    const clickedInSymbolEmoji = symbolEmoji.contains(e.target);
    if (clickedInPickerEmoji) {
      // console.log("You clicked inside");
    } else {
      if (clickedInSymbolEmoji) {
        this.setState({
          showEmojiPicker: !this.state.showEmojiPicker,
          showGifPicker: false,
        });
      } else {
        this.setState({ showEmojiPicker: false });
      }
    }
  };
  handleClickOutsideGif = (e) => {
    const pickerGif = document.querySelector(".picker-gif");
    const symbolGif = document.querySelector(".chat-input__gif");
    const clickedInPickerGif = pickerGif.contains(e.target);
    const clickedInSymbolGif = symbolGif.contains(e.target);
    if (clickedInPickerGif) {
      // console.log("You clicked inside");
    } else {
      if (clickedInSymbolGif) {
        this.setState({
          showGifPicker: !this.state.showGifPicker,
          showEmojiPicker: false,
        });
      } else {
        this.setState({ showGifPicker: false });
      }
    }
  };
  addEmoji = (emoji) => {
    const currText = document.getElementById("chat-input").value;
    const newText = currText + emoji;
    document.getElementById("chat-input").value = newText;
    this.setState({ inputText: newText });
  };
  sendGif = (item) => {
    this.setState({ showGifPicker: false });
    this.props.sendGif(item.images.original.url);
  };
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

    // if (!prevState.showEmojiPicker && this.state.showEmojiPicker) {
    //   var specifiedElement = document.querySelector(".emoji-mart");
    //   console.log(specifiedElement);
    //   document.addEventListener("click", function (event) {
    //     console.log(specifiedElement);
    //     var isClickInside = specifiedElement.contains(event.target);
    //     if (isClickInside) {
    //       console.log("You clicked inside");
    //     } else {
    //       console.log("You clicked outside");
    //     }
    //   });
    // }
    // if (prevState.showEmojiPicker && !this.state.showEmojiPicker) {
    //   document.removeEventListener(
    //     "click",
    //     function (event) {
    //       event.stopPropagation();
    //     },
    //     true
    //   );
    // }
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
