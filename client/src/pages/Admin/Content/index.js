import React from "react";
import Sections from "./Sections";
import Sidebar from "./Sidebar";

import classes from './styles.css'

const Content = () => {
    return (
        <main className={classes.Content}>
            <Sidebar></Sidebar>
            <Sections></Sections>
        </main>
    )

}

export default Content;