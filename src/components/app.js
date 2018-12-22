import React, { Component } from 'react';

import { connect } from "react-redux";

import LoginScreen from "./containers/LoginScreen";
import MainScreen from "./containers/MainScreen";
import ProfileScreen from "./containers/ProfileScreen";

import LobbyScreen from "./containers/LobbyScreen";
import SetupScreen from "./containers/SetupScreen";

class App extends Component {
  render() {
    switch (this.props.page) {
      case "main":
        return <MainScreen/>
      case "profile":
        return <ProfileScreen/>
      case "login":
        return <LoginScreen/>
      case "dev": 
        return <MainScreen/>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.pages.page
  };
};

export default connect(mapStateToProps)(App);