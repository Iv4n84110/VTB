import React, {useState, useEffect} from "react";

import classes from './styles.css'

const Users = () => {


    const [users, setUsers] = useState(null)
    useEffect(() => {
        fetch("https://run.mocky.io/v3/1b0f1a45-c8dc-441b-b566-00a28a3fd006")
            .then((res) => res.json())
            .then((res) => setUsers(res.users))
    }, [])


    {
        console.log(users)
    }

    const tabs = users ? users.map(user => {
            return <div className={classes.Tab}>
                <div className={classes.ButtonGroup}>
                    <button className={[classes.Button, classes.Refactor].join(' ')}></button>
                    <button className={[classes.Button, classes.Cancel].join(' ')}></button>
                    <button className={[classes.Button, classes.Delete].join(' ')}></button>
                </div>
                <span className={classes.LoginText}>{user.login}</span>
                <span className={classes.FilesText}>{user.files} Файлов</span>
            </div>
        })
        : null

    return (
        <div className={classes.Users}>
            <h1>
                Пользователи
            </h1>
            <div className={classes.TabsWrapper}>
                {tabs}
                {tabs}
                {tabs}
            </div>
        </div>

    )

}

export default Users;