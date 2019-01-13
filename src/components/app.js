import React, { Component } from 'react';

import { connect } from "react-redux";

import LoginScreen from "./containers/LoginScreen";
import MainScreen from "./containers/MainScreen";
import ProfileScreen from "./containers/ProfileScreen";

import LobbyScreen from "./containers/LobbyScreen";
import SetupScreen from "./containers/SetupScreen";

import * as multiplayer from "../multiplayer";
import { getNickname, getColor, getAvatar } from "../auth/Profile";

import Modal from "./Modal";

class App extends Component {

  componentDidMount() {
    //location.href = "#";
    multiplayer.init(this.props.dispatch);
    window.onConnected.push(function() {
      multiplayer.setDetails({
        nickname: getNickname(),
        color: getColor(),
        avatar: getAvatar()
      });
    })

    if (false) // change to false on production
    {
      window.localStorage.__proto__ = Object.create(Storage.prototype);
      window.localStorage.__proto__.setItem = (x, v) => { window["__local__" + x] = v; }
      window.localStorage.__proto__.getItem = (x) => window["__local__" + x];
    }
  }

  renderDimmer() {
    if (!this.props.connected) {
      return <LoginScreen/>;
    }
  }

  renderScreen() {
    // if (!this.props.connected) {
    //   return <MainScreen/>;
    // }

    if (this.props.roomId) {
      if (this.props.page == "setup") {
        return <SetupScreen/>
      }
      return <LobbyScreen/>
    }

    if (this.props.page == "profile") {
      return <ProfileScreen/>
    }

    return <MainScreen/>
  }

  render() {
    return (
      <div>
      { this.renderScreen() }
      { this.renderDimmer() }
      <Modal/>
      </div>
    )
  }
    
}

const mapStateToProps = (state) => {
  return {
    page: state.pages.page,
    connected: state.mp.connected,
    roomId: state.mp.roomId
  };
};

export default connect(mapStateToProps)(App);