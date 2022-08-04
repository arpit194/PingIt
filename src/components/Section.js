import React from "react";
import classes from "./Section.module.css";
import Profile from "./sections/Profile";
import Chats from "./sections/Chats";
import Contacts from "./sections/Contacts";
import Settings from "./sections/Settings";

const Section = ({ section }) => {
  return (
    <div className={classes.section}>
      {section === "profile" && <Profile />}
      {section === "chats" && <Chats />}
      {section === "contacts" && <Contacts />}
      {section === "settings" && <Settings />}
    </div>
  );
};

export default Section;
