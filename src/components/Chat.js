import {
  faEllipsisVertical,
  faPhone,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={classes.chatContainer}>
      <div className={classes.details}>
        <div className={classes.chat}>
          <div className={classes.image}>
            <div className={classes.circle}>A</div>
          </div>
          <div className={classes.name}>Arpit Patel</div>
          <div className={classes.options}>
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faPhone} />
            <FontAwesomeIcon icon={faVideo} />
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        </div>
      </div>
      <div className={classes.messageContainer}>
        <div
          className={`${classes.message} ${classes.left} ${classes.leftFirst}`}
        >
          This is a recieved message
        </div>
        <div className={`${classes.message} ${classes.left}`}>
          This is a second recieved message. This is a second recieved message.
          This is a second recieved message. This is a second recieved message.
          This is a second recieved message.
        </div>
        <div
          className={`${classes.message} ${classes.right} ${classes.rightFirst}`}
        >
          This is a sent message
        </div>
        <div className={`${classes.message} ${classes.right}`}>
          This is a second sent message. This is a second sent message. This is
          a second sent message. This is a second sent message. This is a second
          sent message.
        </div>
        <div className={`${classes.message} ${classes.right}`}>
          Lorem ipsum dolor sit amet.
        </div>
        <div className={`${classes.message} ${classes.right}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
          nesciunt.
        </div>
        <div
          className={`${classes.message} ${classes.left} ${classes.leftFirst}`}
        >
          This is a recieved message
        </div>
        <div className={`${classes.message} ${classes.left}`}>
          This is a second recieved message. This is a second recieved message.
          This is a second recieved message.
        </div>
        <div className={`${classes.message} ${classes.left}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          error quisquam necessitatibus, rerum veritatis cumque.
        </div>
        <div className={`${classes.message} ${classes.left}`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
      </div>
    </div>
  );
};

export default Chat;
