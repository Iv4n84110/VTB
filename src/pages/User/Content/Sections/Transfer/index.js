import React from "react";

import classes from './styles.css'

const Transfer = () => {
    return (
        <div className={classes.Transfer}>
            <h1>Информация о переводе</h1>
            <div className={classes.Inner}>
                <div className={classes.Row}>
                    <label>Кому</label>
                    <input />
                </div>
                <div className={classes.Row}>
                    <label >Сумма перевода</label>
                    <input type="number" />
                </div>
                <div className={classes.Row}>
                    <label>Сообщение получателю</label>
                    <textarea></textarea>
                </div>
                <button type="submit">Отправить</button>
            </div>
        </div>
    )

}

export default Transfer;