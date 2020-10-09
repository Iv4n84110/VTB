import React from "react";
import {NavLink} from "react-router-dom";

import classes from './styles.css';


const Sidebar = () => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.User}>
                <div className={classes.UserLogo}></div>
                <span className={classes.UserText}>Логин</span>
            </div>
            <nav className={classes.Navigation}>
                <NavLink to="/user/offers" className={classes.Link} activeClassName={classes.Selected}>
                    Предложения
                </NavLink>
                <NavLink to="/user/transfers" className={classes.Link} activeClassName={classes.Selected}>
                    Переводы
                </NavLink>
            </nav>
        </div>

    )

}

export default Sidebar;