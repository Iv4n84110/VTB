import React, {useState, useEffect} from "react";

import classes from './styles.css'
import User from "./User";

const Users = () => {


    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch("https://run.mocky.io/v3/eed4bc68-7f90-4c4f-985e-da8cd8cfeb3b")
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