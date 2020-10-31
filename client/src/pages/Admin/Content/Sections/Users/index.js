import React, { useState, useEffect, useContext } from "react";
import { fetchRequest, AuthContext } from "../../../../../utils";

import classes from "./styles.css";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  const auth = useContext(AuthContext);

  const { token } = useContext(AuthContext);

  const rejectHandler = (response) => {
    if (response === 401) {
      auth.logout();
    }
  };

  const responseHandler = (response) => {
    setUsers(response);
  };

  const deleteHandler = (name) => {
    setUsers(users.filter((item) => item.login !== name));
  };

  useEffect(() => {
    fetchRequest("/api/user/get-all", rejectHandler, responseHandler, {
      Authorization: `Bearer ${token}`,
    });
  }, []);

  function deleteUser(name, id) {
    fetchRequest(
      "/api/user/delete",
      rejectHandler,
      () => deleteHandler(name),
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      "POST",
      { id: id }
    );
  }

  const tabs = () => {
    return users.map((user, i) => {
      return (
        <User
          user={user}
          key={i}
          index={i}
          delete={(name, id) => deleteUser(name, id)}
        />
      );
    });
  };
  console.log(users);
  return (
    <div className={classes.Users}>
      <h1>Пользователи</h1>
      <div className={classes.TabsWrapper}>{tabs()}</div>
    </div>
  );
};

export default Users;
