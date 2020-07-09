import React from 'react';
import BusinessLogInPage from './pre-log-in/log-in';
import RegistrationPage from './pre-log-in/register';
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
      <Switch>
        <Route exact path="/pre-log-in/register">
          <RegistrationPage />
        </Route>
        <PrivateRoute path="/post-log-in/hub">
          <Hub uid={'GoodFoods'}/>
        </PrivateRoute>
        <Route exact path="/pre-log-in/log-in">
          <BusinessLogInPage />
        </Route>
        <Route path="/" render={() =>
          <div>
            <Link to="/pre-log-in/register">Register</Link>
            <Link to="/post-log-in/hub">Log In</Link>
          </div>} />
      </Switch>
    </Router>
  );
}

/**
 * Wrapper for the Route to the hub page. Requires authentication
 * before allowing the user into the hub. Redirects to the log in
 * page for authentication if user is not logged in.
 * @param {privateRouteProps} param0 children and path
 * of the PrivateRoute
 * @return {Route} Route to hub if logged in, log in page if not.
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
