import React, {useState} from 'react';
import {useForm} from '../logic/logic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './log-in.css';
import './../firebase.ts';
import firebase from 'firebase/app';
import {
  Link,
  useLocation,
  useHistory,
  withRouter,
} from 'react-router-dom';

interface ValidityState {
  username: boolean,
  password: boolean,
  message: string | undefined,
}

/**
 * Renders a page for logging into the business-side web app
 * @return {html} Form with inputs for email, input for password,
 *    and submit button
 */
const BusinessLogInPage = () => {
  const [formValues, setFormValues] = useForm({email: '', password: ''});
  const [validity, setValidity] = useState<ValidityState>({
    username: true,
    password: true,
    message: undefined,
  });

  const history = useHistory();
  const location = useLocation();

  const {from}: any = location.state || {from: {pathname: '/'}};

  const submitFormValues = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await firebase.auth()
        .signInWithEmailAndPassword(formValues.email, formValues.password)
        .then((e) => {
          setValidity({
            username: true,
            password: true,
            message: undefined,
          });
        })
        .catch((error) => {
          setValidity({
            username: false,
            password: false,
            message: error.message,
          });
        });
    history.replace(from.pathname);
  };

  return (
    <div id="login-container">
      <Card id="login-card">
        <h1 className="form-header">Sign in to Radius for Business</h1>
        <Form noValidate onSubmit={submitFormValues}>
          <Form.Group controlId="businessLogInEmail">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formValues.email}
              placeholder="account@example.com"
              onChange={setFormValues}
              isInvalid={!validity.username}
            />
            <Form.Control.Feedback type='invalid'>
              {validity.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="businessLogInPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formValues.password}
              placeholder="Password"
              onChange={setFormValues}
              isInvalid={!validity.password}
            />
          </Form.Group>
          <Button type='submit' block>
            Log In
          </Button>
        </Form>
      </Card>
      <div>
        <p>
          New to Radius? <Link to="./register">
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BusinessLogInPage;
