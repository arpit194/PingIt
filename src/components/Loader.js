import React from "react";
import classes from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loading}>
        <div className={`${classes.dot} ${classes.one}`}></div>
        <div className={`${classes.dot} ${classes.two}`}></div>
        <div className={`${classes.dot} ${classes.three}`}></div>
        <div className={`${classes.dot} ${classes.four}`}></div>
      </div>
    </div>
  );
};
