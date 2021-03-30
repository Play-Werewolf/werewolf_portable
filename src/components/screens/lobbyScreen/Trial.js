import React from "react";
import {trialGuilty, trialInnocent} from "../../../multiplayer";

const Trial = (props) => {
  const GuiltyInnocent = () => {
    if (props.is_host)
      return (
        <div className="extra content">
          <div className="ui two buttons">
            <div
              className="ui basic red button"
              onClick={trialGuilty}
            >
              Execute
            </div>
            <div
              className="ui basic green button"
              onClick={trialInnocent}
            >
              Free
            </div>
          </div>
        </div>
      );
  }

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
          <img src={props.player_on_stand.image} />
        </div>
        <div className="content">
          <div className="header">{props.player_on_stand.name}</div>
        </div>
        {GuiltyInnocent()}
      </div>
    </center>
  );
};

export default Trial;
