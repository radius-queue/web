import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Party} from '../../util/queue';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import {changePhone, ChangePhoneProps} from '../../util/util-functions';

interface ModalProps {
  show: boolean, // wheter the modal is displayed or not
  mainAction: (p: Party) => void, // submit action
  party ?: Party | undefined, // a party that is targeted
  close: () => void, // functino to close the modal
}

/**
 * Modal for adding a customer on the queue page.
 *
 * @param {ModalProps} props the properties passed into the component.
 * @return {jsx} the display for the add customer modal.
 */
export const AddCustomerModal = ({show, close, mainAction} : ModalProps) => {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [size, setSize] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneDisplay, setPhoneDisplay] = useState('');
  const [quote, setQuote] = useState(0);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setValidated(!show);
  }, [show]);

  const clearState = () => {
    setFirst('');
    setLast('');
    setSize(0);
    setPhoneNumber('');
    setPhoneDisplay('');
  };

  const onHide = () => {
    setValidated(false);
    close();
    clearState();
  };

  /**
   * Utilizes the changePhone util function to support formatted
   * phone number display while maintaining a stripped down phone
   * number string.
   * @param {string} next The user phone number input.
   */
  const changePhoneNum = (next: string) => {
    const {numbers, display}: ChangePhoneProps = changePhone(next);
    setPhoneNumber(numbers);
    setPhoneDisplay(display);
  };

  /**
   * Checks if the state of the phone number value is a
   * ten digit number.
   *
   * @return {boolean} whether or not the current phone number
   * input is a valid number.
   */
  const checkValid = () => {
    return (phoneNumber.length === 10);
  };

  /**
   * Submission handler for the add party form.
   *
   * @param {React.FormEvent<HTMLFormElement>} e form submission
   * event.
   */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkValid()) {
      const party : Party = new Party(
          firstName,
          size,
          phoneNumber,
          quote,
          new Date(),
          lastName,
          [],
          '',
      );

      mainAction(party);
      onHide();
    }
    setValidated(true);
  };

  return (<Modal show={show} onHide={onHide}>
    <Modal.Header>
      <Modal.Title>Add a Party</Modal.Title>
    </Modal.Header>
    <Form
      style={{margin: '2%'}}
      onSubmit={onSubmit}
      noValidate
    >
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder='Michael'
              isValid={validated && firstName.length > 0}
              isInvalid={validated && firstName.length === 0}
              type='text'
              onChange={(e) => setFirst(e.target.value)}
              name='first name'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please Enter First Name
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder='Jordan'
              isValid={validated}
              type='text'
              onChange={(e) => setLast(e.target.value)}
              name='last name'
            />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row style={{marginTop: '5px'}}>
        <Col>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder='(555)555-5555'
              type='text'
              isValid={validated && phoneNumber.length === 10}
              isInvalid={validated && phoneNumber.length !== 10}
              onChange={(e) => changePhoneNum(e.target.value)}
              name='phoneNumber'
              value={phoneDisplay}
              required
              maxLength={13}
            />
            <Form.Control.Feedback type='invalid'>
              Please Enter a 10 Digit Phone Number
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row style={{marginTop: '5px'}}>
        <Col>
          <Form.Group>
            <Form.Label>Party Size</Form.Label>
            <Form.Control
              placeholder='2'
              type='number'
              isValid={validated && size > 0}
              isInvalid={validated && size <= 0}
              onChange={(e) => setSize(parseInt(e.target.value))}
              name='size'
              max={100}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please Enter a Valid Group Size
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Time Quote (minutes)</Form.Label>
            <Form.Control
              placeholder='45'
              type='number'
              onChange={(e) => setQuote(parseInt(e.target.value))}
              name='quote'
              max={600}
            />
            <Form.Control.Feedback type='invalid'>
              Please Enter a Quoted Wait Time
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Modal.Footer>
        <Button type='submit' className={'button'}>Add Party</Button>
      </Modal.Footer>
    </Form>
  </Modal>);
};

/**
 * The warning modal for when a party is deleted from the queue.
 *
 * @param {ModalProps} props the properties passed into this component
 * @return {jsx} the HTML display for this component.
 */
export const DeleteCustomerModal = ({show, close, party, mainAction}
  : ModalProps) => {
  const onDelete = () => {
    mainAction(party!);
    close();
  };

  return ( !party ? <div></div> :
    <Modal show={show} onHide={close}>
      <Modal.Header>
        <Modal.Title>
          Are you sure you want to remove
          {' ' + party!.firstName + ' ' + party!.lastName} from the queue?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onDelete} variant='danger'>
          Remove {party!.firstName + ' ' + party!.lastName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteCustomerModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  party: PropTypes.object,
  mainAction: PropTypes.func,
};

interface ClearProps {
  clear: () => void; // function to clear the queue
  show: boolean; // whether or not the modal is visible
  close: () => void; // function to close the modal
}

/**
 * The component for the warning modal when the user attempts to clear
 * the queue.
 *
 * @param {ClearProps} props the properties passed into the component
 * @return {jsx} HTML display for the display of the clear modal.
 */
export const ClearModal = ({clear, show, close} : ClearProps) => {
  /**
   * Callback function for clearing the queue on pressing the clear
   * button.
   */
  const onClear = () => {
    clear();
    close();
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header>
        <Modal.Title>
          Are you sure you want to clear the queue?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onClear} variant='danger'>Clear Queue</Button>
      </Modal.Footer>
    </Modal>
  );
};
