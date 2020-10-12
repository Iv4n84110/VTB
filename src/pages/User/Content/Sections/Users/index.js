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
        return <div className={classes.Tab}>{user.login}</div>
        })
        : null

    return (
        <div className={classes.TabsWrapper}>
            {tabs}
        </div>
    )

}

export default Users;