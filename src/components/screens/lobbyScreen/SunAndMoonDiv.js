import React from "react";

const SunAndMoonDiv = (props) => {
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
        className={"ui icon " + (props.is_night ? "moon" : "sun")}
        style={{ fontSize: "2em" }}
      ></i>
    </div>
  );
};

export default SunAndMoonDiv;
