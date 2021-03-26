import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Phases,
  Roles,
  RoleNames,
  RoleImages,
  RoleMessages,
  RoleCustomButtons,
  RoleColors,
} from "../../../Game";

import { moveTo } from "../../../actions/PagesActions";

import RoleView from "../../RoleView";
import ExecutionView from "../../ExecutionView";

import * as multiplayer from "../../../multiplayer";

import posed from "react-pose";
import MusicPlayer from "../../MusicPlayer";

import PlayerCard from "./PlayerCard";
import WinnersList from "./WinnersList";
import styles from "./styles";

const TimerLbl = posed.div({
  visible: {
    right: 0,
    left: "",
  },
  hidden: {
    right: "",
    left: "100%",
  },
});

class LobbyScreen extends Component {
  constructor(props) {
    super(props);

    this.renderPlayerList = this.renderPlayerList.bind(this);
    this.renderSun = this.renderSun.bind(this);
    this.renderPregameHeader = this.renderPregameHeader.bind(this);
    this.renderIngameHeader = this.renderIngameHeader.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderMainDiv = this.renderMainDiv.bind(this);

    this.state = {
      timer: null,
    };
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      var time = this.props.timer
        ? Math.max(0, this.props.timer - new Date().getTime())
        : null;
      if (time !== this.state.timer) this.setState({ timer: time });
    }, 150);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  renderPlayerList(options) {
    var colsAmount = 4;
    var cols = [];
    for (let n = 0; n < colsAmount; n++) {
      cols.push(
        this.props.players
          .filter((_, i) => i % colsAmount === n)
          .map((x, i) => (
            <PlayerCard
              key={i}
              player={x}
              options={options ?? {}}
              highlightVote={this.props.player.vote === x.id}
            ></PlayerCard>
          ))
      );
    }
    console.log(cols);
    return (
      <div className="ui four column grid">
        {cols.map((col, i) => {
          <div className="ui column" key={i} style={{ padding: "0.2rem" }}>
            {col}
          </div>;
        })}
      </div>
    );
  }

  sendSkip() {
    multiplayer.skipDay();
  }

  renderStartButton() {
    if (this.props.is_host && !this.props.in_game) {
      return (
        <div>
          <div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              marginTop: "1em",
              marginRight: "0.5em",
              zIndex: 10,
            }}
          >
            <button
              style={{ backgroundColor: "#ac6635", color: "#f3f3f3" }}
              className="ui button"
              onClick={this.sendStartGame}
            >
              Start
            </button>
          </div>
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              marginTop: "1em",
              marginLeft: "0.5em",
              zIndex: 10,
            }}
          >
            <button
              className="ui button"
              onClick={() => this.props.moveTo("setup")}
            >
              Setup
            </button>
          </div>
        </div>
      );
    } else if (this.props.is_host && this.props.phase === Phases.DISCUSSION) {
      return (
        <div>
          <div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              marginTop: "1em",
              marginRight: "0.5em",
              zIndex: 10,
            }}
          >
            <button
              style={{ backgroundColor: "#ac6635", color: "#f3f3f3" }}
              className="ui button"
              onClick={this.sendSkip}
            >
              Skip
            </button>
          </div>
        </div>
      );
    }
  }

  renderSun() {
    if (this.props.in_game) {
      return (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            marginTop: "1em",
            marginLeft: "0.5em",
            zIndex: 10,
          }}
        >
          <i
            className={"ui icon " + (this.props.is_night ? "moon" : "sun")}
            style={{ fontSize: "2em" }}
          ></i>
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
    var msg =
      {
        ROLE_SELECTION: "ROLES LOT...",
        PRE_GAME: "Get ready to play...",
        NIGHT_TRANSITION: "The night shall now begin...",
        NIGHT: "Night",
        DAY_TRANSITION: "The day shall now begin...",
        DISCUSSION: "Discussion...",
        EXECUTION: "Execution!",
        GAME_OVER: "Game over!",
      }[this.props.phase] || this.props.message;

    if (this.props.player.active && this.props.phase === Phases.NIGHT) {
      if (this.props.nightIndex === "SPOOKY_DOLL") {
        msg = "Pass the spooky doll to someone";
      } else {
        msg = RoleMessages[this.props.player.role];
      }
    }
    return (
      <div
        style={{ ...styles.headerStyle, marginLeft: "3em", marginTop: ".5em" }}
      >
        <h3>{msg}</h3>
      </div>
    );
  }

  renderHeader() {
    if (this.props.in_game) {
      return (
        <div>
          {this.renderIngameHeader()}
          {this.renderSun()}
        </div>
      );
    } else {
      return this.renderPregameHeader();
    }
  }

  renderRoleSelection() {
    return <RoleView role={this.props.player.role} />;
  }

  renderBanner(icon) {
    return (
      <center>
        <div style={{ position: "block", height: "20vh" }}></div>
        <i className={"massive icon " + icon}></i>
      </center>
    );
  }

  kickPlayer(p) {
    if (this.props.is_host) {
      multiplayer.kick(p.id);
    }
  }

  renderGameOver() {
    var msgs = {
      WEREWOLVES: "Werewolves Win!",
      VILLAGE: "Village Wins!",
      DRAW: "Wipeout!",
      NOKILL: "Draw! (no kills)",
      NEUTRAL: "Neutral Players Win!",
      WITCH: "Witch wins!",
      ARSONIST: "Arsonist wins!",
      FOOL: "Fool wins!",
    };

    return (
      <center>
        <div style={{ position: "block", height: "10vh" }}></div>
        <h1>{msgs[this.props.winning_faction] || "Draw!"}</h1>
        <WinnersList winners={this.props.players.filter((x) => x.won)} />
      </center>
    );
  }

  renderRolesList() {
    return this.props.roles.slice(0, this.props.players.length).map((x, i) => (
      <div
        key={i}
        style={{
          display: "inline-block",
          fontWeight: "bold",
          color: RoleColors[x],
        }}
      >
        {RoleNames[x]},&nbsp;&nbsp;
      </div>
    ));
  }

  renderIdleDiv() {
    return (
      <div>
        {this.renderPlayerList({
          onclick: (p) => this.kickPlayer(p),
        })}
        <p>&nbsp;</p>
        <div>Roles: {this.renderRolesList()}</div>
      </div>
    );
  }
  // To Do: Make this work
  // renderMainDiv() {
  //   var { phase } = this.props;

  //   var phases = {
  //     [Phases.LOBBY]: this.renderIdleDiv(),
  //     [Phases.ROLE_SELECTION]: this.renderRoleSelection(),
  //     [Phases.PRE_GAME]: this.renderPlayerList(),
  //     [Phases.DAY_CALLOUTS]: this.renderPlayerList(),
  //     [Phases.NIGHT_TRANSITION]: this.renderBanner("moon"),
  //     [Phases.NIGHT]: this.renderNightdiv(),
  //     [Phases.DAY_TRANSITION]: this.renderBanner("sun"),
  //     [Phases.DISCUSSION]: this.renderPlayerList({
  //       onclick: (player) => multiplayer.setVote(player.id),
  //       votes: (player) =>
  //         this.props.players.filter((x) => x.vote === player.id).length,
  //     }),
  //     [Phases.TRIAL]: this.renderTrial(),
  //     [Phases.EXECUTION]: this.renderExecution(),
  //     [Phases.GAME_OVER]: this.renderGameOver(),
  //   };

  //   return phases[phase]();
  // }

  renderMainDiv() {
    var { phase } = this.props;

    if (phase == Phases.LOBBY) {
      return this.renderIdleDiv();
    } else if (phase == Phases.ROLE_SELECTION) {
      return this.renderRoleSelection();
    } else if (phase == Phases.PRE_GAME || phase == Phases.DAY_CALLOUTS) {
      return this.renderPlayerList();
    } else if (phase == Phases.NIGHT_TRANSITION) {
      return this.renderBanner("moon");
    } else if (phase == Phases.NIGHT) {
      return this.renderNightdiv();
    } else if (phase == Phases.DAY_TRANSITION) {
      return this.renderBanner("sun");
    } else if (phase == Phases.DISCUSSION) {
      return this.renderPlayerList({
        onclick: (player) => multiplayer.setVote(player.id),
        votes: (player) =>
          this.props.players.filter((x) => x.vote == player.id).length,
      });
    } else if (phase == Phases.TRIAL) {
      return this.renderTrial();
    } else if (phase == Phases.EXECUTION) {
      return this.renderExecution();
    } else if (phase == Phases.GAME_OVER) {
      return this.renderGameOver();
    }
  }

  renderNightdiv() {
    if (this.props.player.active) {
      return (
        <div>
          {this.renderPlayerList({
            onclick: (player) => {
              /*Sends a player payload night action*/
              multiplayer.nightAction(player.id);
            },
            votes:
              this.props.player.role === Roles.WEREWOLF
                ? (player) =>
                    this.props.players.filter(
                      (x) =>
                        x.role === Roles.WEREWOLF &&
                        !x.dead &&
                        x.target === player.id
                    ).length
                : null,
          })}
          {this.renderCustomButtons()}
        </div>
      );
    } else {
      return this.renderBanner("moon");
    }
  }

  renderGuiltyInno() {
    if (this.props.is_host)
      return (
        <div className="extra content">
          <div className="ui two buttons">
            <div
              className="ui basic red button"
              onClick={multiplayer.trialGuilty}
            >
              Execute
            </div>
            <div
              className="ui basic green button"
              onClick={multiplayer.trialInnocent}
            >
              Free
            </div>
          </div>
        </div>
      );
  }

  renderTrial() {
    console.log(this.props.player_on_stand);
    var p = this.props.player_on_stand;
    return (
      <center>
        <div className="ui card">
          <div
            className="image"
            style={{
              width: "50%",
              backgroundColor: "transparent",
              margin: "20px",
            }}
          >
            {console.log(this.props)}
            <img src={p.image} />
          </div>
          <div className="content">
            <div className="header">{p.name}</div>
          </div>
          {this.renderGuiltyInno()}
        </div>
      </center>
    );
  }

  renderExecution() {
    return (
      <div>
        <ExecutionView player={this.props.player_on_stand} />
        <div style={{ height: "100vh" }}>&nbsp;</div>
      </div>
    );
  }

  sendStartGame() {
    multiplayer.startGame();
  }

  renderTimer() {
    var timer = Math.ceil(this.state.timer / 1000 || 0);
    var timestr =
      timer >= 60
        ? Math.floor(timer / 60) + ":" + ("0" + (timer % 60)).slice(-2)
        : timer.toString();
    return (
      <TimerLbl
        pose={this.state.timer ? "visible" : "hidden"}
        style={{ position: "fixed", bottom: "10vh" }}
      >
        <div
          className="ui label big"
          style={{
            backgroundColor: this.props.main_color,
            color: this.props.secondary_color,
            textAlign: "center",
          }}
        >
          <i
            className="time icon"
            style={{ margin: 0, marginBottom: "4px" }}
          ></i>
          <br />
          {timestr}
        </div>
      </TimerLbl>
    );
  }

  renderCustomButtons() {
    return (
      <center>
        <br />
        {this.customButtonList(RoleCustomButtons[this.props.player.role])}
      </center>
    );
  }

  customButtonList(buttons) {
    buttons = buttons || [["Pass", false]];
    return buttons.map((b) => (
      <button
        key={b[0]}
        className="ui primary button"
        onClick={() => multiplayer.nightAction(b[1])}
      >
        {b[0]}
      </button>
    ));
  }

  showRole() {
    console.log(this.props.player);
    if (!this.props.player.role) {
      window.Modal.open(
        <div>
          <center>
            <h1> </h1>
            <h1>Cannot show your role right now</h1>
          </center>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              textAlign: "right",
            }}
          >
            <button className="ui button" onClick={() => window.Modal.close()}>
              Close
            </button>
          </div>
        </div>
      );
    } else {
      window.Modal.open(
        <div>
          <RoleView immediate role={this.props.player.role} />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              textAlign: "right",
            }}
          >
            <button className="ui button" onClick={() => window.Modal.close()}>
              Close
            </button>
          </div>
        </div>
      );
    }
  }

  renderBottomMenu() {
    return (
      <div
        className="ui three item inverted secondary menu"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "black",
        }}
      >
        <a className="item" onClick={() => multiplayer.leaveRoom()}>
          Exit
        </a>
        <a className="item" onClick={this.showRole.bind(this)}>
          Show Role
        </a>
        {this.props.phase === Phases.DISCUSSION ? (
          <a className="item" onClick={() => multiplayer.showNotifications()}>
            Notifications
          </a>
        ) : null}
      </div>
    );
  }

  renderMusic() {
    if (this.props.is_host) {
      return <MusicPlayer phase={this.props.phase} />;
    }
  }

  render() {
    const style =
      this.props.is_night && this.props.in_game ? styles.night : styles.day;
    return (
      <div id="elid">
        <div
          style={{
            ...style,
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        ></div>
        <div
          style={{
            ...style,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <center
            style={{
              ...style,
              position: "fixed",
              top: 0,
              right: 0,
              left: 0,
              zIndex: 9,
            }}
          >
            {this.renderHeader()}
          </center>

          <center>
            {" "}
            {/*placeholder*/}
            {this.renderHeader()}
          </center>

          <div className="ui divider"></div>

          <div className="ui container">{this.renderMainDiv()}</div>
          {this.renderStartButton()}

          {this.renderTimer()}

          {this.renderBottomMenu()}

          {this.renderMusic()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  var __players = [
    {
      id: "182736125",
      role: "VILLAGER",
      name: "Yotam",
      img: "https://semantic-ui.com/images/avatar/small/steve.jpg",
    },
    {
      id: "6345234318",
      name: "Koren",
      img: "https://semantic-ui.com/images/avatar2/small/matthew.png",
    },
    {
      id: "34523657445",
      name: "Ron",
      img: "https://semantic-ui.com/images/avatar2/large/rachel.png",
    },
    {
      id: "09345342314",
      name: "Shai",
      img: "https://semantic-ui.com/images/avatar2/small/elyse.png",
    },
    {
      id: "34543657445",
      name: "Shir",
      img: "https://semantic-ui.com/images/avatar/large/elliot.jpg",
    },
    {
      id: "09394342314",
      dead: true,
      name: "Daniel",
      img: "https://semantic-ui.com/images/avatar/large/daniel.jpg",
    },
    {
      id: "34543657245",
      name: "Shaked",
      img: "https://semantic-ui.com/images/avatar2/large/molly.png",
    },
    {
      id: "09394372314",
      name: "Or",
      img: "https://semantic-ui.com/images/avatar/large/jenny.jpg",
    },
    {
      id: "34543657449",
      name: "Diana",
      img: "https://semantic-ui.com/images/avatar/large/helen.jpg",
    },
    {
      id: "19394342314",
      name: "Kalman",
      img: "https://semantic-ui.com/images/avatar/large/veronika.jpg",
    },
  ];

  // var phase = Phases.LOBBY;
  // var { roomId, clients, message, player_on_stand, id } = state.mp;
  // console.log("Clients ", clients);
  // console.log("Phase ", phase)
  // var me = clients.filter(x => x.id == "182736125")[0];

  // return {
  //     partyId: roomId,
  //     players: clients,
  //     is_host: clients.length > 0 && clients[0].id == me.id,
  //     in_game: ~([
  //         Phases.NIGHT_TRANSITION, Phases.NIGHT,
  //         Phases.DAY_TRANSITION, Phases.DAY_CALLOUTS, Phases.DISCUSSION,
  //         Phases.TRIAL, Phases.EXECUTION,
  //         Phases.GAME_OVER
  //     ]).indexOf(phase),
  //     is_night: ~([
  //         Phases.NIGHT_TRANSITION, Phases.NIGHT
  //     ]).indexOf(phase),
  //     phase: phase,
  //     message: message,
  //     network_id: id,
  //     player: me,
  //     player_on_stand: player_on_stand
  // }

  var in_game = !!~[
    Phases.ROLE_SELECTION,
    Phases.PRE_GAME,
    Phases.NIGHT_TRANSITION,
    Phases.NIGHT,
    Phases.DAY_TRANSITION,
    Phases.DAY_CALLOUTS,
    Phases.DISCUSSION,
    Phases.TRIAL,
    Phases.EXECUTION,
    Phases.GAME_OVER,
  ].indexOf(state.mp.phase);

  var is_night = !!~[Phases.NIGHT_TRANSITION, Phases.NIGHT].indexOf(
    state.mp.phase
  );

  var players = in_game ? state.mp.players : state.mp.clients;

  var me = players.filter((x) => x.id === state.mp.id);
  if (me.length > 0) me = me[0];
  else me = null;

  console.log("Role ", me.role);

  return {
    partyId: state.mp.roomId,
    players: players,
    player: me,
    network_id: state.mp.id || null,

    is_host:
      state.mp.clients.length > 0 && state.mp.clients[0].id === state.mp.id,
    in_game: in_game,
    is_night: is_night,

    message: state.mp.message,
    phase: state.mp.phase || Phases.LOBBY,
    timer: state.mp.timer,

    main_color: is_night ? "royalblue" : "#ac6635",
    secondary_color: is_night ? "#111" : "#f3f3f3",

    player_on_stand: state.mp.player_on_stand,

    winning_faction: state.mp.winning_faction,

    nightIndex: state.mp.night_index,

    roles: state.mp ? state.mp.roles || [] : [],
  };
};

export default connect(mapStateToProps, { moveTo })(LobbyScreen);
