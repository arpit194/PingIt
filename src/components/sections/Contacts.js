import {
  faEllipsisVertical,
  faUserPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./Contacts.module.css";

const Contacts = () => {
  return (
    <div className={classes.contactsContainer}>
      <div className={classes.header}>
        <div className={classes.headerText}>Contacts</div>
        <FontAwesomeIcon
          icon={faUserPlus}
          className={classes.addIcon}
          title="Add User"
        />
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className={classes.searchBar}>
          <input placeholder="Search users" />
        </div>
      </div>
      <div className={classes.contacts}>
        <div className={classes.contact}>
          <div className={classes.contactName}>Arpit Patel</div>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={classes.options}
          />
        </div>
        <div className={classes.contact}>
          <div className={classes.contactName}>Saloni Patidar</div>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={classes.options}
          />
        </div>
        <div className={classes.contact}>
          <div className={classes.contactName}>Usha Patel</div>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={classes.options}
          />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
