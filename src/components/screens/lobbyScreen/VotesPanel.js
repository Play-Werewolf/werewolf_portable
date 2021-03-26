import React from "react";

const VotesPanel = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        borderBottomRightRadius: "10px",
        padding: "5px",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        color: "white",
        border: props.highlighted ? "3px solid gold" : "3px solid red",
        borderLeft: "",
        borderTop: "",
      }}
    >
      {props.votes}
    </div>
  );
};

export default VotesPanel;
