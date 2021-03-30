import React from "react";
import styles from "../styles";
import { Phases, RoleMessages } from "../../../../Game";

const IngameHeader = (props) => {
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
    }[props.phase] || props.message;

  if (props.player.active && props.phase === Phases.NIGHT) {
    if (props.nightIndex === "SPOOKY_DOLL") {
      msg = "Pass the spooky doll to someone";
    } else {
      msg = RoleMessages[props.player.role];
    }
  }
  return (
    <div
      style={{ ...styles.headerStyle, marginLeft: "3em", marginTop: ".5em" }}
    >
      <h3>{msg}</h3>
    </div>
  );
};

export default IngameHeader;
