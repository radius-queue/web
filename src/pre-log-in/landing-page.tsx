import React from 'react';
import OurTeamPage from './our-team';
import './landing-page.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import {
  Link,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

/**
 * the landing page for our website.
 *
 * @return {jsx} the HTML to be displayed for this component.
 */
const LandingPage = () => {
  const {path, url} = useRouteMatch();

  return (
    <div>
      <Navbar id="landing-page-header">
        <Link id='the-title' to="/">Radius</Link>
        <Nav id='landing-page-links'>
          <Link to={`${url}/our-team`}>Our Team</Link>
          <Link to="/pre-log-in/register">Register</Link>
          <Link to="/post-log-in/hub">Log In</Link>
        </Nav>
      </Navbar>
      <div>
        <Switch>
          <Route path={`${path}/our-team`}>
            <OurTeamPage />
          </Route>
          <Route path={`${path}`}>
            <DefaultLandingPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const DefaultLandingPage = () => {
  return (
    <div id="landing-page-display">
      <img
        className="d-block w-100"
        src="../../images/vector-1.png"
        alt="Businesses with Radii"
      />
      <h1>Radius for Business</h1>
      <p>Welcome to a new era of waiting rooms.</p>
    </div>
  );
};

export default LandingPage;
