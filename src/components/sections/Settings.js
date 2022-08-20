import React, { useState } from "react";
import classes from "./Settings.module.css";
import {
  faEllipsisVertical,
  faPencil,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImage from "../ProfileImage";
import { useSelector } from "react-redux";

const Settings = () => {
  const [close, setClose] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const [status, setStatus] = useState(user.status);

  return (
    <div className={classes.settingsContainer}>
      <div className={classes.header}>
        <div className={classes.headerText}>Settings</div>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className={classes.options}
        />
      </div>
      <div className={classes.profileImage}>
        <div className={classes.imageContainer}>
          <ProfileImage image={null} className={classes.image} />
          <div className={classes.edit}>
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
        <div className={classes.userName}>{user.userName}</div>
        <div className={classes.status}>
          <div className={classes.statusSelect}>
            <div
              className={classes.selectedStatus}
              onClick={() => {
                setOpenStatus(!openStatus);
              }}
            >
              {status + " "}
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{ fontSize: "1vmax" }}
              />
            </div>
            <div
              className={`${classes.statusOptions} ${
                openStatus && classes.open
              }`}
            >
              <div
                className={classes.statusOption}
                onClick={() => {
                  setStatus("Active");
                }}
              >
                Active
              </div>
              <div
                className={classes.statusOption}
                onClick={() => {
                  setStatus("Away");
                }}
              >
                Away
              </div>
              <div
                className={classes.statusOption}
                onClick={() => {
                  setStatus("Busy");
                }}
              >
                Busy
              </div>
            </div>
          </div>
        </div>
      </div>
      <textarea
        className={classes.statusMessage}
        placeholder={"Enter Status"}
        defaultValue={user.statusMessage}
      ></textarea>
      <div className={classes.detailsContainer}>
        <div
          className={classes.detailsHeader}
          onClick={() => {
            setClose(!close);
          }}
        >
          <div>Personal Info</div>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <div className={`${classes.details} ${close && classes.close}`}>
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Name</div>
            <input
              className={classes.detailValue}
              defaultValue={user.name}
              placeholder={"Enter Name"}
            />
          </div>
          {/* <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Email</div>
            <input
              className={classes.detailValue}
              defaultValue={user.email}
              placeholder={"Enter Email"}
            />
          </div> */}
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Location</div>
            <input
              className={classes.detailValue}
              defaultValue={user.location}
              placeholder={"Enter Location"}
            />
          </div>
          <div className={classes.detailsControl}>
            <div className={classes.updateInfo}>Update</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
