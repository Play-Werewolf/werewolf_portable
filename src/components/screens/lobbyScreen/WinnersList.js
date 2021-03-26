import React from "react";
import { RoleNames } from "../../../Game";

const WinnersList = (props) => {
  return (
    <div className="ui middle aligned list">
      Winning players:
      {props.winners.map((w) => (
        <div key={w.id} className="item">
          <img className="ui avatar image" src={w.image} />
          <div className="content">
            <div className="header">
              <strong>{w.name}</strong> ({RoleNames[w.role]})
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WinnersList;
