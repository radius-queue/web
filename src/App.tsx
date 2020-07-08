import React from 'react';
import {QueueView} from './post-log-in/queue-view';
import {TEST_QUEUE, UW_MAP_PROPS} from './util/HardcodedData';
import BusinessLogInPage from './pre-log-in/log-in';
import RegistrationPage from './pre-log-in/register';
import {ProfileMap} from './post-log-in/maps/profile-map';
import {Hub} from './post-log-in/hub';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import firebase from 'firebase/app';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
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
          <Route exact path="/post-log-in/queue-view">
            <QueueView queue={TEST_QUEUE}/>
          </Route>
          <Route exact path="/pre-log-in/log-in">
            <BusinessLogInPage />
          </Route>
          <Route exact path="/pre-log-in/register">
            <RegistrationPage />
          </Route>
          <PrivateRoute path="/post-log-in/hub">
            <Hub />
          </PrivateRoute>
          <Route exact path='/post-log-in/map'>
            <ProfileMap {...UW_MAP_PROPS}/>
          </Route>
          <Route path="/" render={() => <div>404</div>} />
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
              <Link to="/pre-log-in/register">Register</Link>
            </li>
            <li>
              <Link to="/post-log-in/hub">Hub</Link>
            </li>
            <li>
              <Link to='/post-log-in/map'>Map</Link>
            </li>
            <li onClick={() => signOut()}>
              <button>Sign Out</button>
            </li>
          </ul>
        </nav>


      </div>
    </Router>
  );
}

/**
 * 
 */
function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

/**
 * 
 * @param param0 
 */
function PrivateRoute({children, ...rest}: privateRouteProps) {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={() =>
        firebase.auth().currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/pre-log-in/log-in',
              state: {from: location},
            }}
          />
        )
      }
    />
  );
}

interface privateRouteProps {
  children: any,
  path: string,
};

export default App;
