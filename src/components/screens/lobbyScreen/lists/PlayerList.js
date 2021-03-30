import React from "react";
import PlayerCard from "../PlayerCard"

const PlayerList = () => {
  var colsAmount = 4;
  var cols = [];
  for (let n = 0; n < colsAmount; n++) {
    cols.push(
      props.players
        .filter((_, i) => i % colsAmount === n)
        .map((x, i) => (
          <PlayerCard
            key={i}
            player={x}
            networkId={props.network_id}
            options={props.options ?? {}}
            highlightVote={props.playerVote === x.id}
          ></PlayerCard>
        ))
    );
  }
  return (
    <div className="ui four column grid">
      {cols.map((col, i) => {
        return (
          <div className="ui column" key={i} style={{ padding: "0.2rem" }}>
            {col}
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;
