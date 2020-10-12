import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Create from "./Create";
import Users from "./Users";

import classes from './styles.css'

const Sections = () => {

    return (
        <div className={classes.Wrapper}>
            <Switch>
                <Route path='/admin/create' component={Create}/>
                <Route path="/admin/users" component={Users}/>
                <Route>
                    <Redirect to="/admin/create"/>
                </Route>
            </Switch>
        </div>
    )

}

export default Sections;