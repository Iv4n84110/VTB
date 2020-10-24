import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import classes from "./styles.css";

const SignOut = (props) => {
  const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return !isAuth ? (
    <Redirect to="/" />
  ) : (
    <div className={classes.Container}>
      <button
        className={classes.CloseButton}
        onClick={props.modalClosed}
      ></button>
      <div className={classes.Inner}>
        <div className={classes.Header}>Вы уверены, что хотите выйти?</div>

        <button
          className={classes.LogoutButton}
          onClick={logoutHandler}
          type="submit"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default SignOut;
