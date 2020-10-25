import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import classes from "./styles.css";

const SignIn = (props) => {
  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));

  const setLogin = (e) => {
    setUser({ ...user, login: e.target.value });
  };

  const setPassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  async function auth(e) {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      response
        .json()
        .then((res) => res.message)
        .then((res) => {
          throw new Error(res);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      response.json().then((res) => {
        localStorage.setItem("token", res.token);
        setAuth(true);
      });
    }
  }

  return isAuth ? (
    <Redirect to="/admin/create" />
  ) : (
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
                onClick={auth}
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
