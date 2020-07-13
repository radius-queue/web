import React, {useState, useEffect} from 'react';
import QueueTab from './queue-wrapper';
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
import {Queue} from '../util/queue';
import {auth} from '../firebase';
// import './App.css';

import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Redirect,
  NavLink,
} from 'react-router-dom';
import getBusiness from '../util/get-business';
import getQueue from '../util/get-queue';

export const Hub = () => {
  const history = useHistory();
  const {path, url} = useRouteMatch();
  const [business, setBusiness] = useState<Business | undefined | null>(null);
  const [queue, setQueue] = useState<Queue| undefined>(undefined);

  const queryForBusiness = async () => {
    const val : Business | undefined = await getBusiness(auth.currentUser!.uid);
    setBusiness(val);
  };

  const queryForQueue = async () => {
    if (business) {
      const val : Queue | undefined = await getQueue(
          business!.locations[0].queues[0]);
      if (val) {
        setQueue(val!);
      }
    }
  };

  useEffect(() => {
    if (!business) {
      queryForBusiness();
    }
  }, []);


  useEffect(() => {
    if (!queue) {
      queryForQueue();
    }
  }, [business]);

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
          <Button id='sign-out-button' onClick={() => {
            console.log('business:' + business +'\n');
            console.log('queue:' + queue +'\n');
          }}>
            asd
          </Button>
        </Form>
      </Navbar>
      <div id="hub-content">
        <Switch>
          <Route exact path={`${path}/queue-view`}>
            <QueueTab business={business} queue={queue} setQueue={setQueue}/>
          </Route>
          <Route exact path={`${path}/profile`}>
            <ProfilePage uid={auth.currentUser!.uid} setBusiness={setBusiness}
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
    console.log('Error signing out:', error);
  });
}
