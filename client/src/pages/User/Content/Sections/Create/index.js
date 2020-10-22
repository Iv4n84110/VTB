import React from "react";

import classes from './styles.css'

const Create = () => {
    return (
        <div className={classes.Transfer}>
            <h1>Создание пользователя</h1>
            <form>
                <div className={classes.Inner}>
                    <div className={classes.Row}>
                        <label>Логин</label>
                        <input />
                    </div>
                    <button type="submit">Отправить</button>
                </div>
            </form>
        </div>
    )

}

export default Create;