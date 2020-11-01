import React from "react";

import classes from './styles.css';


const SignUp = (props) => {
    return (
        <div className={classes.Container}>
            <button className={classes.CloseButton} onClick={props.modalClosed}></button>
            <div className={classes.Form}>
                <form>
                    <fieldset>
                        <div className={classes.InnerReg}>
                            <legend>Регистрация</legend>
                            <input placeholder='Логин'></input>
                            <input type='password' placeholder='Пароль'></input>
                            <input type='password' placeholder='Подтвердите пароль'></input>
                            <button className={classes.RegisterButton} type="submit">Зарегистрироваться</button>
                            <button className={classes.SwitchButton} type="submit">Войти</button>
                        </div>
                    </fieldset>
                </form>
            </div>

        </div>
    )

}

export default SignUp;