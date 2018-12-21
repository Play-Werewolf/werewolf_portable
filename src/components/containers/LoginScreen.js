import React, { Component } from "react";

import { Header, Button } from "semantic-ui-react";

import { connect } from "react-redux";

import { login } from "../../actions/AuthActions";

class LoginScreen extends Component {

    render() {
        return (
            <center>
                <Header as="h2">Werewolf</Header>
                <br/><br/><br/>
                <Button onClick={ () => this.props.login() }>Play</Button>
            </center>
        )
    }

}

export default connect(null, {login})(LoginScreen);