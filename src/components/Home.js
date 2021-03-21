import React from 'react';
import Navbar from './Navbar';
import {
  disableRightMiddleClick,
  generateRandomString,
} from '../utilities/helpers';
import '../main.scss';
import './Home.scss';
import LandingImage from '../images/chatbox-mock.png';

const firebase = require('firebase');

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      fade: false,
      animationCompleted: false,
      email: null,
      password: null,
    };
  }
  render() {
    return (
      <>
        {this.state.loaded ? (
          <>
            <Navbar />
            <img className='bg' src='https://svgshare.com/i/TcG.svg' alt='' />
            <div className='home'>
              <div className='home__left'>
                <h1 className='home__left__h1'>
                  Chat with friends, whenever and wherever.
                </h1>
                <h2 className='home__left__h2'>
                  Chatbox makes it easy to stay connected to people you love.
                </h2>
                <button
                  className='home__left__demo btn btn--hero'
                  onClick={this.createAndLoginDemoUser}
                >
                  Try a demo
                  <svg
                    width='24'
                    height='16'
                    viewBox='0 0 24 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M22.9337 7.23553L16.0148 0.316606C15.5927 -0.105535 14.908 -0.105535 14.4859 0.316606C14.0637 0.738833 14.0637 1.42329 14.4859 1.84552L19.5593 6.91891H1.08108C0.484065 6.91891 0 7.40297 0 7.99999C0 8.59692 0.484065 9.08107 1.08108 9.08107H19.5593L14.4861 14.1545C14.0638 14.5767 14.0638 15.2611 14.4861 15.6834C14.6971 15.8943 14.9739 16 15.2505 16C15.5272 16 15.8039 15.8943 16.015 15.6834L22.9337 8.76444C23.356 8.34222 23.356 7.65776 22.9337 7.23553Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
              <div className='home__right'>
                <div className='home__right__preview'>
                  {/* <img src={LandingImage} alt='' /> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <img
            className='loader'
            src='https://svgshare.com/i/TU9.svg'
            alt=''
            style={{
              transition: 'opacity 0.6s ease-in-out',
              opacity: this.state.fade ? 0 : 1,
            }}
          />
        )}
      </>
    );
  }
  componentDidMount = async () => {
    disableRightMiddleClick();
    if (window.sessionStorage.getItem('firstLoadDone') === null) {
      await this.setState({ loaded: false });
      window.sessionStorage.setItem('firstLoadDone', 1);
      setTimeout(() => this.setState({ fade: true }), 1600);
      setTimeout(() => this.setState({ loaded: true }), 2200);
    } else {
      this.setState({ loaded: true });
    }
    setTimeout(() => this.setState({ animationCompleted: true }), 1000);
  };
  createAndLoginDemoUser = async () => {
    const demoUser = generateRandomString(10);
    const demoEmail = `${demoUser}@gmail.com`;
    const demoPassword = 'thisisademo';
    await this.setState({ email: demoEmail, password: demoPassword });
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email.toLowerCase(),
        this.state.password
      )
      .then(
        (authRes) => {
          const userObj = {
            email: authRes.user.email,
            nameFirst: 'Demo',
            nameLast: 'User',
            lastLoggedOut: null,
            online: false,
            profilePictureUrl: 'https://i.imgur.com/ZtGfcXy.png',
          };
          firebase
            .firestore()
            .collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                const camEmail = 'c.c.green@outlook.com';
                const chatCamUsers = [camEmail, this.state.email].sort();
                const chatCamDocKey = chatCamUsers.join(':');
                const chatCamObj = {
                  messages: [
                    {
                      gifRef: null,
                      message: 'Hey there! 👋',

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 7,
                    },
                    {
                      gifRef: null,
                      message:
                        'Welcome to Chatbox, a real-time chat application built with React and Firebase',

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 6,
                    },
                    {
                      gifRef:
                        'https://media4.giphy.com/media/p6P5KdqRljCrVoZj79/giphy.gif?cid=054422c3eurumthxw6z3v80yrujtkke22l1c4uwyzgeqd7f3&rid=giphy.gif',
                      message: null,

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 5,
                    },
                    {
                      gifRef: null,
                      message: "I'm Cam Green, the creator of this app",

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 4,
                    },
                    {
                      gifRef: null,
                      message:
                        'I have included some dummy chats to show you the functionality of the app as it turns out it’s quite hard to demo a chat application without lots of users!',

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 3,
                    },
                    {
                      gifRef: null,
                      message:
                        'Click on one these chats in the chat list to the side or send a nice message to a friend using their email address with the + button (the friend must also have signed up on Chatbox)',

                      sender: camEmail,
                      timestamp: Date.now() - 60000 * 2,
                    },
                    {
                      gifRef: null,
                      message:
                        'Feel free to contact me right here, or on my email address mailto:hello@camgreen.works, and I will get back to you as soon as I can! 😀',

                      sender: camEmail,
                      timestamp: Date.now(),
                    },
                  ],
                  receiverHasRead: false,
                  user1Typing: false,
                  user2Typing: false,
                  users: chatCamUsers,
                };
                firebase
                  .firestore()
                  .collection('chats')
                  .doc(chatCamDocKey)
                  .set({ ...chatCamObj })
                  .then(() => {
                    const janeEmail = 'jane.doe@gmail.com';
                    const chatJaneUsers = [janeEmail, this.state.email].sort();
                    const chatJaneDocKey = chatJaneUsers.join(':');
                    const chatJaneObj = {
                      messages: [
                        {
                          gifRef: null,
                          message:
                            "I'm here to tell you that you can send emojis with the emoji button, like this:",

                          sender: janeEmail,
                          timestamp: Date.now() - 60000 * 23,
                        },
                        {
                          gifRef: null,
                          message: '😁😁😁',

                          sender: janeEmail,
                          timestamp: Date.now() - 60000 * 22,
                        },
                        {
                          gifRef: null,
                          message:
                            'You can send GIFs with the GIF icon button, using the Giphy API',

                          sender: janeEmail,
                          timestamp: Date.now() - 60000 * 21,
                        },
                        {
                          gifRef:
                            'https://media0.giphy.com/media/8Iv5lqKwKsZ2g/giphy.gif?cid=054422c3esjdb7maxup41cz0uudxss9dcpn41a9h97r4b5vu&rid=giphy.gif',
                          message: null,

                          sender: janeEmail,
                          timestamp: Date.now() - 60000 * 20,
                        },
                      ],
                      receiverHasRead: false,
                      user1Typing: false,
                      user2Typing: false,
                      users: chatJaneUsers,
                    };
                    firebase
                      .firestore()
                      .collection('chats')
                      .doc(chatJaneDocKey)
                      .set({ ...chatJaneObj })
                      .then(() => {
                        const johnEmail = 'john.bellamy@gmail.com';
                        const chatJohnUsers = [
                          johnEmail,
                          this.state.email,
                        ].sort();
                        const chatJohnDocKey = chatJohnUsers.join(':');
                        const chatJohnObj = {
                          messages: [
                            {
                              gifRef: null,
                              message:
                                'To show you the *other user is typing* feature, my isTyping flag has been set to true for the rest of eternity',

                              sender: johnEmail,
                              timestamp: Date.now() - 60000 * 27,
                            },
                            {
                              gifRef: null,
                              message: 'Tiring!',

                              sender: johnEmail,
                              timestamp: Date.now() - 60000 * 26,
                            },
                            {
                              gifRef: null,
                              message: 'Below is the typing indicator 👇',

                              sender: johnEmail,
                              timestamp: Date.now() - 60000 * 25,
                            },
                          ],
                          receiverHasRead: false,
                          user1Typing: true,
                          user2Typing: true,
                          users: chatJohnUsers,
                        };
                        firebase
                          .firestore()
                          .collection('chats')
                          .doc(chatJohnDocKey)
                          .set({ ...chatJohnObj })
                          .then(() => {
                            this.props.history.push('/dashboard');
                          });
                      });
                  });
              },
              (dbError) => {
                this.setState({ signupError: 'Failed to add user' });
              }
            );
        },
        (authError) => {
          this.setState({ signupError: authError.message });
        }
      );
  };
}

export default Home;
