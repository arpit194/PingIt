import {
  faEllipsisVertical,
  faPaperPlane,
  faPhone,
  faRotateRight,
  faSearch,
  faSmile,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Chat.module.css";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/sections/chat/Message";
import EmojiPicker from "emoji-picker-react";
import { useRequest } from "../hooks/requestHook";
import { getMessagesPath, host, sendMessagePath } from "../utils/APIRoutes";
import { dataActions } from "../store/dataSlice";
import Spinner from "../components/Spinner";
import ProfileImage from "../components/ProfileImage";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");

  const { conversation, messages } = useSelector((state) => state.data);
  const user = useSelector((state) => state.auth.user);
  const [otherUser, setOtherUser] = useState();
  const [currUser, setCurrUser] = useState(null);

  const { loading, sendPostRequest, sendGetRequest } = useRequest();
  const dispatch = useDispatch();
  const chatRef = useRef();
  const socket = useRef();

  const addEmoji = (event, emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (message) => {
        dispatch(dataActions.addMessage([message]));
      });
    }
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const data = await sendGetRequest(
        `${getMessagesPath}/${conversation._id}`
      );
      if (data.status) {
        dispatch(dataActions.setMessages(data.messages));
      }
    };
    if (conversation) {
      if (conversation.type === "chat") {
        setOtherUser(
          conversation.users.filter((u) => {
            return u.userName !== user.userName;
          })[0]
        );
      }
      getMessages();
    }
  }, [conversation]);

  const getMessages = async () => {
    const data = await sendGetRequest(`${getMessagesPath}/${conversation._id}`);
    if (data.status) {
      dispatch(dataActions.setMessages(data.messages));
    }
  };

  const sendMessage = async () => {
    if (message && message !== "") {
      const data = await sendPostRequest(sendMessagePath, {
        message: message,
        sender: user._id,
        conversationId: conversation._id,
      });

      if (data.status) {
        dispatch(dataActions.addMessage([data.message]));
        setMessage("");
      }
      socket.current.emit("send-msg", {
        _id: uuidv4(),
        message: message,
        sender: user._id,
        conversationId: conversation._id,
        reciever: otherUser._id,
      });
    }
  };

  return (
    <>
      {!conversation && <div></div>}
      {conversation && (
        <div className={classes.chatContainer}>
          <div className={classes.details}>
            <div className={classes.chat}>
              <div className={classes.image}>
                <ProfileImage image={otherUser?.avatarImage} />
              </div>
              <div className={classes.name}>{otherUser?.name}</div>
              <div className={classes.options}>
                <FontAwesomeIcon
                  icon={faRotateRight}
                  style={{ cursor: "pointer" }}
                  onClick={getMessages}
                />
                <FontAwesomeIcon icon={faSearch} />
                <FontAwesomeIcon icon={faPhone} />
                <FontAwesomeIcon icon={faVideo} />
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
          </div>
          <div
            className={classes.messagesContainer}
            onClick={() => setShowPicker(false)}
            ref={chatRef}
          >
            {messages.map((msg, index) => {
              let left = true,
                first = false,
                sender = otherUser;
              if (messages[index - 1]?.sender !== msg.sender) {
                first = true;
              }
              if (msg.sender === user._id) {
                left = false;
                sender = user;
              }
              return (
                <Message
                  message={msg.message}
                  key={msg._id}
                  left={left}
                  first={first}
                  sender={sender}
                />
              );
            })}
          </div>
          <div className={classes.messageContainer}>
            <FontAwesomeIcon
              icon={faSmile}
              className={classes.emojiPicker}
              onClick={() => setShowPicker(!showPicker)}
            />
            <input
              className={classes.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {loading ? (
              <Spinner fontSize="1vw" width="5%" />
            ) : (
              <FontAwesomeIcon
                icon={faPaperPlane}
                className={classes.sendButton}
                onClick={sendMessage}
              />
            )}
            {showPicker && (
              <EmojiPicker
                onEmojiClick={addEmoji}
                pickerStyle={{
                  position: "absolute",
                  left: "1vw",
                  bottom: "calc(100% + 1vmax)",
                  zIndex: 10,
                }}
                disableAutoFocus={true}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
