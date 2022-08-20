import React, { useEffect, useState } from "react";
import classes from "./Conversation.module.css";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addContactRoute,
  checkisContact,
  getMessages,
} from "../../../utils/APIRoutes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ProfileImage from "../../ProfileImage";
import { useSelector, useDispatch } from "react-redux";
import { useRequest } from "../../../hooks/requestHook";
import { dataActions } from "../../../store/dataSlice";
import Spinner from "../../Spinner";

const Conversation = ({ conversation }) => {
  const [user, setUser] = useState();
  const [isContact, setIsContact] = useState(true);
  const { user: currUser } = useSelector((state) => state.auth);
  const { loading, sendGetRequest, sendPostRequest } = useRequest();
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (conversation.type === "chat") {
      setUser(
        conversation.users.filter((user) => {
          return user.userName !== currUser.userName;
        })[0]
      );
    }
  }, []);

  useEffect(() => {
    const isContact = async () => {
      const data = await sendGetRequest(checkisContact + "/" + user?._id);

      setIsContact(data.status);
    };
    if (user) {
      isContact();
    }
  }, [user]);

  const addContact = async (id) => {
    const data = await sendPostRequest(addContactRoute, {
      contactId: id,
    });

    if (data.status) {
      toast.success(data.message, toastOptions);
      dispatch(dataActions.addContact(user));
      if (data.convo) {
        dispatch(dataActions.addConversation(data.convo));
      }
      setIsContact(true);
    } else {
      toast.error(data.message, toastOptions);
    }
  };

  const getConversation = async (conversation) => {
    dispatch(dataActions.setConversation(conversation));
    dispatch(dataActions.setShowSection(false));
  };

  return (
    <div
      className={classes.chat}
      onClick={() => {
        getConversation(conversation);
      }}
    >
      <div className={classes.image}>
        <ProfileImage image={user?.avatarImage} className={null} />
      </div>
      <div className={classes.name}>{user?.name}</div>
      <div className={classes.time}>
        {!isContact &&
          (loading ? (
            <Spinner fontSize="1vw" />
          ) : (
            <FontAwesomeIcon
              icon={faUserPlus}
              onClick={() => {
                addContact(user?._id);
              }}
            />
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Conversation;
