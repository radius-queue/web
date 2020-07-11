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
  Link,
} from 'react-router-dom';

interface HubProps {
  uid: string,
}

export const Hub = ({uid}: HubProps) => {
  const history = useHistory();
  const {path, url} = useRouteMatch();
  const [business, setBusiness] = useState<Business | undefined>(undefined);

  useEffect(() => {
    setActive();
  });

  return (
    <div id="whole-hub">
      <Navbar bg="primary" variant="dark" id='hub-nav'>
        <Nav className='mr-auto'>
          <Nav.Link id='profile-nav' className='nav-link-item' as={Link} to={`${url}/profile`}>
            Profile
          </Nav.Link>
          <Nav.Link id='queue-view-nav' className='nav-link-item' as={Link} to={`${url}/queue-view`}>
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
            <ProfilePage uid={uid} setBusiness={setBusiness}/>
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
 * Sets the correct nav bar item to be highlighted.
 */
function setActive() {
  const splitUrl: string[] = document.location.toString().split('/');
  const curPage: string = splitUrl[splitUrl.length - 1];

  const allItems = document.getElementsByClassName('nav-link-item');
  let i;
  for (i = 0; i < allItems.length; i++) {
    allItems[i].classList.remove('active');
  }

  const curElement = document.getElementById(curPage + '-nav');
  if (curElement) {
    curElement.classList.add('active');
  }
}

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
