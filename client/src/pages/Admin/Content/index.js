import React, { useState, useEffect } from "react";
import Sections from "./Sections";
import Sidebar from "./Sidebar";
import { Redirect } from "react-router-dom";

import classes from "./styles.css";

const Content = () => {
  const [login, setLogin] = useState("");
  const myToken = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/user/get-info", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    })
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
