import React from "react";
import WinnersList from "./lists/WinnersList";

const GameOver = (props) => {
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
      <h1>{msgs[props.winning_faction] || "Draw!"}</h1>
      <WinnersList winners={props.winners} />
    </center>
  );
};

export default GameOver;
