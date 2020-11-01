import React from "react";

import classes from './styles.css'

const LogoutButton = (props) => {

    return (
        <button onClick={props.modalHandler} className={classes.LoginButton}>
            <span className={classes.ButtonText}>{props.children}</span>
        </button>

    )
}

export default LogoutButton;