import React from 'react';
import Card from 'react-bootstrap/Card';

import {
  Link,
} from 'react-router-dom';

/**
 * the landing page after the user signs in.
 *
 * @return {jsx} the HTML to be displayed for this component.
 */
const LandingPage = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Link as={Link} to="/pre-log-in/register">Register</Card.Link>
          <Card.Link as={Link} to="/post-log-in/hub">Log In</Card.Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <img src="./../images/vector-1.png" alt="Businesses with Radii" />
        </Card.Body>
      </Card>
    </div>
  );
};

export default LandingPage;
