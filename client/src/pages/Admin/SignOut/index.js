import React, { useContext } from "react";
import { AuthContext } from "../../../utils";

import classes from "./styles.css";

const SignOut = (props) => {
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
  };

  return (
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
