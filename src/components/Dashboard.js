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
    // setTimeout(() => this.setState({ navOpen: true }), 2000);
    // setTimeout(() => this.setState({ navOpen: false }), 4000);
  };
  toggleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };
}

export default Dashboard;
