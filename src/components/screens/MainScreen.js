import React, { Component } from "react";

import { connect } from "react-redux";

import { moveTo } from "../../actions/PagesActions";

import * as multiplayer from "../../multiplayer";
import { getNickname } from "../../auth/Profile";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      join_loading: false,
      join_error: null,
      create_loading: false,
      create_error: null,
      partyId: "",
    };

    this.updatePartyId = this.updatePartyId.bind(this);
    this.joinParty = this.joinParty.bind(this);
    this.createParty = this.createParty.bind(this);
    this.partyNotFound = this.partyNotFound.bind(this);
    this.createPartyError = this.createPartyError.bind(this);
  }

  updatePartyId(event) {
    this.setState({
      partyId: event.target.value,
    });
  }

  joinParty() {
    if (getNickname() === "") {
      this.props.moveTo("profile");
      return;
    }

    this.setState({
      join_loading: true,
      join_error: null,
    });

    window.onJoinError = (err) => {
      this.setState({
        join_loading: false,
        join_error: err,
      });
    };
    multiplayer.joinRoom(this.state.partyId);
  }

  partyNotFound() {
    this.setState({
      join_loading: false,
      join_error: "Party not found",
    });
  }

  createParty() {
    if (getNickname() === "") {
      this.props.moveTo("profile");
      return;
    }

    this.setState({
      create_loading: true,
      create_error: null,
    });
    multiplayer.createRoom();
  }

  createPartyError() {
    this.setState({
      create_loading: false,
      create_error: "Error creating a party",
    });
  }

  renderError(err) {
    if (err) {
      return (
        <div>
          <br />
          <div>{err}</div>
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <br />
          <br />
        </div>
      );
    }
  }

  render() {
    const { join_loading } = this.state;

    return (
      <div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <img src={require("../../asset/img/logo.jpg").default} style={{ height: "30vh" }} />
          <div className="ui divider"></div>
          <h1>Join a party</h1>
          <div className={"ui icon input" + (join_loading ? " loading" : "")}>
            <input
              type="number"
              placeholder="Party ID..."
              value={this.state.partyId}
              onChange={this.updatePartyId}
            />
            <i className="play link icon" onClick={this.joinParty}></i>
          </div>
          {this.renderError(this.state.join_error)}
          or
          <h1>Create a party</h1>
          <button
            className={
              "ui button" + (this.state.create_loading ? " loading" : "")
            }
            onClick={this.createParty}
          >
            Create new party
          </button>
          {this.renderError(this.state.create_error)}
        </div>

        <div
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            marginTop: ".5em",
            fontSize: "2em",
          }}
        >
          <i
            className="cog link icon"
            onClick={() => this.props.moveTo("profile")}
          ></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    join_loading: state.auth.login,
  };
};

export default connect(mapStateToProps, { moveTo })(MainScreen);
