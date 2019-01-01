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
    multiplayer.init(this.props.dispatch);
    window.onConnected.push(function() {
      multiplayer.setDetails({
        nickname: location.hash.substr(1) || getNickname(),
        color: getColor(),
        avatar: getAvatar()
      });
    })
  }

  renderScreen() {
    if (!this.props.connected) {
      return <LoginScreen/>;
    }

    if (this.props.roomId) {
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