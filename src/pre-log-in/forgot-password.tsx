import React from 'react';
import {useForm} from '../logic/logic';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import firebase from 'firebase/app';
import './verify-user.css';

import {useState} from 'react';

/**
 * The modal displayed when the user clicks Forgot Password. Requires
 * email input and sends a reset password email.
 * @param {ForgotPasswordModalProps} param0 boolean that determines
 * whether the modal should be displayed or not (show) and a function
 * for hiding the modal (onHide).
 * @return {Modal} Modal for resetting user password.
 */
const ForgotPasswordModal = ({show, onHide}: ForgotPasswordModalProps) => {
  const [formValues, setFormValues] = useForm({email: ''});
  const [displayResetSuccess, setDisplayResetSuccess] = useState(false);

  /**
   * Sends a password reset email to the given email.
   * @param {React.FormEvent<HTMLFormElement>} e React form event.
   */
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
        <h4 hidden={displayResetSuccess}>
          Enter your email and instructions for resetting your password will
          be emailed to you.
        </h4>
        <Form onSubmit={submitPasswordReset} hidden={displayResetSuccess}>
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
        <Alert show={displayResetSuccess}>
          Reset password email sent!
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

interface ForgotPasswordModalProps {
  show: boolean, // wheter the modal is displayed or not
  onHide: () => void, // function to close the modal
}

export default ForgotPasswordModal;
