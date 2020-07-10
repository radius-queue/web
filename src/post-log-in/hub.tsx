import React, {useState} from 'react';
import {QueueView} from './queue-view';
import StatsPage from './stats';
import ProfilePage from './profile';
import {TEST_QUEUE} from './../util/HardcodedData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hub.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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

/**
 *
 */
function ControlledTabs({uid}: HubProps) {
  const [key, setKey] = useState('profile');

  const history = useHistory();
  const {path, url} = useRouteMatch();

  return (
    <Tab.Container defaultActiveKey='profile'>
      <Navbar id="hub-nav" onSelect={(k: string) => setKey(k)}>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={`${url}/stats`}>Stats</Nav.Link>
          <Nav.Link as={Link} to={`${url}/queue-view`}>Queue</Nav.Link>
          <Nav.Link as={Link} to={`${url}/profile`}>Profile</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to={`${url}`}
            onClick={() => signOut(history)}>Sign out</Nav.Link>
        </Nav>
      </Navbar>
      <Tab.Content>
        <Switch>
          <Tab.Pane as={Route} eventKey='stats' exact path={`${path}/stats`}>
            <StatsPage />
          </Tab.Pane>
          <Tab.Pane as={Route} eventKey='queue' exact path={`${path}/queue-view`}>
            <QueueView queue={TEST_QUEUE}/>
          </Tab.Pane>
          <Tab.Pane as={Route} eventKey='profile' exact path={`${path}/profile`}>
            <ProfilePage uid={uid}/>
          </Tab.Pane>
        </Switch>
      </Tab.Content>
    </Tab.Container>
  );
}

export const Hub = ({uid}: HubProps) => {
  const history = useHistory();
  const {path, url} = useRouteMatch();

  // const [key, setKey] = useState('profile');

  return (
  // <ControlledTabs uid={uid}/>
  // <Tabs
  //   id='hub-nav'
  //   activeKey={key}
  //   onSelect={(k: string) => setKey(k)}
  // >
  //   <Tab eventKey='profile' title='Profile'>
  //     <ProfilePage uid={uid}/>
  //   </Tab>
  //   <Tab eventKey='queue' title='Queue'>
  //     <QueueView queue={TEST_QUEUE}/>
  //   </Tab>
  //   <Tab eventKey='stats' title='Stats'>
  //     <StatsPage />
  //   </Tab>
  // </Tabs>


    <div id="whole-hub">
      <Navbar bg="primary" variant="dark" id="hub-nav">
        <Navbar.Brand>Radius</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={`${url}/profile`}>Profile</Nav.Link>
          <Nav.Link as={Link} to={`${url}/queue-view`}>Queue</Nav.Link>
          <Nav.Link as={Link} to={`${url}/stats`}>Stats</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to={`${url}`}
            onClick={() => signOut(history)}>Sign out</Nav.Link>
        </Nav>
      </Navbar>
      <div id="hub-content">
        <Switch>
          <Route exact path={`${path}/stats`}>
            <StatsPage />
          </Route>
          <Route exact path={`${path}/queue-view`}>
            <QueueView queue={TEST_QUEUE}/>
          </Route>
          <Route exact path={`${path}/profile`}>
            <ProfilePage uid={uid}/>
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
