import React from 'react';
import {useForm} from '../logic/logic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './log-in.css';
import './../firebase.ts';
import firebase from 'firebase/app';

import {
  Link,
} from 'react-router-dom';

interface logInValues {
    email: string;
    password: string;
}

/**
 * Renders a page for logging into the business-side web app
 * @return {html} Form with inputs for email, input for password,
 *    and submit button
 */
const BusinessLogInPage = () => {
  const [formValues, setFormValues] = useForm({email: '', password: ''});

  return (
    <div id="login-container">
      <Card id="login-card">
        <h1 className="form-header">Sign in to Ahead for Business</h1>
        <Form>
          <Form.Group controlId="businessLogInEmail">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formValues.email}
              placeholder="account@example.com"
              onChange={setFormValues}
            />
          </Form.Group>
          <Form.Group controlId="businessLogInPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formValues.password}
              placeholder="Password"
              onChange={setFormValues}
            />
          </Form.Group>
          <Button onClick={() => submitFormValues(
              {
                email: formValues.email,
                password: formValues.password,
              },
          )} block>
            Log In
          </Button>
        </Form>
      </Card>
      <div>
        <p>
          New to Ahead? <Link to="./business-register">
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
};

/**
 * Validates the given username and password.
 * @param {logInValues} formValues Email and password entered by the
 *    user when logging in
 */
const submitFormValues = (formValues : logInValues) => {
  firebase.auth()
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error code: ' + errorCode);
        console.log('error message: ' + errorMessage);
      });
  console.log('Log in button pushed');
};

export default BusinessLogInPage;
