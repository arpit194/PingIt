import {
  faEllipsisVertical,
  faCircleUser,
  faPencil,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import classes from "./Profile.module.css";

const Profile = () => {
  const [close, setClose] = useState(false);
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
          <FontAwesomeIcon icon={faCircleUser} className={classes.image} />
          <div className={classes.edit}>
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
        <div className={classes.userName}>User Name</div>
        <div className={classes.status}>
          <div className={classes.statusColor}></div>
          <div className={classes.statusText}>Active</div>
        </div>
      </div>
      <div className={classes.statusMessage}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, quidem!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, quidem!
      </div>
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
            <div className={classes.detailValue}>Arpit Patel</div>
          </div>
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Email</div>
            <div className={classes.detailValue}>arpit.patel194@gmail.com</div>
          </div>
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Location</div>
            <div className={classes.detailValue}>India</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
