import React from 'react';
import {useForm} from '../logic/logic';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import firebase from 'firebase/app';
import './verify-user.css';

import {useState} from 'react';

const ForgotPasswordModal = ({show, onHide}: ForgotPasswordModalProps) => {
  const [formValues, setFormValues] = useForm({email: ''});
  const [displayResetSuccess, setDisplayResetSuccess] = useState(false);

  const submitPasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(formValues.email).then(function() {
      setDisplayResetSuccess(true);
    }).catch(function(error) {
      console.log('Error sending password reset:' + error);
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reset Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Enter your email and instructions for resetting your password will
          be emailed to you.
        </h4>
        <Form onSubmit={submitPasswordReset}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              value={formValues.email}
              onChange={setFormValues}
              placeholder="Email Address"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Alert show={displayResetSuccess}>
          Reset password email sent!
        </Alert>
      </Modal.Footer>
    </Modal>
  );
};

interface ForgotPasswordModalProps {
  show: boolean, // wheter the modal is displayed or not
  onHide: () => void, // function to close the modal
}

export default ForgotPasswordModal;
