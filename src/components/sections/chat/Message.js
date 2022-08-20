import React from "react";
import ProfileImage from "../../ProfileImage";
import classes from "./Message.module.css";

const Message = ({ message, first, left, sender }) => {
  let className = classes.message;
  if (left) {
    className = className.concat(" " + classes.left);
    if (first) {
      className = className.concat(" " + classes.leftFirst);
    }
  } else {
    className = className.concat(" " + classes.right);
    if (first) {
      className = className.concat(" " + classes.rightFirst);
    }
  }

  return (
    <div className={classes.messageContainer}>
      {/* {first && (
        <div className={`${left ? classes.leftName : classes.rightName}`}>
          <ProfileImage image={sender.avatarImage} className={classes.image} />
          {sender.name}
        </div>
      )} */}
      <div className={className}>
        {first && (
          <div className={`${left ? classes.leftName : classes.rightName}`}>
            {sender.name}
          </div>
        )}
        {message}
      </div>
    </div>
  );
};

export default Message;
