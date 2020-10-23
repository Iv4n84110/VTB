import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Main, User, Page404} from './pages';
import Statistics from './pages/Statistics/index.js'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/admin/:params" component={User}/>
                    <Route exact path="/statistics" component={Statistics}/>
                    <Route component={Page404}/>
                </Switch>
            </BrowserRouter>

        </div>
    );
}


export default App;
