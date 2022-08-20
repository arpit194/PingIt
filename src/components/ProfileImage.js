import React from "react";
import { useSelector } from "react-redux";

const ProfileImage = ({ image, className }) => {
  const profilePic = useSelector((state) => state.auth.user.avatarImage);
  return (
    <img
      className={className}
      src={`data:image/svg+xml;base64,${image ? image : profilePic}`}
      alt="avatar"
    />
  );
};

export default ProfileImage;
