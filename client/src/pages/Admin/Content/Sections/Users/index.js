import React, {useState, useEffect} from "react";

import classes from './styles.css'
import User from "./User";

const Users = () => {


    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch("api/user/get-all")
            .then((res) => res.json())
            .then((res) => setUsers(res.users))
    }, [])

    useEffect(() => {
        console.log(tabs())

    }, [users])

    const tabs = () => {
        return users.map((user, i) => {
            return <User user={user}
                         key ={i}
                         index={i}
                         delete={(name) => setUsers(users.filter(item => item.login !== name))}/>

        })
    }

    return (
        <div className={classes.Users}>
            <h1>
                Пользователи
            </h1>
            <div className={classes.TabsWrapper}>
                {tabs()}
            </div>
        </div>

    )

}

export default Users;