import React, {useState} from "react";

import classes from './styles.css'

const LoginButton = (props) => {

    return (
        <button onClick={props.modalHandler} className={classes.LoginButton}>
            {props.children}
        </button>

    )
}

export default LoginButton;