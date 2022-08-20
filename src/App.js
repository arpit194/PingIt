import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Section from "./components/Section";
import SideNav from "./components/SideNav";
import SetProfilePic from "./Pages/SetProfilePic";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "./store/dataSlice";

function App() {
  const [section, setSection] = useState("profile");
  const dispatch = useDispatch();
  const selectSection = (sec) => {
    setSection(sec);
    dispatch(dataActions.setShowSection(true));
  };

  const token = useSelector((state) => state.auth.token);

  const ChatContainer = () => {
    return (
      <div className={classes.App}>
        <SideNav section={section} setSection={selectSection} />
        <Section section={section} />
        <Chat />
      </div>
    );
  };

  return (
    <BrowserRouter basename="/PingIt">
      <Routes>
        {!token && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Login />} />
          </>
        )}
        {token && (
          <>
            <Route path="/setAvatar" element={<SetProfilePic />} />
            <Route path="/" element={<ChatContainer />} />
            <Route path="/*" element={<ChatContainer />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
