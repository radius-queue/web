import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Party} from '../../util/queue';
import PropTypes from 'prop-types';

interface ModalProps {
  show: boolean,
  mainAction: (p: Party) => void,
  party ?: Party | undefined,
  close: () => void,
}

export const AddCustomerModal = ({show, close, mainAction} : ModalProps) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);
  const [phoneNumber, setNumber] = useState('');
  const [quote, setQuote] = useState(0);
  const [validated, setValidated] = useState(false);

  const clearState = () => {
    setName('');
    setSize(0);
    setNumber('');
  };

  const onHide = () => {
    clearState();
    close();
    setValidated(false);
  };

  /**
   *
   */
  function checkValid() {
    return (phoneNumber.length === 10);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(phoneNumber);
    console.log(phoneNumber.length);
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    }

    if (checkValid()) {
      const party : Party = new Party(name, size, phoneNumber, quote);

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
            <Form.Label>Party Name</Form.Label>
            <Form.Control
              placeholder='Michael Jordan'
              isValid={validated && name.length > 0}
              isInvalid={validated && name.length === 0}
              type='text'
              onChange={(e) => setName(e.target.value)}
              name='name'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please Enter a Name
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder='(555)555-5555'
              type='text'
              isValid={validated && phoneNumber.length === 10}
              isInvalid={validated && phoneNumber.length !== 10}
              onChange={(e) => setNumber(e.target.value)}
              name='phoneNumber'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please Enter a 10 digit Phone Number
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
        <Button type='submit'>Add Party</Button>
      </Modal.Footer>
    </Form>
  </Modal>);
};

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
          Are you sure you want to remove {party!.name} from the queue?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onDelete} variant='danger'>
          Remove {party!.name}
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
  clear: () => void;
  show: boolean;
  close: () => void;
}

export const ClearModal = ({clear, show, close} : ClearProps) => {
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
