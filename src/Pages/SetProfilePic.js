import React, { useState, useEffect } from "react";
import classes from "./SetAvatar.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Loader } from "../components/Loader";
import { Buffer } from "buffer";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { useRequest } from "../hooks/requestHook";
import Spinner from "../components/Spinner";

const SetProfilePic = () => {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(false);

  const api = "https://api.multiavatar.com/45678945";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  const { loading, sendGetRequest, sendPostRequest } = useRequest();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Redirection
  useEffect(() => {
    if (user?.isAvatarImageSet) {
      navigate("/");
    } else if (!user) {
      navigate("/login");
    }
  }, []);

  // Loading of avatar images
  useEffect(() => {
    const setImages = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}?apikey=CG5qQvAJLuxjc2`
          );
          const buffer = new Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message, toastOptions);
      }
    };
    setImages();
  }, []);

  // Set avatar image
  const SetProfilePicture = async () => {
    if (selectedAvatar === false) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      try {
        const data = await sendPostRequest(setAvatarRoute, {
          image: avatars[selectedAvatar],
        });

        if (data.isSet) {
          const newUser = { ...user };
          newUser.isAvatarImageSet = true;
          newUser.avatarImage = data.image;
          dispatch(authActions.setUser(newUser));
          navigate("/");
        } else {
          toast.error(
            "Error setting the avatar. Please try again",
            toastOptions
          );
        }
      } catch (err) {
        toast.error(err.message, toastOptions);
      }
    }
  };

  return (
    <div className={classes.container}>
      {isLoading && <Loader />}
      <div className={classes.title}>Select an avatar</div>
      <div className={classes.avatars}>
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`${classes.avatar} ${
                selectedAvatar === index && classes.selected
              }`}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={() => {
                  setSelectedAvatar(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className={classes.selectAvatar} onClick={SetProfilePicture}>
        {loading ? <Spinner fontSize="1vw" /> : "Select Avatar"}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SetProfilePic;
