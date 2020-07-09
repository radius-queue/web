import React, {useState} from 'react';
import {useForm} from '../logic/logic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './register.css';
import './../firebase.ts';
import firebase from 'firebase/app';
import {Link, useHistory} from 'react-router-dom';

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

const RegistrationPage = () => {
  const [formValues, setFormValues] = useForm({email: '', password: '',
    confirm: ''});

  const [validity, setValidity] = useState(initialState);

  const history = useHistory();

  const allFieldsCompleted : () => boolean = () => {
    let result : boolean = true;
    for (const field of Object.keys(formValues)) {
      result = result && formValues[field].length > 0;
    }
    return result;
  };

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

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidity(initialState);
    let changePage: boolean = true;
    const validityObject : any = {
      submitted: true,
      password: validatePassword(),
      email: [true, ''],
    };
    const fieldsFilled : boolean = allFieldsCompleted();
    let shouldSetValidity : boolean = true;
    if (!!validityObject.password[0] && fieldsFilled) {
      const createResult = await firebase.auth()
          .createUserWithEmailAndPassword(formValues.email, formValues.password)
          .catch(function(error) {
            const result : [boolean, string] = [false, error.message];
            setValidity({
              ...validityObject,
              email: result,
            });
            changePage = false;
            return false;
          });
      if (typeof createResult === 'boolean') {
        shouldSetValidity = false;
      }
    } else {
      changePage = false;
    }
    if (shouldSetValidity) {
      setValidity(validityObject);
    }
    if (changePage) {
      history.replace('/post-log-in/hub');
    }
  };

  return (
    <div id="reg-container">
      <Card bg='dark' text='white' id="reg-card">
        <Card.Title className="form-header-reg">
        Register your business with Radius.</Card.Title>

        <Card.Body>
          <Form noValidate onSubmit={submitForm}>
            <Form.Group controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                placeholder="Enter password here"
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
                type="password"
                name="confirm"
                value={formValues.confirm}
                placeholder="Confirm password"
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
        </Card.Body>

      </Card>
      <div>
        Already have an account? <Link to="./log-in">
          Sign in here.
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
