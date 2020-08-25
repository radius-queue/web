import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import firebase from 'firebase/app';
import './verify-user.css';

import {useHistory} from 'react-router-dom';

import {useState} from 'react';

/**
 * The modal informing the user that they must verify their email
 * in order to view their hub. Provides an option to resend the
 * verification email and a link to the login page.
 * @param {VerifyUserModalProps} param0 boolean that determines
 * whether the modal should be displayed or not (show) and a function
 * for hiding the modal (onHide).
 * @return {Modal} Modal asking user to verify their email.
 */
const VerifyUserModal = ({show, onHide}: VerifyUserModalProps) => {
  const history = useHistory();

  const [displayResendSuccess, setDisplayResendSuccess] = useState(false);

  /**
   * Resends email verification email to the current user.
   */
  const resendVerificationEmail = () => {
    const user = firebase.auth().currentUser;
    user?.sendEmailVerification()
    .then(() => setDisplayResendSuccess(true))
    .catch(function(error) {
      console.log(error);
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
          Verify Your Email
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Please verify your email before logging in.</h4>
        <p>
          A verification email has been sent to you with a link.
          Once you click the link, you will be able to log in.
        </p>
      </Modal.Body>
      <Modal.Footer id="pre-modal-footer">
        <Alert show={displayResendSuccess}>
          Verification email resent!
        </Alert>
        <Button onClick={() => {
          resendVerificationEmail();
        }}>
          Resend verification email
        </Button>
        <Button onClick={() => {
          onHide();
          history.replace('/log-in');
        }}>
          Go to log in page
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

interface VerifyUserModalProps {
  show: boolean, // wheter the modal is displayed or not
  onHide: () => void, // function to close the modal
}

export default VerifyUserModal;
