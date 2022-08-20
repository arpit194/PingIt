import { faSearch, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import classes from "./Contacts.module.css";
import ContactItem from "./Contacts/ContactItem";
import axios from "axios";
import {
  getUsersRoute,
  addContactRoute,
  allContactsRoute,
} from "../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import User from "./Contacts/User";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../../store/dataSlice";
import { useRequest } from "../../hooks/requestHook";
import Spinner from "../Spinner";

const Contacts = () => {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const contacts = useSelector((state) => state.data.contacts);
  const dispatch = useDispatch();
  const { loading: contactsLoading, sendGetRequest: sendContactGetRequest } =
    useRequest();
  const {
    loading: usersLoading,
    sendGetRequest: sendUserGetRequest,
    sendPostRequest: sendUserPostRequest,
  } = useRequest();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const getContacts = async () => {
      const data = await sendContactGetRequest(allContactsRoute);

      if (data.status) {
        dispatch(dataActions.setContacts(data.contacts));
      } else {
        toast.error(data.message, toastOptions);
      }
    };
    if (contacts.length === 0) getContacts();
  }, []);

  const getUsers = async () => {
    if (nameRef.current.value) {
      const data = await sendUserGetRequest(
        `${getUsersRoute}/${nameRef.current.value}`
      );
      setUsers(data.users);
    } else {
      setUsers([]);
    }
  };

  const clearName = () => {
    nameRef.current.value = "";
    setUsers([]);
  };

  const addContact = async (user) => {
    const data = await sendUserPostRequest(addContactRoute, {
      contactId: user._id,
    });
    if (data.status) {
      toast.success(data.message, toastOptions);
      dispatch(dataActions.addContact(user));
      if (data.convo) {
        dispatch(dataActions.addConversation(data.convo));
      }
    } else {
      toast.error(data.message, toastOptions);
    }
  };

  return (
    <div className={classes.contactsContainer}>
      <div className={classes.header}>
        <div className={classes.headerText}>Contacts</div>
      </div>
      <div className={classes.search}>
        <div className={classes.searchBar}>
          <input placeholder="Type username and click search" ref={nameRef} />
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={classes.clearName}
            onClick={clearName}
          />
          {users.length > 0 && (
            <div className={classes.users}>
              {users.map((user) => {
                return (
                  user._id.toString() !==
                    JSON.parse(
                      localStorage.getItem("chat-app-user")
                    )?._id.toString() && (
                    <User
                      user={user}
                      key={user["_id"]}
                      addContact={addContact}
                      loading={usersLoading}
                    />
                  )
                );
              })}
            </div>
          )}
        </div>
        <div className={classes.searchIcon} onClick={getUsers}>
          {usersLoading && <Spinner fontSize="1vmax" color="var(--darkest)" />}
          {!usersLoading && <FontAwesomeIcon icon={faSearch} />}
        </div>
      </div>
      <div className={classes.contacts}>
        {contactsLoading && <Spinner />}
        <ContactItem contacts={contacts} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contacts;
