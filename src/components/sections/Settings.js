import React, { useState } from "react";
import classes from "./Settings.module.css";
import {
  faEllipsisVertical,
  faCircleUser,
  faPencil,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Settings = () => {
  const [close, setClose] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState("Active");

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
          <FontAwesomeIcon icon={faCircleUser} className={classes.image} />
          <div className={classes.edit}>
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
        <div className={classes.userName}>User Name</div>
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
                style={{ fontSize: "0.75vw" }}
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
      <textarea className={classes.statusMessage} placeholder={"Enter Status"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, quidem!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, quidem!
      </textarea>
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
              defaultValue={"Arpit Patel"}
              placeholder={"Enter Name"}
            />
          </div>
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Email</div>
            <input
              className={classes.detailValue}
              defaultValue={"arpit.patel194@gmail.com"}
              placeholder={"Enter Email"}
            />
          </div>
          <div className={classes.detailsControl}>
            <div className={classes.detailTitle}>Location</div>
            <input
              className={classes.detailValue}
              defaultValue={"India"}
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
