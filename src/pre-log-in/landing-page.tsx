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
          src="../../images/storefront-only.png"
          alt="Businesses with Radii"
        />
        <div>
          <h1 className="hero-text-title">Radius for Business</h1>
          <p className="hero-text-subtitle">The waiting room reimagined.</p>
        </div>
        <div className="radius-container">
          <img
            className="radii-outline"
            src="../../images/radii-outline.png"
            alt="Red Radii outline"
          />
          <div className="overlay">
            <div className="overlay-text">Description of Radius goes here!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLandingPage;
