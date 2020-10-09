import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Transfer from "./Transfer";
import Offers from "./Offers";

import classes from './styles.css'

const Sections = () => {

    return (
        <div className={classes.Wrapper}>
            <Switch>
                <Route path='/user/transfers' component={Transfer}/>
                <Route path="/user/offers" component={Offers}/>
                <Route>
                    <Redirect to="/user/transfers"/>
                </Route>
            </Switch>
        </div>
    )

}

export default Sections;