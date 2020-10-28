import React, { useState, useEffect } from "react";

import classes from "./styles.css";

const User = (props) => {
  const [user, setUser] = useState({
    files: props.user.count,
    login: props.user.login,
    active: props.user.isActive,
    chagePassword: props.user.needToChangePassword,
    id: props.user.id,
    index: props.index,
  });
  const myToken = localStorage.getItem("token");
  const [error, setError] = useState("");

  useEffect(() => {
    setUser({
      files: props.user.count,
      login: props.user.login,
      active: props.user.isActive,
      chagePassword: props.user.needToChangePassword,
      id: props.user.id,
      index: props.index,
    });
  }, [props]);

  async function setUserActivity() {
    const response = await fetch(
      `/api/user/${user.active ? "block" : "unblock"}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${myToken}`,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: user.id }),
      }
    );
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
    } else setUser({ ...user, active: !user.active });
  }

  async function managePass() {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: user.id }),
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
    } else setUser({ ...user, chagePassword: true });
  }

  const firstButton = user.active ? classes.Okay : classes.Cancel;
  const secondButton = user.chagePassword
    ? classes.Refactored
    : classes.Refactor;

  return (
    <div className={classes.Tab}>
      <div className={classes.ButtonGroup}>
        <button
          onClick={setUserActivity}
          className={[classes.Button, firstButton].join(" ")}
        />
        <button
          onClick={managePass}
          className={[classes.Button, secondButton].join(" ")}
          disabled={user.chagePassword}
        />
        <button
          onClick={() => {
            props.delete(user.login, user.id);
          }}
          className={[classes.Button, classes.Delete].join(" ")}
        />
      </div>
      <span className={classes.LoginText}>{user.login}</span>
      <span className={classes.FilesText}>
        {user.files ? user.files : 0} Файлов
      </span>
    </div>
  );
};

export default User;
