import React from "react";

const Banner = (props) => {
  return (
    <center>
      <div style={{ position: "block", height: "20vh" }}></div>
      <i className={"massive icon " + props.icon}></i>
    </center>
  );
};

export default Banner;
