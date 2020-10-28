import React, { useState, useEffect } from "react";

import classes from "./styles.css";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const myToken = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/user/get-all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);

  async function deleteUser(name, id) {
    const response = await fetch("/api/user/delete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: id }),
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
    } else setUsers(users.filter((item) => item.login !== name));
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
