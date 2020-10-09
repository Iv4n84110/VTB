import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Page404, Main, User } from './pages';



function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/user" component={User}/>
                <Route component={Page404}/>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
