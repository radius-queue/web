import React from 'react';
import './landing-page.css';

/**
 * the landing page for our website.
 *
 * @return {jsx} the HTML to be displayed for this component.
 */


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

export default DefaultLandingPage;
