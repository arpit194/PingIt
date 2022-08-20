import React from "react";
import classes from "./ContactItem.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImage from "../../ProfileImage";

const ContactItem = (props) => {
  return (
    <>
      {props.contacts.map((contact) => {
        return (
          <div className={classes.contact} key={contact._id}>
            <div className={classes.contactImage}>
              <ProfileImage
                image={contact.avatarImage}
                className={classes.image}
              />
            </div>
            <div className={classes.contactDetails}>
              <div className={classes.name}>{contact.name}</div>
              <div className={classes.contactName}>{contact.userName}</div>
            </div>
            <div className={classes.addContact}>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className={classes.options}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactItem;
