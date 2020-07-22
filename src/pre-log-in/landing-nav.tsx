import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {Link, NavLink} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './landing-nav.css';

const LandingPageNav = () => {
  return (
    <Navbar id="landing-page-header">
      <Link id='the-title' to="/">Radius</Link>
      <Nav id='landing-page-links'>
        <NavLink
          to="/our-team"
          activeClassName="landing-nav-selected"
        >
          Our Team
        </NavLink>
        <NavLink
          to="/pre-log-in/register"
          activeClassName="landing-nav-selected"
        >
          Register
        </NavLink>
        <NavLink
          to="/pre-log-in/log-in"
          // to="/post-log-in/hub"
          activeClassName="landing-nav-selected"
        >
          Log In
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default LandingPageNav;
