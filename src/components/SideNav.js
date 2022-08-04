import React from "react";
import classes from "./SideNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMessage,
  faAddressCard,
  faSun,
} from "@fortawesome/free-regular-svg-icons";

import { faGear } from "@fortawesome/free-solid-svg-icons";

const SideNav = ({ section, setSection }) => {
  return (
    <div className={classes.sideNav}>
      <div className={classes.top}>
        <img src="images/Pingitwhite.png" alt="PingIt" />
      </div>
      <div className={classes.middle}>
        <FontAwesomeIcon
          icon={faUser}
          className={section === "profile" ? classes.active : ""}
          onClick={() => {
            setSection("profile");
          }}
        />
        <FontAwesomeIcon
          icon={faMessage}
          className={section === "chats" ? classes.active : ""}
          onClick={() => {
            setSection("chats");
          }}
        />
        <FontAwesomeIcon
          icon={faAddressCard}
          className={section === "contacts" ? classes.active : ""}
          onClick={() => {
            setSection("contacts");
          }}
        />
      </div>
      <div className={classes.bottom}>
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon
          icon={faGear}
          className={section === "settings" ? classes.active : ""}
          onClick={() => {
            setSection("settings");
          }}
        />
      </div>
    </div>
  );
};

export default SideNav;
