import React, {useState, useEffect} from "react";

import classes from './styles.css'

const User = (props) => {

    const [user, setUser] = useState({
        files: props.user.files,
        login: props.user.login,
        active: props.user.active,
        chagePassword: props.user.chagePassword,
        index: props.index
    });

    useEffect(() => {
        setUser({
            files: props.user.files,
            login: props.user.login,
            active: props.user.active,
            chagePassword: props.user.chagePassword,
            index: props.index
        })

    }, [props.delete])

    const enableUser = () => {
        setUser({...user, active: !user.active})
    }

    const managePass = () => {
        setUser({...user, chagePassword: true})
    }


    const firstButton = user.active ? classes.Okay : classes.Cancel;
    const secondButton = user.chagePassword ? classes.Refactored : classes.Refactor;

    return (
        <div className={classes.Tab}>
            <div className={classes.ButtonGroup}>
                <button onClick={enableUser} className={[classes.Button, firstButton].join(' ')}/>
                <button onClick={managePass} className={[classes.Button, secondButton].join(' ')}
                        disabled={user.chagePassword}/>
                <button onClick={() => {
                    props.delete(user.login)
                }} className={[classes.Button, classes.Delete].join(' ')}/>
            </div>
            <span className={classes.LoginText}>{user.login}</span>
            <span className={classes.FilesText}>{user.files} Файлов</span>
        </div>
    )

}

export default User;