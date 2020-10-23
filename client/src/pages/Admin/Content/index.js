import React, { useState, useEffect } from "react";
import Sections from "./Sections";
import Sidebar from "./Sidebar";
import { Redirect } from "react-router-dom";

import classes from "./styles.css";

const Content = () => {
  const [login, setLogin] = useState("");

  useEffect(() => {
    fetch("https://run.mocky.io/v3/679dcd56-2180-46a1-91dd-7b9d74cf4da5")
      .then((res) => res.json())
      .then((res) => setLogin(res.login));
  });

  return !localStorage.getItem("token") ? (
    <Redirect to="/" />
  ) : (
    <main className={classes.Content}>
      <Sidebar login={login}></Sidebar>
      <Sections></Sections>
    </main>
  );
};

export default Content;
