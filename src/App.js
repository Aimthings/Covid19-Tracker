import React, { Suspense } from 'react';
import { WaveLoading } from 'react-loadingg';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './common/FontawesomeIcons';

import './App.css';

const HomePage = React.lazy(() => import('./views/HomePage'));
const StatePage = React.lazy(() => import('./views/StatePage'));
const Page404 = React.lazy(() => import('./common/Error/Page404'));

const App = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<WaveLoading />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/state/:stateCode" component={StatePage} />
          <Route component={Page404} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </BrowserRouter >
  );
};

export default App;
