import React from "react";
import classes from "./SideNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMessage,
  faAddressCard,
} from "@fortawesome/free-regular-svg-icons";

import { faGear, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { dataActions } from "../store/dataSlice";

const SideNav = ({ section, setSection }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authActions.logout());
    dispatch(dataActions.clearData());
    navigate("/login");
  };
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
        <FontAwesomeIcon icon={faPowerOff} onClick={logout} />
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
