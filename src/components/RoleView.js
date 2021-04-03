import React, { Component } from "react";

import { RoleImages, RoleNames } from "../Game";
import role_lot from "../asset/img/role_lot.gif";

import posed from "react-pose";

const RoleH1 = posed.h1({
  visible: {
    opacity: 1,
    transition: {
      duration: 1000,
    },
  },
  hidden: {
    opacity: 0,
  },
});

const RoleImg = posed.img({
  visible: {
    opacity: 1,
    transition: {
      duration: 1000,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 1000,
    },
  },
});

class RoleView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phase: this.props.immediate ? 2 : 0,
    };

    this.renderRole = this.renderRole.bind(this);
  }

  componentDidMount() {
    if (!this.props.immediate) {
      this.timeout = setTimeout(() => {
        this.setState({ phase: 1 });
        this.timeout = setTimeout(() => {
          this.setState({ phase: 2 });
        }, 1300);
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  renderRole() {
    var url =
      this.state.phase === 2
        ? RoleImages[this.props.role]
        : require("../asset/img/role_lot.gif").default;
    var imgv = this.state.phase === 1 ? "hidden" : "visible";
    var txtv = this.state.phase === 2 ? "visible" : "hidden";
    return (
      <div>
        <RoleImg pose={imgv} style={{ width: "50vh" }} src={url} />
        <center>
          <RoleH1 pose={txtv}>{RoleNames[this.props.role]}</RoleH1>
        </center>
      </div>
    );
  }

  render() {
    return (
      <center>
        <h3>You are a...</h3>
        {this.renderRole()}
      </center>
    );
  }
}

export default RoleView;
