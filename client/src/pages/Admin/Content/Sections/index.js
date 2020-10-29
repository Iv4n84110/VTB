import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Create from "./Create";
import Users from "./Users";
import Statistics from "./Statistics";

import classes from './styles.css'

const Sections = () => {

    return (
        <div className={classes.Wrapper}>
            <Switch>
                <Route path='/admin/create' component={Create}/>
                <Route path="/admin/users" component={Users}/>
                <Route path="/admin/statistics" component={Statistics}/>
                <Route>
                    <Redirect to="/admin/create"/>
                </Route>
            </Switch>
        </div>
    )

}

export default Sections;