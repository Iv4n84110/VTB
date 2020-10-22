import React, {useState} from "react";

import classes from './styles.css';


const SignIn = (props) => {
    return (
        <div className={classes.Container}>
            <button className={classes.CloseButton} onClick={props.modalClosed}></button>
            <div className={classes.Form}>
                <form>
                    <fieldset>
                        <div className={classes.Inner}>
                            <legend>Вход</legend>
                            <input placeholder='Логин'></input>
                            <input type='password' placeholder='Пароль'></input>
                            <button className={classes.LoginButton} type="submit">Войти</button>
                        </div>
                    </fieldset>
                </form>
            </div>

        </div>
    )

}

export default SignIn;