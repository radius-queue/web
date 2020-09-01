import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './landing-nav.css';

const LandingPageNav = () => {
  return (
    <Navbar collapseOnSelect expand='lg' variant='dark' id='landing-page-header'>
      <Navbar.Brand><Link id='the-title' to="/">Radius</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse>
        <Nav className='mr-auto'></Nav>
        <Nav id="landing-page-links">
          <NavLink
            to="/our-product"
            activeClassName="landing-nav-selected"
          >
            Our Product
          </NavLink>
          <NavLink
            to="/our-team"
            activeClassName="landing-nav-selected"
          >
            Our Team
          </NavLink>
          <NavLink
            to="/register"
            activeClassName="landing-nav-selected"
          >
            Register
          </NavLink>
          <NavLink
            to="/log-in"
            activeClassName="landing-nav-selected"
          >
            Log In
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

 /*return (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#deets">More deets</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );*/
};

export default LandingPageNav;
