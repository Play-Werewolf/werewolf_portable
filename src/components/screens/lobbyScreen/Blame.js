import React from "react";

const Blame = (props) => {
  return (
    <div>
      <strong
        style={{
          color: "#f00",
          borderRadius: "10px",
          padding: "2px",
          backgroundColor: "black",
        }}
      >
        🡆 {props.txt}
      </strong>
    </div>
  );
};

export default Blame;
