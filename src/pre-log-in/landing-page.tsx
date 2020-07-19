import React from 'react';
import './landing-page.css';

import {
  Link,
} from 'react-router-dom';

/**
 * the landing page for our website.
 *
 * @return {jsx} the HTML to be displayed for this component.
 */
const LandingPage = () => {
  return (
    <div>
      <div id="landing-page-header">
        <div>
          <Link id='the-title' to="/post-log-in/hub">Radius</Link>
        </div>
        <div id='landing-page-links'>
          <Link to="/pre-log-in/register">Register</Link>
          <Link to="/post-log-in/hub">Log In</Link>
        </div>
      </div>
      <div id="landing-page-display">
        <img
          className="d-block w-100"
          src="../../images/vector-1.png"
          alt="Businesses with Radii"
        />
        <h1>Radius for Business</h1>
        <p>Welcome to a new era of waiting rooms.</p>
      </div>
    </div>
  );
};

export default LandingPage;
