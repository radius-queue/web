import React, {useState, useEffect} from 'react';
import {QueueView} from './queue-view';
import {Business} from '../util/business';
import ProfilePage from './profile';
import {TEST_QUEUE} from './../util/HardcodedData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hub.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import firebase from 'firebase/app';
// import './App.css';

import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Redirect,
  NavLink,
} from 'react-router-dom';

interface HubProps {
  uid: string,
}

export const Hub = ({uid}: HubProps) => {
  const history = useHistory();
  const {path, url} = useRouteMatch();
  const [business, setBusiness] = useState<Business | undefined>(undefined);

  return (
    <div id="whole-hub">
      <Navbar bg="primary" variant="dark" id='hub-nav'>
        <Nav className='mr-auto'>
          <Nav.Link id='profile-nav' className='nav-link-item'
            as={NavLink} to={`${url}/profile`}>
            Profile
          </Nav.Link>
          <Nav.Link id='queue-view-nav' className='nav-link-item not-profile'
            as={NavLink} to={`${url}/queue-view`}>
            Queue
          </Nav.Link>
        </Nav>
        <Form inline>
          <Button id='sign-out-button' onClick={() => signOut(history)}>
            Sign Out
          </Button>
        </Form>
      </Navbar>
      <div id="hub-content">
        <Switch>
          <Route exact path={`${path}/queue-view`}>
            <QueueView queue={TEST_QUEUE}/>
          </Route>
          <Route exact path={`${path}/profile`}>
            <ProfilePage uid={uid} setBusiness={setBusiness}
              business={business}/>
          </Route>
          <Redirect exact from={`${path}`} to={`${path}/profile`} />
          <Route path={`${path}`}>
            <div>404</div>
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
