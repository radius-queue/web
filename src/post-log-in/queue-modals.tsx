import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Party} from '../util/queue';

interface ModalProps {
  show: boolean,
  mainAction: (p: Party) => void,
  party ?: Party | undefined,
  close: () => void,
}

export const AddCustomerModal = ({show, close, mainAction} : ModalProps) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [phoneNumber, setNumber] = useState('');
  const [validated, setValidated] = useState(false);

  const clearState = () => {
    setName('');
    setSize('');
    setNumber('');
  };

  const onHide = () => {
    clearState();
    close();
    setValidated(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }
    const party : Party = new Party(name, parseInt(size), phoneNumber, 50);

    mainAction(party);
    onHide();
  };

  return (<Modal show={show} onHide={onHide}>
    <Modal.Header>
      <Modal.Title>Add a Party</Modal.Title>
    </Modal.Header>
    <Form
      style={{margin: '2%'}}
      onSubmit={onSubmit}
      validated={validated}
      noValidate
    >
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Party Name</Form.Label>
            <Form.Control
              placeholder='Michael Jordan'
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
              placeholder='555-555-5555'
              type='text'
              onChange={(e) => setNumber(e.target.value)}
              name='phoneNumber'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please Enter a Phone Number
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
              onChange={(e) => setSize(e.target.value)}
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
        <Button onClick={onDelete} variant='danger'>Remove {party!.name}</Button>
      </Modal.Footer>
    </Modal>
  );
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
}