import React, { Component } from "react";
import posed from "react-pose";
import NotificationView from "./NotificationsView";

const PosedModal = posed.div({
  open: {
    marginBottom: "5px",
    marginTop: "5px",
    opacity: 1,
    transition: {
      duration: 300,
      ease: "backOut",
    },
  },
  closed: {
    marginBottom: "50%",
    marginTop: "50%",
    opacity: 0,
  },
  hardClosed: {
    marginBottom: "50%",
    marginTop: "50%",
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
});

class Modal extends Component {
  constructor(props) {
    super(props);

    window.Modal = this;

    this.state = {
      openState: "closed",
      display: "none",
    };

    this.modalContent = null;
  }

  __show() {
    this.setState({
      openState: "open",
      display: "",
    });
  }

  __hide() {
    this.setState({
      openState: "hardClosed",
      display: "none",
    });
  }

  __close() {
    this.setState({
      openState: "closed",
    });
    setTimeout(() => {
      if (
        this.state.openState == "closed" ||
        this.state.openState == "hardClosed"
      ) {
        this.setState({
          display: "none",
        });
      }
    }, 500);
  }

  open(content) {
    console.log(this.state.openState);
    this.modalContent = content;
    if (this.state.openState == "open") {
      this.__hide();
      setTimeout(() => this.__show(), 1);
    } else {
      this.__show();
    }
  }

  close() {
    this.__close();
  }

  componentWillMount() {}

  render() {
    return (
      <PosedModal
        pose={this.state.openState}
        style={{ ...styles.modal, display: this.state.display }}
      >
        {this.modalContent}
      </PosedModal>
    );
  }
}

const styles = {
  modal: {
    margin: "15px",
    padding: "10px",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    backgroundColor: "#ececec",
    borderRadius: "10px",
    fontSize: "larger",
    border: "4px solid #ac6635",
    zIndex: 10,
  },
};

export default Modal;

window.xx = () => {};
