import React from "react";
// import { disableRightMiddleClick } from "../utilities/helper";
import "../main.scss";
import "./ChatNavigation.scss";
const firebase = require("firebase");

class ChatNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderedChats: [],
      friendNames: [],
      friendProfilePictures: [],
    };
  }
  render() {
    // const chatsToOrder = [...this.props.chats];
    // const orderedChats = chatsToOrder.sort(
    //   (a, b) =>
    //     b.messages[b.messages.length - 1].timestamp -
    //     a.messages[a.messages.length - 1].timestamp
    // );
    if (this.state.orderedChats.length > 0) {
      return (
        <div
          className="chat-navigation"
          // style={{ zIndex: this.props.zIndexValue }}
          style={{ left: this.props.leftValue }}
        >
          {/* <button onClick={this.props.logOut}>Log out</button> */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.props.logOut}
            className="logout"
          >
            <path
              d="M23.7017 12.574L21.1337 14.3844C20.6684 14.7123 20.0254 14.3784 20.0254 13.8097V12.7024L7.69536 12.7024C7.30705 12.7024 6.99219 12.3876 6.99219 11.9992C6.99219 11.6109 7.30705 11.2961 7.69536 11.2961L20.0253 11.2961V10.1889C20.0253 9.61643 20.6718 9.28868 21.1336 9.61418L23.7015 11.4246C24.0937 11.7009 24.1016 12.2914 23.7017 12.574Z"
              fill="#4E575C"
            />
            <path
              d="M20.1783 7.48422C19.8423 7.67857 19.4121 7.56382 19.2176 7.22763C17.5659 4.37219 14.4784 2.45524 10.9501 2.45524C5.68767 2.45524 1.4063 6.73661 1.4063 11.9991C1.4063 17.2615 5.68767 21.5429 10.9501 21.5429C14.4807 21.5429 17.5668 19.6242 19.2175 16.7706C19.412 16.4344 19.8423 16.3197 20.1783 16.514C20.5144 16.7085 20.6293 17.1386 20.4349 17.4748C18.5352 20.7588 14.9873 22.9492 10.9501 22.9492C4.89797 22.9492 0 18.0518 0 11.9991C0 5.94691 4.89745 1.04894 10.9501 1.04894C14.989 1.04894 18.5361 3.24096 20.4349 6.52347C20.6293 6.85961 20.5145 7.28974 20.1783 7.48422Z"
              fill="#4E575C"
            />
          </svg>
          <main className="chat-navigation__section">
            {/* <h1>All messages</h1> */}
            <ul className="chat-navigation__section__chats">
              {this.state.orderedChats.map((chat, index) => {
                return (
                  <li
                    key={index}
                    className={
                      this.props.selectedChatIndex ===
                      this.props.chats.findIndex(
                        (element) => element === this.state.orderedChats[index]
                      )
                        ? "chat-navigation__section__chats__chat selected"
                        : "chat-navigation__section__chats__chat"
                    }
                    // selected={
                    //   this.props.selectedChatIndex ===
                    //   this.props.chats.findIndex(
                    //     (element) => element === this.state.orderedChats[index]
                    //   )
                    // }
                    // onClick={() => this.selectChat(index)}
                    onClick={() =>
                      this.selectChat(
                        this.props.chats.findIndex(
                          (element) =>
                            element === this.state.orderedChats[index]
                        )
                      )
                    }
                  >
                    <div className="chat-navigation__section__chats__chat__profile-picture">
                      <img
                        src={this.state.friendProfilePictures[index]}
                        alt=""
                      />
                      <div class="chat-navigation__section__chats__chat__profile-picture__cutout">
                        <div class="chat-navigation__section__chats__chat__profile-picture__cutout__symbol"></div>
                      </div>
                    </div>
                    <div
                      className="chat-navigation__section__chats__chat__name"
                      // style={{
                      //   fontWeight:
                      //     !chat.receiverHasRead && !this.userSentMessage(chat)
                      //       ? 700
                      //       : 400,
                      // }}
                    >
                      {
                        // chat.users.filter(
                        //   (user) => user !== this.props.email
                        // )[0]
                        this.state.friendNames[index]
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
                    <div className="chat-navigation__section__chats__chat__timestamp">
                      {`${this.convertChatListTimestamp(
                        chat.messages[chat.messages.length - 1].timestamp
                      )}`}
                    </div>
                    <div className="chat-navigation__section__chats__chat__online-status"></div>
                  </li>
                );
              })}
            </ul>
            {/* <button className="btn btn--new-chat" onClick={this.newChat}>
              New chat
            </button> */}
          </main>
          <div className="empty"></div>
          <svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.newChat}
            className="create-chat"
          >
            <path
              d="M24.0008 2.26953C18.432 2.26953 12.8633 4.38799 8.62578 8.62549C0.150781 17.1005 0.150781 30.9005 8.62578 39.3755C12.8633 43.613 18.4508 45.7505 24.0008 45.7505C29.5508 45.7505 35.1383 43.613 39.3758 39.3755C47.8508 30.9005 47.8508 17.1005 39.3758 8.62549C35.1383 4.38799 29.5695 2.26953 24.0008 2.26953ZM24.0008 4.50049C28.9883 4.50049 33.9761 6.41269 37.8011 10.2002C45.3761 17.8127 45.3761 30.1883 37.8011 37.8008C30.1886 45.4133 17.8136 45.4133 10.2386 37.8008C2.62607 30.1883 2.62549 17.8127 10.2005 10.2002C14.0255 6.41269 19.0133 4.50049 24.0008 4.50049ZM24.0008 15.7505C23.3633 15.7505 22.8758 16.238 22.8758 16.8755V22.8755H16.8758C16.2383 22.8755 15.7508 23.363 15.7508 24.0005C15.7508 24.638 16.2383 25.1255 16.8758 25.1255H22.8758V31.1255C22.8758 31.763 23.3633 32.2505 24.0008 32.2505C24.6383 32.2505 25.1258 31.763 25.1258 31.1255V25.1255H31.1258C31.7633 25.1255 32.2508 24.638 32.2508 24.0005C32.2508 23.363 31.7633 22.8755 31.1258 22.8755H25.1258V16.8755C25.1258 16.238 24.6383 15.7505 24.0008 15.7505Z"
              fill="#221E41"
            />
          </svg>
          {/* <button
            className="chat-navigation__toggle-nav"
            onClick={this.props.toggleNav}
          >
            Go to ChatMain
          </button> */}
          {/* <div className="chat-navigation__empty"></div> */}
        </div>
      );
    } else {
      return (
        <div className="chat-navigation">
          {/* <button onClick={this.props.logOut}>Log out</button> */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.props.logOut}
            className="logout"
          >
            <path
              d="M23.7017 12.574L21.1337 14.3844C20.6684 14.7123 20.0254 14.3784 20.0254 13.8097V12.7024L7.69536 12.7024C7.30705 12.7024 6.99219 12.3876 6.99219 11.9992C6.99219 11.6109 7.30705 11.2961 7.69536 11.2961L20.0253 11.2961V10.1889C20.0253 9.61643 20.6718 9.28868 21.1336 9.61418L23.7015 11.4246C24.0937 11.7009 24.1016 12.2914 23.7017 12.574Z"
              fill="#4E575C"
            />
            <path
              d="M20.1783 7.48422C19.8423 7.67857 19.4121 7.56382 19.2176 7.22763C17.5659 4.37219 14.4784 2.45524 10.9501 2.45524C5.68767 2.45524 1.4063 6.73661 1.4063 11.9991C1.4063 17.2615 5.68767 21.5429 10.9501 21.5429C14.4807 21.5429 17.5668 19.6242 19.2175 16.7706C19.412 16.4344 19.8423 16.3197 20.1783 16.514C20.5144 16.7085 20.6293 17.1386 20.4349 17.4748C18.5352 20.7588 14.9873 22.9492 10.9501 22.9492C4.89797 22.9492 0 18.0518 0 11.9991C0 5.94691 4.89745 1.04894 10.9501 1.04894C14.989 1.04894 18.5361 3.24096 20.4349 6.52347C20.6293 6.85961 20.5145 7.28974 20.1783 7.48422Z"
              fill="#4E575C"
            />
          </svg>
          <main className="chat-navigation__section">
            {/* <button className="btn btn--new-chat" onClick={this.newChat}>
              New chat
            </button> */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.newChat}
              className="create-chat"
            >
              <path
                d="M24.0008 2.26953C18.432 2.26953 12.8633 4.38799 8.62578 8.62549C0.150781 17.1005 0.150781 30.9005 8.62578 39.3755C12.8633 43.613 18.4508 45.7505 24.0008 45.7505C29.5508 45.7505 35.1383 43.613 39.3758 39.3755C47.8508 30.9005 47.8508 17.1005 39.3758 8.62549C35.1383 4.38799 29.5695 2.26953 24.0008 2.26953ZM24.0008 4.50049C28.9883 4.50049 33.9761 6.41269 37.8011 10.2002C45.3761 17.8127 45.3761 30.1883 37.8011 37.8008C30.1886 45.4133 17.8136 45.4133 10.2386 37.8008C2.62607 30.1883 2.62549 17.8127 10.2005 10.2002C14.0255 6.41269 19.0133 4.50049 24.0008 4.50049ZM24.0008 15.7505C23.3633 15.7505 22.8758 16.238 22.8758 16.8755V22.8755H16.8758C16.2383 22.8755 15.7508 23.363 15.7508 24.0005C15.7508 24.638 16.2383 25.1255 16.8758 25.1255H22.8758V31.1255C22.8758 31.763 23.3633 32.2505 24.0008 32.2505C24.6383 32.2505 25.1258 31.763 25.1258 31.1255V25.1255H31.1258C31.7633 25.1255 32.2508 24.638 32.2508 24.0005C32.2508 23.363 31.7633 22.8755 31.1258 22.8755H25.1258V16.8755C25.1258 16.238 24.6383 15.7505 24.0008 15.7505Z"
                fill="#221E41"
              />
            </svg>
          </main>
        </div>
      );
    }
  }
  //REFACTOR FINDING FRIEND INFO INTO A METHOD AS THIS IS MESSY AND REPETITIVE
  componentDidMount = async () => {
    const chatsToOrder = [...this.props.chats];
    const orderedChats = chatsToOrder.sort(
      (a, b) =>
        b.messages[b.messages.length - 1].timestamp -
        a.messages[a.messages.length - 1].timestamp
    );
    // let friendNamePromises;
    // let friendNProfilePicturesPromises;
    const friendNamesPromises = orderedChats.map(async (chat, index) => {
      const friendName = await this.findFriendName(
        chat.users.filter((user) => user !== this.props.email)[0]
      );
      return friendName;
    });
    const friendProfilePicturesPromises = orderedChats.map(
      async (chat, index) => {
        const friendProfilePicture = await this.findFriendProfilePicture(
          chat.users.filter((user) => user !== this.props.email)[0]
        );
        return friendProfilePicture;
      }
    );
    const friendNames = await Promise.all(friendNamesPromises);
    const friendProfilePictures = await Promise.all(
      friendProfilePicturesPromises
    );
    await this.setState({ orderedChats, friendNames, friendProfilePictures });
    // console.log(friendNames);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.chats !== this.props.chats) {
      const chatsToOrder = [...this.props.chats];
      const orderedChats = chatsToOrder.sort(
        (a, b) =>
          b.messages[b.messages.length - 1].timestamp -
          a.messages[a.messages.length - 1].timestamp
      );
      const friendNamesPromises = orderedChats.map(async (chat, index) => {
        const friendName = await this.findFriendName(
          chat.users.filter((user) => user !== this.props.email)[0]
        );
        return friendName;
      });
      const friendProfilePicturesPromises = orderedChats.map(
        async (chat, index) => {
          const friendProfilePicture = await this.findFriendProfilePicture(
            chat.users.filter((user) => user !== this.props.email)[0]
          );
          return friendProfilePicture;
        }
      );
      const friendNames = await Promise.all(friendNamesPromises);
      const friendProfilePictures = await Promise.all(
        friendProfilePicturesPromises
      );
      await this.setState({ orderedChats, friendNames, friendProfilePictures });
      console.log(friendNames);
    }
  };
  findFriendName = async (friendEmail) => {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(friendEmail)
      .get();
    const nameFirst = doc.data().nameFirst;
    const nameLast = doc.data().nameLast;
    return `${nameFirst} ${nameLast}`;
    // console.log(`${nameFirst} ${nameLast}`);
  };
  findFriendProfilePicture = async (friendEmail) => {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(friendEmail)
      .get();
    const profilePictureUrl = doc.data().profilePictureUrl;
    return profilePictureUrl;
  };
  newChat = () => {
    this.props.newChat();
  };
  selectChat = (index) => {
    this.props.selectChat(index);
    this.props.toggleNav();
  };
  userSentMessage = (chat) =>
    chat.messages[chat.messages.length - 1].sender === this.props.email;
  convertChatListTimestamp = (timestamp) => {
    if (timestamp) {
      const dayMs = 86400000;
      const weekMs = 604800000;
      const yearMs = 31540000000;

      const difference = Date.now() - timestamp;

      const dateString = new Date(timestamp).toString();
      const dateArr = dateString.split(" ");

      switch (true) {
        case difference < dayMs:
          const hourMinSeconds = dateString.split(" ")[4];
          const hourMinArr = hourMinSeconds.split(":");
          const hourMin = [hourMinArr[0], hourMinArr[1]].join(":");
          return hourMin;
        case difference < weekMs:
          return dateString.split(" ")[0];
        case difference < yearMs:
          return [dateArr[2], dateArr[1]].join(" ");
        case difference >= yearMs:
          return [dateArr[1], dateArr[2], dateArr[3]].join(" ");
        default:
          return "";
      }
    }
  };
}

export default ChatNavigation;
