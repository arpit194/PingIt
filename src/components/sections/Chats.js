import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getConversations } from "../../utils/APIRoutes";
import Conversation from "./chat/Conversation";
import classes from "./Chats.module.css";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import { useRequest } from "../../hooks/requestHook";
import { dataActions } from "../../store/dataSlice";

const Chats = () => {
  const conversations = useSelector((state) => state.data.conversations);

  const { loading, sendGetRequest } = useRequest();
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const getContacts = async () => {
      const data = await sendGetRequest(getConversations);

      if (data.status) {
        dispatch(dataActions.setConversations(data.conversations));
      } else {
        toast.error(data.message, toastOptions);
      }
    };
    if (conversations.length == 0) getContacts();
  }, []);

  return (
    <div className={classes.chats}>
      <div className={classes.header}>
        <div className={classes.headerText}>Chats</div>
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className={classes.searchBar}>
          <input placeholder="Search users" />
        </div>
      </div>
      <div className={classes.messages}>
        {loading && <Spinner />}
        {conversations.map((convo) => {
          return <Conversation key={convo._id} conversation={convo} />;
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chats;
