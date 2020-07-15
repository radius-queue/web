import React from 'react';
import Card from 'react-bootstrap/Card';

import {
  Link,
} from 'react-router-dom';

const LandingPage = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Link as={Link} to="/pre-log-in/register">Register</Card.Link>
        <Card.Link as={Link} to="/post-log-in/hub">Log In</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default LandingPage;