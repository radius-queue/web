import React from 'react';
import {QueueList, UserCard, QueueView} from './QueueView/QueueView';
import {TEST_QUEUE} from './util/HardcodedData';
import BusinessLogInPage from './logIn/log-in';
import RegistrationPage from './register/business-register';
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
              <Link to="/QueueView/QueueView">QueueView</Link>
            </li>
            <li>
              <Link to="/logIn/log-in">Log In</Link>
            </li>
            <li>
              <Link to="/register/business-register">Register</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/QueueView/QueueView">
            <QueueView queue={TEST_QUEUE}/>
          </Route>
          <Route path="/logIn/log-in">
            <BusinessLogInPage />
          </Route>
          <Route path="/register/business-register">
            <RegistrationPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
