import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./Chats.module.css";

const Chats = () => {
  return (
    <div className={classes.chats}>
      <div className={classes.header}>
        <div className={classes.headerText}>Chats</div>
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className={classes.searchBar}>
          <input placeholder="Search users" />
        </div>
        <div className={classes.addIcon}>
          <FontAwesomeIcon icon={faUserPlus} />
        </div>
      </div>
      <div className={classes.messages}>
        <div className={classes.chat}>
          <div className={classes.image}>
            <div className={classes.circle}>A</div>
          </div>
          <div className={classes.name}>Arpit Patel</div>
          <div className={classes.time}>05 Min</div>
        </div>
        <div className={classes.chat}>
          <div className={classes.image}>
            <div className={classes.circle}>S</div>
          </div>
          <div className={classes.name}>Saloni Patidar</div>
          <div className={classes.time}>10:12 AM</div>
        </div>
        <div className={classes.chat}>
          <div className={classes.image}>
            <div className={classes.circle}>U</div>
          </div>
          <div className={classes.name}>Mummy</div>
          <div className={classes.time}>02 Hrs</div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
