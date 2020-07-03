import React from 'react';
import {QueueList} from './queue-view';
import StatsPage from './stats';
import ProfilePage from './profile';
import {TEST_QUEUE} from './../util/HardcodedData';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

export const Hub = () => {
  return (
    <Router>
      <nav>
        <Link to="/stats">Stats</Link>
        <Link to="/queue-view">Queue</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Switch>
        <Route path="/stats">
          <StatsPage />
        </Route>
        <Route path="/queue-view">
          <QueueList queue={TEST_QUEUE}/>
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  );
};
