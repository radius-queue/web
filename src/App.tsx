import React, {useEffect, useState} from 'react';
import BusinessLogInPage from './pre-log-in/log-in';
import RegistrationPage from './pre-log-in/register';
import {Hub} from './post-log-in/hub';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {auth} from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import QueueURLViewer from './pre-log-in/queue-url-viewer';

/**
 * Top Level app component
 *
 * @return {HTMLElement} App HTML
 */
function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub: firebase.Unsubscribe = auth.onAuthStateChanged((newUser) => {
      setIsLoading(false);
    });

    return unsub;
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/pre-log-in/register">
          <RegistrationPage />
        </Route>
        <PrivateRoute path="/post-log-in/hub" isLoading={isLoading}>
          <Hub />
        </PrivateRoute>
        <Route exact path="/pre-log-in/log-in">
          <BusinessLogInPage />
        </Route>
        <Route exact path="/url-based-queue">
          <QueueURLViewer/>
        </Route>
        <Route exact path="/" render={() =>
          <div>
            <Link to="/pre-log-in/register">Register</Link>
            <Link to="/post-log-in/hub">Log In</Link>
          </div>} />
        <Route path="/" render={() => <div>404</div>} />
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
function PrivateRoute({children, isLoading, ...rest}: privateRouteProps) {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={() =>
        isLoading || auth.currentUser ? (
          auth.currentUser ? children : null
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
  isLoading: boolean,
};

export default App;
