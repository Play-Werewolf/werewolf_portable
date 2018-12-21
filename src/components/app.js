import React, { Component } from 'react';

import { connect } from "react-redux";

import LoginScreen from "./containers/LoginScreen";
import MainScreen from "./containers/MainScreen";

class App extends Component {
  render() {
    return <MainScreen/>
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login
  };
};

export default connect(mapStateToProps)(App);