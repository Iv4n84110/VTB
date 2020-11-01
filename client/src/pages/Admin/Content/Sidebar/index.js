import React from "react";
import {NavLink} from "react-router-dom";

import classes from './styles.css';


const Sidebar = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.User}>
                <div className={classes.UserLogo}></div>
                <span className={classes.UserText}>{props.login}</span>
            </div>
            <nav className={classes.Navigation}>
                <NavLink to="/admin/create" className={classes.Link} activeClassName={classes.Selected}>
                    Создать пользователя
                </NavLink>
                <NavLink to="/admin/users" className={classes.Link} activeClassName={classes.Selected}>
                    Пользователи
                </NavLink>
                <NavLink to="/admin/statistics" className={classes.Link} activeClassName={classes.Selected}>
                    Статистика
                </NavLink>
            </nav>
        </div>

    )

}

export default Sidebar;