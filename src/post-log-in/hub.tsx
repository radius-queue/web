import React from 'react';
import {QueueList} from './queue-view';
import StatsPage from './stats';
import ProfilePage from './profile';
import {TEST_QUEUE} from './../util/HardcodedData';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';

export const Hub = () => {
  const {path, url} = useRouteMatch();
  return (
    <div>
      <nav>
        <Link to={`${url}/stats`}>Stats</Link>
        <Link to={`${url}/queue-view`}>Queue</Link>
        <Link to={`${url}/profile`}>Profile</Link>
      </nav>
      <Switch>
        <Route exact path={path}>
          <h3>Welcome to the hub!</h3>
        </Route>
        <Route path={`${path}/stats`}>
          <StatsPage />
        </Route>
        <Route path={`${path}/queue-view`}>
          <QueueList queue={TEST_QUEUE}/>
        </Route>
        <Route path={`${path}/profile`}>
          <ProfilePage />
        </Route>
      </Switch>
    </div>
  );
};
