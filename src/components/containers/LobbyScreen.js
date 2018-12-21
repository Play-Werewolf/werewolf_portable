import React, { Component } from "react";
import { connect } from "react-redux";

class LobbyScreen extends Component {

    constructor(props) {
        super(props);

        this.renderPlayerList = this.renderPlayerList.bind(this);
        this.renderSun = this.renderSun.bind(this);
        this.renderPregameHeader = this.renderPregameHeader.bind(this);
        this.renderIngameHeader = this.renderIngameHeader.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    renderPlayerCard(player) {
        return (
            <div className="ui fluid card" key={player.id}>
                <div className="image">
                    <img src={player.img} />
                </div>
                <div className="content" style={{ padding: "0.2em" }}>
                    <b>{player.name}</b>
                </div>
            </div>
        )
    }

    renderPlayerList() {
        var col1 = this.props.players.filter((_, i) => i % 4 == 0).map(x => this.renderPlayerCard(x));
        var col2 = this.props.players.filter((_, i) => i % 4 == 1).map(x => this.renderPlayerCard(x));
        var col3 = this.props.players.filter((_, i) => i % 4 == 2).map(x => this.renderPlayerCard(x));
        var col4 = this.props.players.filter((_, i) => i % 4 == 3).map(x => this.renderPlayerCard(x));
        return (
            <div className="ui four column grid">            
                <div className="ui column" style={{ padding: "0.2rem" }}>{ col1 }</div>
                <div className="ui column" style={{ padding: "0.2rem" }}>{ col2 }</div>
                <div className="ui column" style={{ padding: "0.2rem" }}>{ col3 }</div>
                <div className="ui column" style={{ padding: "0.2rem" }}>{ col4 }</div>
            </div>
        );
    }

    renderStartButton() {
        if (this.props.is_host && !this.props.in_game) {
            return (
                <div style={{ position: "fixed", right: 0, top: 0, marginTop: "1em", marginRight: "0.5em", zIndex: 10 }}>
                    <button className="ui primary button">Start</button>
                </div>
            );
        }
        else return null;
    }

    renderSun() {
        if (this.props.in_game) {
            return (
                <div style={{ position: "fixed", left: 0, top: 0, marginTop: "1.5em", marginLeft: "0.5em", zIndex: 10 }}>
                    <i className={"ui icon " + (this.props.is_night ? "moon" : "sun")} style={{ fontSize: "2em" }}></i>
                </div>
            );
        }
    }

    renderPregameHeader() {
        return (
            <div style={styles.headerStyle}>
                Party id:
                <h1>{this.props.partyId}</h1>
            </div>
        );
    }

    renderIngameHeader() {
        return (
            <div style={{...styles.headerStyle, marginLeft: "3em", marginTop: ".5em"}}>
                <h3>{this.props.message}</h3>
            </div>
        )
    }

    renderHeader() {
        if (this.props.in_game) {
            return this.renderIngameHeader();
        }
        else {
            return this.renderPregameHeader();
        }
    }

    render() {
        const style = this.props.is_night && this.props.in_game ? styles.night : styles.day;
        return (
            <div>
            <div style={{ ...style, position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}>&nbsp;</div>
            <div style={{ ...style, position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                <center style={{ ...style, position: "fixed", top: 0, right: 0, left: 0, zIndex: 9 }}>
                    { this.renderHeader() }
                </center>

                <center> {/*placeholder*/}
                    { this.renderHeader() }
                </center>

                <div className="ui divider"></div>
                
                <div className="ui container">
                    { this.renderPlayerList() }
                </div>

                { this.renderStartButton() }

                { this.renderSun() }
            </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        partyId: state.mp.roomId,
        players: state.mp.players,
        is_host: true,
        in_game: true,
        is_night: false,
        message: "He was attacked by the werewolves."
    };
};

const styles = {
    night: {
        backgroundColor: "#111",
        color: "royalBlue"
    },
    day: {
        backgroundColor: "#f3f3f3"
    },
    headerStyle: {
        minHeight: "10vh"
    }
}

export default connect(mapStateToProps)(LobbyScreen);