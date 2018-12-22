import React, { Component } from "react";
import { connect } from "react-redux";

class SetupScreen extends Component {

    render() {
        return (
            <div>
                <div style={{ position: "fixed", left: 0, bottom: 0, marginBottom: "1em", marginLeft: "0.5em", zIndex: 10 }}>
                    <button className="ui button">Cancel</button>
                </div>
                <div style={{ position: "fixed", right: 0, bottom: 0, marginBottom: "1em", marginRight: "0.5em", zIndex: 10 }}>
                    <button className="ui primary button">Save</button>
                </div>

                <center>
                    <h2>Choose a game template</h2>
                    <br/>
                </center>
                <div className="ui container grid two columns">
                    <div className="ui column">
                        <button className="ui button">Classic</button><br/>
                        <button className="ui button">Jester></button><br/>
                    </div>
                    <div className="ui column">right</div>
                </div>
            </div>
        );
    }

}

export default SetupScreen;