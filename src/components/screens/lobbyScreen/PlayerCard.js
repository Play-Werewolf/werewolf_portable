import React from "react";

import { SquareImage } from "../../SquareImage";
import Blame from "./Blame"
import VotesPanel from "./VotesPanel"

const PlayerCard = (props) => {
  var onclick = props.options["onclick"] || (() => 0);
  var votes = props.options["votes"] ? props.options["votes"](props.player) : 0;

  var style = props.player.dead ? styles.dead : styles.alive;
  var outline =
    props.player.id == this.props.network_id
      ? { boxShadow: "0 0 0 3pt gold", borderRadius: "2px" }
      : {};
  var img = props.player.dead
    ? "https://www.freeiconspng.com/uploads/skull-and-crossbones-png-3.png"
    : props.player.image;

  return (
    <div
      className="ui fluid card"
      onClick={() => onclick(props.player)}
      style={{ ...outline, marginTop: ".4em", marginBottom: ".4em" }}
      key={props.player.id}
    >
      <div className="image">
        <SquareImage
          src={img}
          color={props.player.dead ? "transparent" : props.player.color}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            textAlign: "center",
          }}
        >
          {/*blame ? <Blame txt={blame}/> : null*/}
          <div style={{ ...style, width: "100%" }}>
            {props.player.name.substr(0, 15)}
          </div>
        </div>
        {votes ? (
          <VotesPanel
            votes={votes}
            highlighted={props.highlightVote}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PlayerCard;
