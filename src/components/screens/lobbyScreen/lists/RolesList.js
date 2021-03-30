import React from "react";
import { RoleNames, RoleColors } from "../../../../Game";

const RolesList = (props) => {
  return props.roles.slice(0, props.playersAmount).map((x, i) => (
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
};

export default RolesList;
