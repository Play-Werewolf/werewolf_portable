import React from "react";

const IdleDiv = (props) => {
  //this div expects to receive a PlayerList and a RolesList as children
  return (
    <div>
      {props.children[0]}
      <p>&nbsp;</p>
      <div>Roles: {props.children[1]} </div>
    </div>
  );
};

export default IdleDiv;
