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
      right: "50px",
      bottom: "50px",
      width: "250px",
      // height: "100px",
      // height: "10px",
      // transform: "translate(50%, -50%)",
    };
    return (
      <div className="chat-input">
        <button
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
        </button>
        {this.state.showEmojiPicker && (
          <Picker
            // className={classes.emojiPicker}
            style={emojiPickerStyle}
            // onSelect={(emoji) => alert("Hey:" + emoji.native)}
            onSelect={(emoji) => this.addEmoji(emoji.native)}
          />
        )}
        <button
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
        </button>
        {
          // NEED TO CHANGE THIS AS API KEY IS EXPOSED
          this.state.showGifPicker && (
            <div className="searchboxWrapper">
              <ReactGiphySearchbox
                apiKey="i618OfhaYgdDxaTqaH1k6Ok37Wg7dy4h"
                onSelect={(item) => this.sendGif(item)}
                searchPlaceholder={"Search GIFs..."}
                gifListHeight={400}
                masonryConfig={[
                  { columns: 2, imageWidth: 110, gutter: 5 },
                  { mq: "850px", columns: 1, imageWidth: 400, gutter: 5 },
                ]}
              />
            </div>
          )
        }
        <input
          type="text"
          onKeyUp={this.handleUserInput}
          placeholder="Type a message..."
          id="chat-input"
          className="chat-input__input"
          onBlur={() => this.setState({ userTyping: false })}
          onFocus={this.userClickedInput}
        />
        <button className="btn btn--send-message" onClick={this.sendMessage}>
          Send
        </button>
      </div>
    );
  }
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
