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
    };
  }
  render() {
    return (
      <>
        <ChatNavigation
          // zIndexValue={this.state.navOpen ? 20 : 0}
          leftValue={this.state.navOpen ? 0 : "-150vw"}
          toggleNav={this.toggleNav}
        />
        <ChatMain toggleNav={this.toggleNav} />
        <Sidebar />
      </>
    );
    // return <h1>Dashboard</h1>;
  }
  componentDidMount = () => {
    document.title = "Jabber";
    // logging in, logging out, users being deleted, etc
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) {
        this.props.history.push("/login");
      } else {
        console.log("Welcome, " + _usr.email);
      }
    });
  };
  toggleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };
}

export default Dashboard;
