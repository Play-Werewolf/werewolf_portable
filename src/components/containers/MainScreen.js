import React, { Component } from "react";

import { connect } from "react-redux";

class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            join_loading: false,
            join_error: null,
            create_loading: false,
            create_error: null,
            partyId: ""
        };

        this.updatePartyId = this.updatePartyId.bind(this);
        this.joinParty = this.joinParty.bind(this);
        this.createParty = this.createParty.bind(this);
        this.partyNotFound = this.partyNotFound.bind(this);
        this.createPartyError = this.createPartyError.bind(this);
    }

    updatePartyId(event) {
        this.setState({
            partyId: event.target.value
        });
    }

    joinParty() {
        this.setState({
            join_loading: true,
            join_error: null
        });

        setTimeout(() => {
            this.partyNotFound();
        }, 2000);
    }

    partyNotFound() {
        this.setState({
            join_loading: false,
            join_error: "Party not found"
        })
    }

    createParty() {
        this.setState({
            create_loading: true,
            create_error: null
        });
        setTimeout(() => {
            this.createPartyError();
        }, 2000);
    }

    createPartyError() {
        this.setState({
            create_loading: false,
            create_error: "Error creating a party"
        });
    }

    renderError(err) {
        if (err) {
            return (
                <div>
                    <br/>
                    <div>{ err }</div>
                    <br/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <br/><br/><br/>
                </div>
            )
        }
    }

    render() {

        const { join_loading } = this.state;
        
        return (
            <div>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <img src="/asset/img/logo.jpg" style={{ height: "30vh" }}/>
                    
                    <div className="ui divider"></div>

                    <h1>Join a party</h1>
                    <div className={"ui icon input" + (join_loading ? " loading" : "") }>
                        <input type="text" placeholder="Party ID..." value={ this.state.partyId } onChange={ this.updatePartyId } />
                        <i className="play link icon" onClick={ this.joinParty }></i>
                    </div>

                    { this.renderError(this.state.join_error) }
                    
                    or
                    <h1>Create a party</h1>
                    <button className={ "ui button" + (this.state.create_loading ? " loading": "") } onClick={ this.createParty }>Create new party</button>
                    { this.renderError(this.state.create_error) }
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        join_loading: state.auth.login
    }
}

export default connect(mapStateToProps)(MainScreen);