import {
  faEllipsisVertical,
  faPencil,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import classes from "./Profile.module.css";
import ProfileImage from "../ProfileImage";
import { useSelector } from "react-redux";

const Profile = () => {
  const [close, setClose] = useState(false);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={classes.profile}>
      <div className={classes.header}>
        <div className={classes.headerText}>My Profile</div>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className={classes.options}
        />
      </div>
      <div className={classes.profileImage}>
        <div className={classes.imageContainer}>
          {/* <img
            className={classes.image}
            src={`data:image/svg+xml;base64,${
              JSON.parse(localStorage.getItem("chat-app-user"))?.avatarImage
            }`}
            alt="avatar"
          /> */}
          <ProfileImage image={null} className={classes.image} />
          <div className={classes.edit}>
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
        <div className={classes.userName}>{user.userName}</div>
        <div className={classes.status}>
          <div className={classes.statusColor}></div>
          <div className={classes.statusText}>Active</div>
        </div>
      </div>
      <div className={classes.statusMessage}>{user.statusMessage}</div>
      <div className={classes.detailsContainer}>
        <div
          className={classes.detailsHeader}
          onClick={() => {
            setClose(!close);
          }}
        >
          <div>About</div>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <div className={`${classes.details} ${close && classes.close}`}>
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Name</div>
            <div className={classes.detailValue}>{user.name}</div>
          </div>
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Email</div>
            <div className={classes.detailValue}>{user.email}</div>
          </div>
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Location</div>
            <div className={classes.detailValue}>{user.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
