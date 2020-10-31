import React, { useState, useContext } from "react";
import { fetchRequest, AuthContext } from "../../../utils";
import classes from "./styles.css";

const SignIn = (props) => {
  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");

  const auth = useContext(AuthContext);

  const setLogin = (e) => {
    setUser({ ...user, login: e.target.value });
  };

  const setPassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const responseHandler = (response) => {
    auth.login(response.token);
  };

  const rejectHandler = (reject) => {
    setError(reject.message);
  };

  function authHandler(e) {
    e.preventDefault();
    fetchRequest(
      "/api/auth/login",
      rejectHandler,
      responseHandler,
      { "Content-Type": "application/json;charset=utf-8" },
      "POST",
      user
    );
  }

  return (
    <div className={classes.Container}>
      <button
        className={classes.CloseButton}
        onClick={props.modalClosed}
      ></button>
      <div className={classes.Form}>
        <form>
          <fieldset>
            <div className={classes.Inner}>
              <legend>Вход</legend>
              <input placeholder="Логин" onChange={setLogin}></input>
              <input
                type="password"
                onChange={setPassword}
                placeholder="Пароль"
              ></input>
              <button
                className={classes.LoginButton}
                onClick={authHandler}
                type="submit"
              >
                Войти
              </button>
            </div>
            <div>{error}</div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
