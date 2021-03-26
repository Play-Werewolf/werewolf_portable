import React from "react";

export const SquareImage = (props) => {
  return (
    <div style={{ backgroundColor: "gray", paddingBottom: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: props.color || "skyblue",
          textAlign: "center",
        }}
      >
        <img
          src={props.src}
          style={{ maxWidth: "90%", maxHeight: "80%", margin: "5%" }}
        />
      </div>
    </div>
  );
};
