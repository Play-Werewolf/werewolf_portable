import React from "react";
import styles from "../styles";

const PregameHeader = (props) => {
  return (
    <div style={styles.headerStyle}>
      Party id:
      <h1>{props.partyId}</h1>
    </div>
  );
};

export default PregameHeader;
