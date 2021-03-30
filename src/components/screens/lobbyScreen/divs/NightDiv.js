import React from "react";
import { Roles, RoleCustomButtons } from "../../../../Game";
import { nightAction } from "../../../../multiplayer";
import PlayerList from "../lists/PlayerList";
import Banner from "../Banner";

const NightDiv = (props) => {
  function customButtonList(buttons) {
    buttons = buttons || [["Pass", false]];
    return buttons.map((b) => (
      <button
        key={b[0]}
        className="ui primary button"
        onClick={() => nightAction(b[1])}
      >
        {b[0]}
      </button>
    ));
  }

  function renderCustomButtons() {
    return (
      <center>
        <br />
        {customButtonList(RoleCustomButtons[props.player.role])}
      </center>
    );
  }

  if (props.player.active) {
    return (
      <div>
        <PlayerList
          players={props.players}
          network_id={props.network_id}
          playerVote={props.player.vote}
          options={{
            onclick: (player) => {
              /*Sends a player payload night action*/
              nightAction(player.id);
            },
            votes:
              props.player.role === Roles.WEREWOLF
                ? (player) =>
                    props.players.filter(
                      (x) =>
                        x.role === Roles.WEREWOLF &&
                        !x.dead &&
                        x.target === player.id
                    ).length
                : null,
          }}
        />
        {renderCustomButtons()}
      </div>
    );
  } else {
    return <Banner icon="moon" />;
  }
};

export default NightDiv;
