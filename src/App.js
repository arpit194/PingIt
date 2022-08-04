import { useState } from "react";
import classes from "./App.module.css";
import Chat from "./components/Chat";
import Section from "./components/Section";
import SideNav from "./components/SideNav";

function App() {
  const [section, setSection] = useState("profile");
  const selectSection = (sec) => {
    setSection(sec);
  };
  return (
    <div className={classes.App}>
      <SideNav section={section} setSection={selectSection} />
      <Section section={section} />
      <Chat />
    </div>
  );
}

export default App;
