import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './common/FontawesomeIcons';

import HomePage from './views/HomePage';
import StatePage from './views/StatePage';

import './App.css';

const App = () => {
  return (                                                                      //If url not matched redirect to homepage
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/state/:stateCode" component={StatePage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
