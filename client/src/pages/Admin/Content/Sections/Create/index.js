import React from "react";
import { useState, useContext } from "react";
import { AuthContext, fetchRequest } from "../../../../../utils";

import classes from "./styles.css";

const Create = () => {
  const [login, setLogin] = useState({ login: "" });
  const [error, setError] = useState("");
  const [isSucsess, setSucsess] = useState(false);
  const auth = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  const rejectHandler = (response) => {
    if (response === 401) {
      auth.logout();
    }
    setError(response.message);
    setSucsess(false);
  };

  const responseHandler = (response) => {
    setSucsess(true);
  };

  function createHandler(e) {
    e.preventDefault();
    fetchRequest(
      "/api/user/create",
      rejectHandler,
      responseHandler,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      "POST",
      login
    );
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
          <button type="submit" onClick={createHandler}>
            Отправить
          </button>
        </div>
        <div>{isSucsess ? "Пользователь успешно создан!" : error}</div>
      </form>
    </div>
  );
};

export default Create;
