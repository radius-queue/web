import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import firebase from 'firebase/app';
import './verify-user.css';

import {useHistory} from 'react-router-dom';

import {useState} from 'react';

const VerifyUserModal = ({show, onHide}: VerifyUserModalProps) => {
  const history = useHistory();

  const [displayResendSuccess, setDisplayResendSuccess] = useState(false);

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
          Verify your email!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Please verify your email before logging in.</h4>
        <p>
          An email has been sent to you with a link to log in
          to your account.
        </p>
      </Modal.Body>
      <Modal.Footer>
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
