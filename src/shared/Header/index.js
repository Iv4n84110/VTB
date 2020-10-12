import React, {useState} from "react";

import classes from './styles.css'
import Logo from "./Logo";
import LoginButton from "./LoginButton";


const Header = (props) => {

    return(
        <header className={classes.Header}>
            <div className={classes.Row}>
                <div className={classes.LogoWrapper}>
                    <Logo />
                </div>
                <span className={classes.Text}>{'<I21?70'}</span>

                <LoginButton modalHandler={props.modalHandler}>
                    Личный кабинет
                </LoginButton>
            </div>

        </header>
    )
}

export default Header;