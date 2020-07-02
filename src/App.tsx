import React from 'react';
import {QueueList} from './post-log-in/queue-view';
import {TEST_QUEUE} from './util/HardcodedData';
import BusinessLogInPage from './pre-log-in/log-in';
import RegistrationPage from './pre-log-in/business-register';
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
      <div>
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
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/post-log-in/queue-view">
            <QueueList queue={TEST_QUEUE}/>
          </Route>
          <Route path="/pre-log-in/log-in">
            <BusinessLogInPage />
          </Route>
          <Route path="/pre-log-in/business-register">
            <RegistrationPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
