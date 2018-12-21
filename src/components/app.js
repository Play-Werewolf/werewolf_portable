import React, { Component } from 'react';

import { connect } from "react-redux";

import LoginScreen from "./containers/LoginScreen";
import MainScreen from "./containers/MainScreen";
import ProfileScreen from "./containers/ProfileScreen";

class App extends Component {
  render() {
    switch (this.props.page) {
      case "main":
        return <MainScreen/>
      case "profile":
        return <ProfileScreen/>
      case "login":
        return <LoginScreen/>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.pages.page
  };
};

export default connect(mapStateToProps)(App);