import React from 'react';
import {QueueView} from './queue-view';
import StatsPage from './stats';
import ProfilePage from './profile';
import {TEST_QUEUE} from './../util/HardcodedData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hub.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';
// import './App.css';

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

export const Hub = () => {
  const history = useHistory();
  const {path, url} = useRouteMatch();

  return (
    <div id="whole-hub">
      <Navbar bg="primary" variant="dark" id="hub-nav">
        <Navbar.Brand>Radius</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={`${url}/stats`}>Stats</Nav.Link>
          <Nav.Link as={Link} to={`${url}/queue-view`}>Queue</Nav.Link>
          <Nav.Link as={Link} to={`${url}/profile`}>Profile</Nav.Link>
        </Nav>
        <Form inline>
          <Button as={Link} to={`${url}`} onClick={() => signOut(history)}>Sign out</Button>
        </Form>
      </Navbar>
      <div id="hub-content">
        <Switch>
          <Route exact path={path}>
            <h3>Welcome to the hub!</h3>
          </Route>
          <Route path={`${path}/stats`}>
            <StatsPage />
          </Route>
          <Route path={`${path}/queue-view`}>
            <QueueView queue={TEST_QUEUE}/>
          </Route>
          <Route path={`${path}/profile`}>
            <ProfilePage uid={user}/>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

/**
 * Signs the current user out and redirects to log in page.
 * @param {router-history} history the router history from the page.
 */
function signOut(history: any) {
  firebase.auth().signOut().then(function() {
    history.push('/');
  }).catch(function(error) {
    // An error happened.
  });
}
