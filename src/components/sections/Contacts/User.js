import React from "react";
import classes from "./User.module.css";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImage from "../../ProfileImage";
import Spinner from "../../Spinner";

const User = ({ user, addContact, loading }) => {
  return (
    <div className={classes.user}>
      <div className={classes.userImage}>
        <ProfileImage image={user.avatarImage} className={classes.image} />
      </div>
      <div className={classes.userDetails}>
        <div className={classes.name}>{user.name}</div>
        <div className={classes.userName}>{user.userName}</div>
      </div>
      <div className={classes.addContact}>
        {loading ? (
          <Spinner fontSize="1vw" />
        ) : (
          <FontAwesomeIcon
            icon={faUserPlus}
            onClick={() => {
              addContact(user);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default User;
