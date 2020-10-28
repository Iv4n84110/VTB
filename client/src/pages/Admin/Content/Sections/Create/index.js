import React from "react";
import { useState } from "react";

import classes from "./styles.css";

const Create = () => {
  const [login, setLogin] = useState({ login: "" });
  const [error, setError] = useState("");
  const [isSucsess, setSucsess] = useState(false);
  const myToken = localStorage.getItem("token");

  async function create(e) {
    e.preventDefault();
    const response = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(login),
    });
    if (!response.ok) {
      response
        .json()
        .then((res) => res.message)
        .then((res) => {
          setSucsess(false);
          throw new Error(res);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else setSucsess(true);
  }

  const handleChange = (e) => {
    setLogin({ login: e.target.value });
  };

  return (
    <div className={classes.Transfer}>
      <h1>Создание пользователя</h1>
      <form>
        <div className={classes.Inner}>
          <div className={classes.Row}>
            <label>Логин</label>
            <input onChange={handleChange} />
          </div>
          <button type="submit" onClick={create}>
            Отправить
          </button>
        </div>
        <div>{isSucsess ? "Пользователь успешно создан!" : error}</div>
      </form>
    </div>
  );
};

export default Create;
