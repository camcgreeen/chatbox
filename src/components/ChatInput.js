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
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="chat-input__emoji"
        >
          <path
            d="M16 2.66667C23.352 2.66667 29.3333 8.648 29.3333 16C29.3333 23.352 23.352 29.3333 16 29.3333C8.648 29.3333 2.66667 23.352 2.66667 16C2.66667 8.648 8.648 2.66667 16 2.66667ZM16 0C7.164 0 0 7.164 0 16C0 24.836 7.164 32 16 32C24.836 32 32 24.836 32 16C32 7.164 24.836 0 16 0ZM23.3427 18.588C21.3267 20.1813 19.1107 21.1627 16.0013 21.1627C12.8893 21.1627 10.6733 20.1813 8.65733 18.588L8 19.2453C9.50267 21.5387 12.2667 24 16.0013 24C19.7347 24 22.4973 21.5387 24 19.2453L23.3427 18.588ZM11.3333 10.6667C10.2293 10.6667 9.33333 11.5613 9.33333 12.6667C9.33333 13.772 10.2293 14.6667 11.3333 14.6667C12.4373 14.6667 13.3333 13.772 13.3333 12.6667C13.3333 11.5613 12.4373 10.6667 11.3333 10.6667ZM20.6667 10.6667C19.5627 10.6667 18.6667 11.5613 18.6667 12.6667C18.6667 13.772 19.5627 14.6667 20.6667 14.6667C21.7707 14.6667 22.6667 13.772 22.6667 12.6667C22.6667 11.5613 21.7707 10.6667 20.6667 10.6667V10.6667Z"
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
