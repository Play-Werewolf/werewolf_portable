import React, { Component } from "react";

import posed from "react-pose";

var TriedImage = posed.img({
  visible: {
    top: 20,
  },
  hidden: {
    top: "100%",
    transition: {
      duration: 500,
    },
  },
});

class ExecutionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgshown: "visible",
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({
        imgshown: "hidden",
      });
    }, 3000);
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout());
  }

  render() {
    var graveStyle = this.state.imgshown ? { opacity: 1 } : { opacity: 0 };

    return (
      <>
        <center>
          <div className="ui card">
            <div className="content">
              <div className="header">
                The town has decided to execute {this.props.player.name}.
              </div>
            </div>
            <div
              className="content"
              style={{ fontStyle: "italic", color: "black" }}
            >
              May god have mercy on your soul, {this.props.player.name}
            </div>
            <div
              className="image"
              style={{ overflow: "hidden", width: "50vw" }}
            >
              <img
                src={"https://i.imgur.com/D4Lko8G.png"}
                alt=""
                style={graveStyle}
              />
              <TriedImage
                src={this.props.player.image}
                style={styles.overlapping}
                pose={this.state.imgshown}
              />
            </div>
            <br />
          </div>
        </center>
        <div style={{ height: "100vh" }}>&nbsp;</div>
      </>
    );
  }
}

const styles = {
  overlapping: {
    position: "absolute",
    top: "10%",
    left: "10%",
    height: "80%",
    width: "auto",
  },
};

export default ExecutionView;
