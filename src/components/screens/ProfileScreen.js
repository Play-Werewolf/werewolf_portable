import React, { Component } from "react";

import { connect } from "react-redux";

import {
  getNickname,
  setNickname,
  setColor,
  getColor,
  getAvatar,
  setAvatar,
} from "../../auth/Profile";
import { moveTo } from "../../actions/PagesActions";

import * as multiplayer from "../../multiplayer";
import { SquareImage } from "../SquareImage";

const colors = [
  "#87ceeb", // light blue
  "#eb87ce", // pink
  "#afcd38", // light green
  "#737dff", // dark blue
  "#ff737d", // red
  "#cda138", // brown
  "#cd38af", // purple
  "#ffff66", // yellow
];

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      color: "skyblue",
      avatarOptions: [],
      avatar: "",
    };

    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.save = this.save.bind(this);
    this.discard = this.discard.bind(this);
  }

  componentWillMount() {
    this.setState({
      nickname: getNickname(),
      color: getColor(),
      avatar: getAvatar(),
    });

    window.io.off("bitmoji");
    window.io.on("bitmoji", (data) => {
      this.setState({
        avatarOptions: data,
      });
      window.Modal.open(
        <div>
          <center>
            <h3>Select your avatar</h3>
          </center>

          <br />

          <div
            className="ui four cards"
            style={{ overflowY: "scroll", maxHeight: "70vh", padding: "20px" }}
          >
            {this.renderCards()}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              textAlign: "right",
            }}
          >
            <button
              className="ui secondary button"
              onClick={this.avatarSelection}
            >
              Re-Shuffle
            </button>
            <button className="ui button" onClick={() => window.Modal.close()}>
              Cancel
            </button>
          </div>
        </div>
      );
    });
  }

  nicknameChanged(event) {
    this.setState({
      nickname: event.target.value,
    });
  }

  save() {
    const { nickname, color, avatar } = this.state;
    if (nickname === "") {
      alert("Name can't be empty");
    } else {
      setNickname(nickname);
      setColor(color);
      setAvatar(avatar);
      multiplayer.setDetails({
        nickname: nickname,
        color: color,
        avatar: avatar,
      });
      this.props.moveTo("main");
    }
  }

  discard() {
    this.props.moveTo("main");
  }

  renderBtnColor(color) {
    return (
      <button
        key={color}
        className={"circular ui icon button"}
        style={{ backgroundColor: color }}
        onClick={() => this.setState({ color: color })}
      >
        <i
          className={"icon" + (this.state.color === color ? " circle" : "")}
        ></i>
      </button>
    );
  }

  setAvatar(a) {
    this.setState({
      avatar: a,
    });
    window.Modal.close();
  }

  renderCards() {
    return this.state.avatarOptions.map((x) => (
      <div key={x} style={{ width: "25%" }} onClick={() => this.setAvatar(x)}>
        <img src={x} style={{ maxWidth: "90%", maxHeight: "90%" }} />
      </div>
    ));
  }

  avatarSelection() {
    window.io.emit("bitmoji");
  }

  render() {
    return (
      <div>
        <br />
        <center>
          <h1>Profile</h1>
        </center>
        <br />
        <div className="ui container">
          <span style={styles.txt}>Name</span>
          <br />
          <div className="ui input" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Your name"
              value={this.state.nickname}
              onChange={this.nicknameChanged}
            />
          </div>
          <br />
          <br />

          <span style={styles.txt}>Color</span>
          <br />
          {colors.map((x) => this.renderBtnColor(x))}
          <br />
          <br />

          <span style={styles.txt}>
            Avatar <i>(Click to change)</i>
          </span>
          <br />
          <br />
          <center>
            <img
              style={{ height: "20vh" }}
              src={this.state.avatar}
              onClick={this.avatarSelection.bind(this)}
            />
          </center>
          <br />
          <br />

          <div style={{ float: "right" }}>
            <button className="ui primary button" onClick={this.save}>
              Save
            </button>
            <button className="ui button" onClick={this.discard}>
              Discard
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  txt: {
    fontSize: "large",
    lineHeight: "2em",
  },
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { moveTo })(ProfileScreen);
