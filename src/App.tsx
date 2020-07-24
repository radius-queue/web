import React, {useEffect, useState} from 'react';
import BusinessLogInPage from './pre-log-in/log-in';
import RegistrationPage from './pre-log-in/register';
import OurTeamPage from './pre-log-in/our-team';
import DefaultLandingPage from './pre-log-in/landing-page';
import LandingPageNav from './pre-log-in/landing-nav';
import {Hub} from './post-log-in/hub';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {auth} from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
        <Route exact path="/register">
          <LandingPageNav />
          <RegistrationPage />
        </Route>
        <PrivateRoute path="/hub" isLoading={isLoading}>
          <Hub />
        </PrivateRoute>
        <Route exact path="/log-in">
          <LandingPageNav />
          <BusinessLogInPage />
        </Route>
        <Route exact path="/url-based-queue">
          <QueueURLViewer/>
        </Route>
        <Route exact path="/our-team">
          <LandingPageNav />
          <OurTeamPage />
        </Route>
        <Route exact path="/">
          <LandingPageNav />
          <DefaultLandingPage />
        </Route>
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
        isLoading || auth.currentUser?.emailVerified ? (
          auth.currentUser ? children : null
        ) : (
          <Redirect
            to={{
              pathname: '/log-in',
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
