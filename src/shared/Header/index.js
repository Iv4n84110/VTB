import React, {useState} from "react";

const Header = (props) => {

    return(
        <header>
            ХЕДЕР
            <button onClick={props.modalHandler}>
                sign in
            </button>
        </header>
    )
}

export default Header;