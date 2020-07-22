import React, {useState, useEffect} from 'react';
import QueueTab from './queue/queue-wrapper';
// eslint-disable-next-line no-unused-vars
import {Business} from '../util/business';
import ProfilePage from './profile-page/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hub.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import firebase from 'firebase/app';
// eslint-disable-next-line no-unused-vars
import {Queue} from '../util/queue';
import {auth} from '../firebase';

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

/**
 * Presents the nav bar with links to the hub pages.
 * Retrieves the user's business and queue for presenting on those pages.
 * @return {jsx} Hub page.
 */
export const Hub = () => {
  const history = useHistory();
  const {path, url} = useRouteMatch();
  const [business, setBusiness] = useState<Business | undefined | null>(null);
  const [queue, setQueue] = useState<Queue| undefined>(undefined);

  useEffect(() => {
    if (!business) {
      /**
       * Retrieves the user's business info and sets the business for the page.
       */
      const queryForBusiness = async () => {
        const val : Business | undefined =
          await getBusiness(auth.currentUser!.uid);
        setBusiness(val);
      };

      queryForBusiness();
    }
  }, []);


  useEffect(() => {
    if (!queue) {
      /**
       * Retrieves the queue for the business and sets the page's queue.
       * Currently retrieves the business' FIRST queue. If multiple queue
       * functionality is added modification will be necessary.
       */
      const queryForQueue = async () => {
        if (business) {
          const val : Queue | undefined = await getQueue(
              business!.locations[0].queues[0]);
          if (val) {
            setQueue(val!);
          }
        }
      };

      queryForQueue();
    }
  }, [business, queue]);

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
          <Button id='sign-out-button' onClick={() => {
            const isEditing = document.getElementById('submit-changes-button');
            if (isEditing === null) {
              signOut(history);
            } else {
              if (window.confirm('You have unsaved changes.' +
                 ' Are you sure you want to sign out?')) {
                signOut(history);
              };
            }
          }}
          >
            Sign Out
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
              business={business} setQueue={setQueue}/>
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
