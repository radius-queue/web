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
      <div>
        <img
          className="hero-image"
          src="../../images/storefront-radii-dark.png"
          alt="Businesses with Radii"
        />
        <div className="hero-text">
          <h1>Radius</h1>
          <p>The waiting room reimagined.</p>
        </div>
      </div>
      <div id="landing-page-display-text">
        <h1>Radius for Business</h1>
        <p>Welcome to a new era of waiting rooms.</p>
      </div>
    </div>
  );
};

export default DefaultLandingPage;
