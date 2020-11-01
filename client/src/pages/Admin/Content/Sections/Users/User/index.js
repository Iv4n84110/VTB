import React, { useState, useEffect, useContext } from "react";
import { fetchRequest, AuthContext } from "../../../../../../utils";

import classes from "./styles.css";

const User = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const auth = useContext(AuthContext);


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

  const rejectHandler = (response) => {
    if (response === 401) {
      auth.logout();
    }
    setError(error.message);
  };

  const activityResponse = () => {
    setUser({ ...user, active: !user.active });
  };

  const passResponse = () => {
    setUser({ ...user, chagePassword: true });
  };

  function setUserActivity() {
    fetchRequest(
      `/api/user/${user.active ? "block" : "unblock"}`,
      rejectHandler,
      activityResponse,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      "POST",
      { id: user.id }
    );
  }

  function managePass() {
    fetchRequest(
      "/api/auth/reset-password",
      rejectHandler,
      passResponse,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      "POST",
      { id: user.id }
    );
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
