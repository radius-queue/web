import React, {useState} from 'react';
import {useForm} from '../logic/logic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './register.css';
import './../firebase.ts';
import firebase from 'firebase/app';
import {Link} from 'react-router-dom';
import VerifyUserModal from './verify-user';

interface ValidityState {
  submitted: boolean;
  email: [boolean, string];
  password: [boolean, string];
}

const initialState : ValidityState = {
  submitted: false,
  email: [true, ''],
  password: [true, ''],
};

/**
 * The component that handles registering a new business.
 * @return {jsx} the HTML display for the component.
 */
const RegistrationPage = () => {
  const [formValues, setFormValues] = useForm({email: '', password: '',
    confirm: ''});

  const [validity, setValidity] = useState(initialState);
  const [verifyUserModalShow, setVerifyUserModalShow] = useState(false);

  /**
   * Boolean method returns true when user fills in all fields in
   * registration page.
   * @return {boolean} whether all fields are completed
   */
  const allFieldsCompleted : () => boolean = () => {
    let result : boolean = true;
    for (const field of Object.keys(formValues)) {
      result = result && formValues[field].length > 0;
    }
    return result;
  };

  /**
   * Method that checks if password/confirm password are valid.
   * @return {[boolean, string]} string given validation for user input
   */
  const validatePassword : () => [boolean, string] = () => {
    const result : [boolean, string] = [true, ''];
    if (formValues.password.length < 6) {
      result[0] = false;
      result[1] = 'Passwords must be at least 6 characters';
    } else if (formValues.password !== formValues.confirm) {
      result[0] = false;
      result[1] = 'Passwords do not match.';
    }
    return result;
  };

  /**
   * Async function that handles user registration with firebase and validates
   * form of user input
   * @param {React.FormEvent<HTMLFormElement>} e form submission
   */
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidity(initialState);
    const validityObject : any = {
      submitted: true,
      password: validatePassword(),
      email: [true, ''],
    };
    const fieldsFilled : boolean = allFieldsCompleted();
    let shouldSetValidity : boolean = true;
    if (!!validityObject.password[0] && fieldsFilled) {
      // Create a user
      const createResult = await firebase.auth()
          .createUserWithEmailAndPassword(formValues.email, formValues.password)
          .then(function() {
            // When user is created, send an email verification
            const user = firebase.auth().currentUser;
            user?.sendEmailVerification()
              .then(function() {
                setVerifyUserModalShow(true);
              })
              .catch(function(error) {
                const result : [boolean, string] = [false, error.message];
                setValidity({
                  ...validityObject,
                  email: result,
                });
                return false;
              });
          })
          .catch(function(error) {
            const result : [boolean, string] = [false, error.message];
            setValidity({
              ...validityObject,
              email: result,
            });
            return false;
          });
      if (typeof createResult === 'boolean') {
        shouldSetValidity = false;
      }
    }
    if (shouldSetValidity) {
      setValidity(validityObject);
    }
  };

  return (
    <div id="reg-container">
      <Container id="landing-page-display">
        <h1>Register</h1>
        <p id="description">
          Come Reimagine the Waiting Room With Us
        </p>
      </Container>
      <Card id="reg-card">
        <Form noValidate onSubmit={submitForm}>
          <Form.Group controlId="email">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              className="input-box"
              type="email"
              name="email"
              value={formValues.email}
              placeholder="account@example.com"
              onChange={setFormValues}
              isInvalid={validity.submitted && !validity.email[0]}
            />
            <Form.Control.Feedback type='invalid'>
              {validity.email[1]}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              className="input-box"
              type="password"
              name="password"
              value={formValues.password}
              placeholder="Password"
              onChange={setFormValues}
              isValid={validity.submitted && !!validity.password[0]}
              isInvalid={validity.submitted && !validity.password[0]}
            />
            <Form.Control.Feedback type='invalid'>
              {validity.password[1]}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="confirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="input-box"
              type="password"
              name="confirm"
              value={formValues.confirm}
              placeholder="Confirm Password"
              onChange={setFormValues}
              isValid={validity.submitted && !!validity.password[0]}
              isInvalid={validity.submitted && !validity.password[0]}
            />
            <Form.Control.Feedback type='invalid'>
              {validity.password[1]}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Button type='submit' style={{width: '100%'}}>
          Register</Button>
        </Form>
      </Card>
      <div id="already-account">
        Already have an account? <Link to="./log-in">
          Sign in here.
        </Link>
      </div>
      <VerifyUserModal
        show={verifyUserModalShow}
        onHide={() => setVerifyUserModalShow(false)}
      />
    </div>
  );
};

export default RegistrationPage;
