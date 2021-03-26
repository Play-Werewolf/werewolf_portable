import React, { Component } from "react";

class NotificationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false,
    };

    this.btnClick = this.btnClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      shown: true,
    });
  }

  renderMsg(msgTxt, id) {
    return (
      <div key={id} className="ui floating message">
        <p>{msgTxt}</p>
      </div>
    );
  }

  renderMessages() {
    if (!this.state.shown) {
      return;
    }

    if (!this.props.messages || !this.props.messages.length) {
      return this.renderMsg("You have no new notifications", 0);
    }

    return this.props.messages.map((m, i) => this.renderMsg(m, i));
  }

  btnClick() {
    this.setState({ shown: !this.state.shown });
  }

  render() {
    return (
      <div>
        <center>
          <h1>New notifications</h1>
          {/* <p style={{lineHeight: "1.4ehm"}}>You might have some new notifications</p>
                    
                    <button className="ui button"
                        onClick={ this.btnClick }>
                        { this.state.shown ? "Hide" : "Show" }
                    </button> */}
        </center>
        <br />

        {this.renderMessages()}
      </div>
    );
  }
}

export default NotificationView;
