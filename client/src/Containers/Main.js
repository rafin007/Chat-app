import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chat from '../Components/Chat';
import Join from '../Components/Join';

const App = props => {
    return (
        <Switch>
            <Route path="/chat" component={Chat} />
            <Route path="/" exact component={Join} />
        </Switch>
    );
}

export default App;