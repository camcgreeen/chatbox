import React from "react";
import Navbar from "./Navbar";
// import { disableRightMiddleClick } from "../utilities/helper";
import "../main.scss";
import "./Home.scss";
const firebase = require("firebase");

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }
  render() {
    return (
      <>
        {this.state.loaded ? (
          <>
            <Navbar />
            <div className="home">
              <div className="home__left">
                <h1 className="home__left__h1">
                  Chat with friends, whenever and wherever.
                </h1>
                <h2 className="home__left__h2">
                  Chatbox makes it easy to stay connected to people you love.
                </h2>
                <button className="home__left__demo btn btn--hero">
                  Try a demo
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.9337 7.23553L16.0148 0.316606C15.5927 -0.105535 14.908 -0.105535 14.4859 0.316606C14.0637 0.738833 14.0637 1.42329 14.4859 1.84552L19.5593 6.91891H1.08108C0.484065 6.91891 0 7.40297 0 7.99999C0 8.59692 0.484065 9.08107 1.08108 9.08107H19.5593L14.4861 14.1545C14.0638 14.5767 14.0638 15.2611 14.4861 15.6834C14.6971 15.8943 14.9739 16 15.2505 16C15.5272 16 15.8039 15.8943 16.015 15.6834L22.9337 8.76444C23.356 8.34222 23.356 7.65776 22.9337 7.23553Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <div className="home__right">
                <div className="home__right__preview"></div>
                <div className="home__right__circle"></div>
              </div>
            </div>
          </>
        ) : (
          <img className="loader" src="https://svgshare.com/i/TU9.svg" alt="" />
          // <img className="loader" src="https://svgshare.com/i/TUk.svg" alt="" />
          // <img
          //   className="loader"
          //   src="https://sebostudio.com/wp-content/themes/sebotheme-3.0.0/assets/img/sebostudio-preload.svg"
          //   alt=""
          // />
        )}
      </>
    );
  }
  componentDidMount = () => {
    setTimeout(() => this.setState({ loaded: true }), 1);
  };
}

export default Home;
