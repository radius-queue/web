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
        <NavLink to="/our-team" activeClassName="landing-nav-selected">
          Our Team
        </NavLink>
        <Link to="/pre-log-in/register">
          Register
        </Link>
        <Link to="/post-log-in/hub">
          Log In
        </Link>
      </Nav>
    </Navbar>
  );
};

export default LandingPageNav;
