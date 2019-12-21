import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    Homepage
} from './containers';

export default () => {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route path='/' component={Homepage} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}