import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Main, Admin, Page404} from './pages';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/admin/:params" component={Admin}/>
                    <Route component={Page404}/>
                </Switch>
            </BrowserRouter>

        </div>
    );
}


export default App;
