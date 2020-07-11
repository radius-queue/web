import React, {useState} from 'react';
import {QueueView} from './queue-view';
import StatsPage from './stats';
import {Business} from '../util/business';
import ProfilePage from './profile';
import {TEST_QUEUE} from './../util/HardcodedData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hub.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import firebase from 'firebase/app';
// import './App.css';

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  Redirect,
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
      <Tabs defaultActiveKey='profile' id='hub-tabs'>
        <Tab eventKey='profile'
          title={<Link to={`${url}/profile`}>Profile</Link>}
        />
        <Tab eventKey='queue'
          title={<Link to={`${url}/queue-view`}>Queue</Link>}
        />
        <Tab eventKey='signout'
          title={<Link to={`${url}`}
            onClick={() => signOut(history)}>Sign out</Link>}
        />
      </Tabs>
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
