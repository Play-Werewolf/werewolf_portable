import React, { Component } from "react";
import { connect } from "react-redux";
import { RoleNames, RoleColors, Presets } from "../../Game";

import { moveTo } from "../../actions/PagesActions";
import { addRole, removeRole, setPreset } from "../../multiplayer";

class SetupScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roles: []
        };

        if (window.io) {
            window.io.off("roles_list");
            window.io.on("roles_list", (list) => {
                this.setState({roles: list});
            });
        }
    }

    componentDidMount() {
        $(".ui.dropdown").dropdown();
    }

    renderRoleBtn(role, name, color, customStyle = {}) {
        return (
            <button onClick={ () => addRole(role) } className={"ui inverted fluid button " + color} style={{ marginBottom: "5px", ...customStyle }}>
                {name}
            </button>
        )
    }

    renderRoleCard(key, name, color) {
        console.log(name);
        var style = color == "white" ? {background: "linear-gradient(to right, orange , yellow, green, cyan, blue, violet)"} : {};
        return (
            <button key={key} onClick={ () => removeRole(key) } className={"ui fluid button " + color} style={{ marginBottom: "5px", ...style }}>
                {name}
            </button>
        )
    }

    renderRolesList() {
        console.log(this.props);
        return this.props.roles.map((x, i) => this.renderRoleCard(i, RoleNames[x], RoleColors[x]))
    }

    presetClick(e) {
        e = e || window.event;
        var target = e.target || s.srcElement;
        setPreset(target.getAttribute("data-value"));
        window.cE = target;
    }

    render() {
        return (
            <div>
                <div style={{ position: "fixed", right: 0, bottom: 0, marginBottom: "1em", marginRight: "0.5em", zIndex: 10 }}>
                    <button className="ui primary button" onClick={ () => this.props.moveTo("game") }>Return</button>
                </div>
                
                <center>
                    <h2>Game Preset</h2>
                    <br/>
                </center>
                <div className="ui container grid two columns" style={{ height: "80vh" }}>
                    <div className="ui column" style={{ overflowY: "auto", height: "100%" }}>
                        <center>Add roles:</center>
                        <div onClick={ (e) => this.presetClick(e) }>
                            <select className="ui fluid dropdown">
                                <option value="">Presets</option>
                                {
                                    Object.keys(Presets).map(preset => (
                                        <option key={ preset } value={ preset }>{ Presets[preset].name }</option> 
                                    ))
                                }
                            </select>
                        </div><br/>
                        { this.renderRoleBtn("VILLAGER", "Villager", "green") }
                        { this.renderRoleBtn("HEALER", "Healer", "green") }
                        { this.renderRoleBtn("SEER", "Fortune Teller", "green") }
                        { this.renderRoleBtn("SPY", "Spy", "green") }
                        { this.renderRoleBtn("INVESTIGATOR", "Investigator", "green") }
                        { this.renderRoleBtn("VETERAN", "Veteran", "green") }
                        { this.renderRoleBtn("PRIEST", "Priest", "green") }
                        <hr/>
                        { this.renderRoleBtn("WEREWOLF", "Werewolf", "red") }
                        { this.renderRoleBtn("WOLF_SEER", "Wolf Seer", "red") }
                        <hr/>
                        { this.renderRoleBtn("WITCH", "Witch", "purple") }
                        { this.renderRoleBtn("JESTER", "Jester", "blue") }
                        <hr/>
                        { this.renderRoleBtn("TOWN_INV", "♦ Invest ♦", "green") }
                        { this.renderRoleBtn("TOWN_ATCK", "♦ Attack ♦", "green") }
                        { this.renderRoleBtn("TOWN_RAND", "♦ Random ♦", "green") }
                        { this.renderRoleBtn("WOLF_RAND", "♦ Random ♦", "red") }
                        { this.renderRoleBtn("RANDOM", "Random", "white", { background: "linear-gradient(to right, orange , yellow, green, cyan, blue, violet)" }) }
                    </div>
                    <div className="ui column" style={{ overflowY: "auto", height: "100%" }}>
                        <center>Roles:</center>
                        { this.renderRolesList() }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        roles: state.mp ? (state.mp.roles || []) : []
    }
};

export default connect(mapStateToProps, { moveTo })(SetupScreen);