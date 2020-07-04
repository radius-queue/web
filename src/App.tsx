import React from 'react';
import {QueueView} from './post-log-in/queue-view';
import {TEST_QUEUE} from './util/HardcodedData';
import BusinessLogInPage from './pre-log-in/log-in';
import RegistrationPage from './pre-log-in/business-register';
import {Hub} from './post-log-in/hub';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

/**
 * Top Level app component
 *
 * @return {HTMLElement} App HTML
 */
function App() {
  return (
    <Router>
      <div id="whole-app">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/post-log-in/queue-view">
            <QueueView queue={TEST_QUEUE}/>
          </Route>
          <Route path="/pre-log-in/log-in">
            <BusinessLogInPage />
          </Route>
          <Route path="/pre-log-in/business-register">
            <RegistrationPage />
          </Route>
          <Route path="/post-log-in/hub">
            <Hub />
          </Route>
        </Switch>
        <nav>
          <ul>
            <li>
              <Link to="/post-log-in/queue-view">QueueView</Link>
            </li>
            <li>
              <Link to="/pre-log-in/log-in">Log In</Link>
            </li>
            <li>
              <Link to="/pre-log-in/business-register">Register</Link>
            </li>
            <li>
              <Link to="/post-log-in/hub">Hub</Link>
            </li>
          </ul>
        </nav>


      </div>
    </Router>
  );
}

export default App;
