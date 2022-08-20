import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./Spinner.module.css";

const Spinner = ({
  fontSize = "5vw",
  color = "var(--light)",
  width = "100%",
}) => {
  return (
    <div className={classes.container} style={{ width: width }}>
      <FontAwesomeIcon
        icon={faCircleNotch}
        className={classes.spinner}
        style={{ fontSize: fontSize, color: color }}
      />
    </div>
  );
};

export default Spinner;
