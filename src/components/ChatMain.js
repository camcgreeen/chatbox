import React from 'react';
import ChatInput from './ChatInput';
import NewChat from './NewChat';
import '../main.scss';
import './ChatMain.scss';

const firebase = require('firebase');

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersTyping: [],
      friendLastLoggedOut: '',
      chatOpacity: 0,
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
        <div className='chat-main'>
          {newChatFormVisible ? (
            <NewChat
              navigateToChat={this.props.navigateToChat}
              createNewChat={this.props.createNewChat}
              email={this.props.email}
              toggleNav={this.props.toggleNav}
            />
          ) : (
            <>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='toggle-nav'
                onClick={toggleNav}
              >
                <circle cx='10' cy='10' r='10' fill='#F0F0F5' />
                <g clip-path='url(#clip0)'>
                  <path
                    d='M7.35627 9.50495L11.6561 5.20524C11.9296 4.93159 12.3731 4.93159 12.6465 5.20524C12.9199 5.47865 12.9199 5.9221 12.6465 6.19549L8.8418 10.0001L12.6464 13.8045C12.9198 14.078 12.9198 14.5214 12.6464 14.7949C12.373 15.0684 11.9295 15.0684 11.656 14.7949L7.35616 10.4951C7.21946 10.3583 7.15118 10.1792 7.15118 10.0001C7.15118 9.82085 7.21959 9.64165 7.35627 9.50495Z'
                    fill='#221E41'
                  />
                </g>
                <defs>
                  <clipPath id='clip0'>
                    <rect
                      width='10'
                      height='10'
                      fill='white'
                      transform='translate(15 15) rotate(-180)'
                    />
                  </clipPath>
                </defs>
              </svg>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div className='chat-main'>
          <div className='chat-main__header'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='toggle-nav'
              onClick={toggleNav}
            >
              <circle cx='10' cy='10' r='10' fill='#F0F0F5' />
              <g clip-path='url(#clip0)'>
                <path
                  d='M7.35627 9.50495L11.6561 5.20524C11.9296 4.93159 12.3731 4.93159 12.6465 5.20524C12.9199 5.47865 12.9199 5.9221 12.6465 6.19549L8.8418 10.0001L12.6464 13.8045C12.9198 14.078 12.9198 14.5214 12.6464 14.7949C12.373 15.0684 11.9295 15.0684 11.656 14.7949L7.35616 10.4951C7.21946 10.3583 7.15118 10.1792 7.15118 10.0001C7.15118 9.82085 7.21959 9.64165 7.35627 9.50495Z'
                  fill='#221E41'
                />
              </g>
              <defs>
                <clipPath id='clip0'>
                  <rect
                    width='10'
                    height='10'
                    fill='white'
                    transform='translate(15 15) rotate(-180)'
                  />
                </clipPath>
              </defs>
            </svg>
            <h1>{this.props.friendName}</h1>
            {this.props.friendOnline ? (
              <div className='chat-main__header__friend'>
                <div
                  className='chat-main__header__friend__symbol'
                  style={{ backgroundColor: '#6EFF7C' }}
                ></div>{' '}
                <p>Active now</p>
              </div>
            ) : (
              <div className='chat-main__header__friend'>
                <div
                  className='chat-main__header__friend__symbol'
                  style={{ backgroundColor: '#838191' }}
                ></div>
                <p>{this.state.friendLastLoggedOut}</p>
              </div>
            )}
          </div>
          <div
            className='chat-main__body'
            id='chat-container'
            style={{ opacity: this.state.chatOpacity }}
          >
            {chat.messages.map((message, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={
                      message.sender === email
                        ? 'chat-main__body__message chat-main__body__message--user'
                        : 'chat-main__body__message chat-main__body__message--friend'
                    }
                  >
                    {message.gifRef === null ? (
                      <>
                        <div
                          className={
                            message.sender === email
                              ? 'message message--user'
                              : 'message message--friend'
                          }
                        >
                          {message.message ===
                          'Feel free to contact me right here, or on my email address mailto:hello@camgreen.works, and I will get back to you as soon as I can! 😀' ? (
                            <p>
                              {
                                'Feel free to contact me right here, or on my email address '
                              }
                              <a
                                href='mailto:hello@camgreen.works'
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                hello@camgreen.works
                              </a>
                              {
                                ' and I will get back to you as soon as I can! 😀'
                              }
                            </p>
                          ) : (
                            message.message
                          )}
                        </div>
                      </>
                    ) : (
                      <img
                        src={message.gifRef}
                        alt=''
                        className={
                          message.sender === email
                            ? 'message message--user message--gif'
                            : 'message message--friend message--gif'
                        }
                      />
                    )}
                  </div>
                  <div
                    className={
                      message.sender === email
                        ? 'timestamp timestamp--user'
                        : 'timestamp timestamp--friend'
                    }
                  >
                    {this.convertChatBodyTimestamp(message.timestamp)}
                  </div>
                  {this.checkFriendTyping(
                    friendEmail,
                    this.state.usersTyping
                  ) &&
                    index === chat.messages.length - 1 && (
                      <div className='message message--friend typing'>
                        <div class='ticontainer'>
                          <div class='tiblock'>
                            <div class='tidot tidot--1'></div>
                            <div class='tidot tidot--2'></div>
                            <div class='tidot tidot--3'></div>
                          </div>
                        </div>
                      </div>
                    )}
                </>
              );
            })}
          </div>
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
  }
  findUsersTyping = () => {
    firebase
      .firestore()
      .collection('chats')
      .where('users', 'array-contains', this.props.email)
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
    [this.props.email, this.props.friendEmail].sort().join(':');
  checkIfUrl = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  };

  componentDidMount = async () => {
    await this.setState({ windowHeight: window.innerHeight });

    let resizeTimer;

    window.onresize = (e) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.setState({ windowHeight: window.innerHeight });
      }, 100);
    };

    setTimeout(() => this.setState({ chatOpacity: 1 }), 2500);
    setTimeout(this.findUsersTyping, 2000);
    this.updateHeaderTimestamp(this.props.friendLastLoggedOut);
    setInterval(
      () => this.updateHeaderTimestamp(this.props.friendLastLoggedOut),
      60000
    );
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTo({
          left: 0,
          top: chatContainer.scrollHeight,
          behaviour: 'auto',
        });
      }
    }, 1200);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.chat !== undefined && this.props.chat !== undefined) {
      if (prevProps.selectedChat !== this.props.selectedChat) {
        await this.setState({ chatOpacity: 0 });
        setTimeout(() => this.setState({ chatOpacity: 1 }), 300);
        const chatContainer = document.getElementById('chat-container');
        setTimeout(() => {
          if (chatContainer) {
            chatContainer.scrollTo({
              left: 0,
              top: chatContainer.scrollHeight,
              behaviour: 'smooth',
            });
          }
        }, 400);
      }
      if (prevProps.chat.messages.length < this.props.chat.messages.length) {
        const chatContainer = document.getElementById('chat-container');
        setTimeout(() => {
          if (chatContainer) {
            chatContainer.scrollTo({
              left: 0,
              top: chatContainer.scrollHeight,
              behaviour: 'smooth',
            });
          }
        }, 200);
      }
      if (prevProps.friendLastLoggedOut !== this.props.friendLastLoggedOut) {
        this.updateHeaderTimestamp(this.props.friendLastLoggedOut);
      }
    }
  };
  convertChatBodyTimestamp = (timestamp) => {
    if (timestamp) {
      const dayMs = 86400000;
      const weekMs = 604800000;
      const yearMs = 31540000000;
      const difference = Date.now() - timestamp;
      const dateString = new Date(timestamp).toString();
      const dateArr = dateString.split(' ');
      const hourMinSeconds = dateString.split(' ')[4];
      const hourMinArr = hourMinSeconds.split(':');
      const hourMin = [hourMinArr[0], hourMinArr[1]].join(':');

      switch (true) {
        case difference < dayMs:
          return hourMin;
        case difference < weekMs:
          return `${dateString.split(' ')[0]}, ${hourMin}`;
        case difference < yearMs:
          return [dateArr[2], dateArr[1]].join(' ');
        case difference >= yearMs:
          return [dateArr[1], dateArr[2], dateArr[3]].join(' ');
        default:
          return '';
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
      let plural;
      let dateString;
      let dateArray;
      let dateFormatted;

      switch (true) {
        case difference < hourMs:
          const differenceMins = Math.ceil(difference / 1000 / 60);
          plural = differenceMins >= 2;
          return `Last active ${differenceMins} ${plural ? 'mins' : 'min'} ago`;
        case difference < dayMs:
          const differenceHours = Math.round(difference / 1000 / 60 / 60);
          plural = differenceHours >= 2;
          return `Last active ${differenceHours} ${
            plural ? 'hours' : 'hour'
          } ago`;
        case difference < weekMs:
          dateString = new Date(timestamp).toString();
          return `Last active on ${dateString.split(' ')[0]}`;
        case difference < yearMs:
          dateString = new Date(timestamp).toString();
          dateArray = dateString.split(' ');
          dateFormatted = [dateArray[0], dateArray[1], dateArray[2]].join(' ');
          return `Last active on ${dateFormatted}`;
        case difference >= yearMs:
          dateString = new Date(timestamp).toString();
          dateArray = dateString.split(' ');
          dateFormatted = [
            dateArray[0],
            dateArray[1],
            dateArray[2],
            dateArray[3],
          ].join(' ');
          return `Last active in ${dateFormatted}`;
        default:
          return '';
      }
    }
  };
}

export default ChatMain;
