import React from "react";
import ChatNavigation from "./ChatNavigation";
import ChatMain from "./ChatMain";
import Sidebar from "./Sidebar";
// import { disableRightMiddleClick } from "../utilities/helper";
// import "./main.scss";
const firebase = require("firebase");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: [],
    };
  }
  render() {
    return (
      <>
        <button
          onClick={this.logOut}
          // style={{ position: "absolute", top: 200, left: 200 }}
        >
          Log out
        </button>
        <ChatNavigation
          // zIndexValue={this.state.navOpen ? 20 : 0}
          leftValue={this.state.navOpen ? 0 : "-150vw"}
          toggleNav={this.toggleNav}
          newChat={this.newChat}
          selectChat={this.selectChat}
          chats={this.state.chats}
          email={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        />
        <ChatMain
          toggleNav={this.toggleNav}
          email={this.state.email}
          chat={this.state.chats[this.state.selectedChat]}
          newChatFormVisible={this.state.newChatFormVisible}
          sendMessage={this.sendMessage}
          navigateToChat={this.navigateToChat}
          createNewChat={this.createNewChat}
        />
        <Sidebar />
      </>
    );
    // return <h1>Dashboard</h1>;
  }
  componentDidMount = () => {
    document.title = "Chatbox";
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) {
        this.props.history.push("/login");
      } else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async (result) => {
            const chats = result.docs.map((doc) => doc.data());
            await this.setState({ email: _usr.email, chats });
          });
        // console.log(this.state);
      }
    });
  };
  toggleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };
  navigateToChat = async (docKey, message) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find((chat) =>
      usersInChat.every((user) => chat.users.includes(user))
    );
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.sendMessage(message);
  };
  createNewChat = async (chat) => {
    const docKey = this.buildDocKey(chat.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        users: [this.state.email, chat.sendTo],
        messages: [{ message: chat.message, sender: this.state.email }],
      });
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };
  selectChat = (chatIndex) => {
    console.log("index", chatIndex);
    this.setState({ selectedChat: chatIndex });
  };
  newChat = () => {
    this.setState({ selectedChat: null, newChatFormVisible: true });
  };
  logOut = () => {
    firebase.auth().signOut();
  };
  buildDocKey = (friend) => [this.state.email, friend].sort().join(":");
  sendMessage = (message) => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (user) => user !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message,
          timestamp: Date.now(),
        }),
      });
  };
}

export default Dashboard;
