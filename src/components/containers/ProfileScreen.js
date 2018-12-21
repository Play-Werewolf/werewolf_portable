import React, { Component } from "react";

import { connect } from "react-redux";

import { getNickname, setNickname } from "../../auth/Profile";
import { moveTo } from "../../actions/PagesActions";

class ProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: ""
        };

        this.nicknameChanged = this.nicknameChanged.bind(this);
        this.save = this.save.bind(this);
        this.discard = this.discard.bind(this);
    }

    componentWillMount() {
        this.setState({
            nickname: getNickname()
        });
    }

    nicknameChanged(event) {
        this.setState({
            nickname: event.target.value
        });
    }

    save() {
        const { nickname } = this.state;
        if (nickname === "") {
            alert("Nickname can't be empty");
        }
        else {
            setNickname(nickname);
            this.props.moveTo("main");
        }
    }

    discard() {
        this.props.moveTo("main");
    }

    render() {
        return (
            <div>
                <br/>
                <center>
                    <h1>Profile</h1>
                </center>
                <br/>
                <div className="ui container">
                    <span style={ styles.txt }>Nickname</span><br/>
                    <div className="ui input" style={{width: "100%" }}>
                        <input type="text" placeholder="Your nickname" value={this.state.nickname} onChange={this.nicknameChanged} />
                    </div>
                    <br/><br/>
                    <div style={{ float: "right" }}>
                        <button className="ui primary button" onClick={this.save}>Save</button>
                        <button className="ui button" onClick={this.discard}>Discard</button>
                    </div>
                </div>
            </div>
        );
    }

}

const styles = {
    txt: {
        fontSize: "large",
        lineHeight: "2em"
    }
};

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps, { moveTo })(ProfileScreen);