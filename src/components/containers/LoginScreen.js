import React, { Component } from "react";

import { Header, Button } from "semantic-ui-react";

import { connect } from "react-redux";

import { login } from "../../actions/AuthActions";

class LoginScreen extends Component {

    render() {
        return (
            <center>
                <div className="ui active dimmer" style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}>
                    <div className="ui huge text loader">Loading</div>
                </div>
            </center>
        )
    }

}

export default connect(null, {login})(LoginScreen);