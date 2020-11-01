import React, { useState, useEffect, useContext } from "react";
import Sections from "./Sections";
import Sidebar from "./Sidebar";
import { fetchRequest, AuthContext } from "../../../utils";


import classes from "./styles.css";

const Content = () => {
  const [adminLogin, setLogin] = useState("");
  const auth = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  const responseHandler = (response) => {
    setLogin(response.login);
  };

  const rejectHandler = (response) => {
    if (response === 401) {
      auth.logout();
    }
  };

  useEffect(() => {
    fetchRequest(
      "/api/user/get-info",
      rejectHandler,
      responseHandler,
      { Authorization: `Bearer ${token}` },
      "GET"
    );
  }, []);

  return (
    <main className={classes.Content}>
      <Sidebar login={adminLogin}></Sidebar>
      <Sections></Sections>
    </main>
  );
};

export default Content;
