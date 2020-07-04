import React, {useState} from 'react';
import {Queue, Party, Q_COLUMNS} from '../util/queue';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import {CaretUpFill, CaretDownFill, TrashFill} from 'react-bootstrap-icons';
import './queue-view.css';

interface CardProps {
  party: Party | undefined
}


const UserCard = ({party} : CardProps) => {
  const [message, setMessage] = useState('');

  return !party ? <div></div> : (
    <Card id="party-card">
      <h1>{party.name}</h1>
      <Card.Text>Phone Number: {party.phoneNumber}</Card.Text>
      <Card.Text>Estimated Wait Time: {party.quote} minutes</Card.Text>
      <Card.Text>Size: {party.size}</Card.Text>
      <div id='centered-container'>
        <Button style={{margin: '10px'}}>Send Ready Notification</Button>
        <Button style={{margin: '10px'}}>Send 5 Min. Notification</Button>
      </div>
      <Form.Group>
        <Form.Control
          as='textarea'
          placeholder='Type a Message'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          value={message}
          rows={3}
        />
        <Button style={{width: '100%'}}>Send Custom Message</Button>
      </Form.Group>
    </Card>
  );
};

UserCard.propTypes = {
  party: PropTypes.element,
};
interface ListProps {
  queue: Queue,
  showParty: (party: Party) => void,
  setQueue: (queue: Queue) => void,
  showAddModal: () => void,
  showDeleteModal: () => void
}

const QueueList = ({queue, showParty, setQueue, showAddModal, showDeleteModal} : ListProps) => {
  const moveOne = (index : number, offset: number) => {
    if (index + offset >= 0 && index + offset < queue.parties.length) {
      const list : Party[] = queue.parties.slice();

      const target = list[index + offset];

      list[index + offset] = list[index];
      list[index] = target;
      console.log(list);
      setQueue(new Queue(queue.name, queue.end, list));
    }
  };

  return (
    <Card id='queue-card'>
      <Card.Header>
        <Row>
          <Col md={1}>#</Col>
          <Col md={4}>Name</Col>
          <Col md={2}>Party Size</Col>
          <Col md={2}>Time in Line</Col>
          <Col md={3}>Actions</Col>
        </Row>
      </Card.Header>
      <ListGroup id='queue' variant="flush">
        {queue.parties.map((person: Party, idx: number) =>
          (<ListGroup.Item className="queue-entry" key={idx} onClick={() => showParty(person)}>
            <Row>
              <Col md={1}>{idx + 1}</Col>
              <Col md={4}>{person.name}</Col>
              <Col md={2}>{person.size}</Col>
              <Col md={2}>{person.quote}</Col>
              <Col md={3}>
                <Button
                  style={{margin: '3px'}}
                  onClick={() => moveOne(idx, -1)}
                >
                  <CaretUpFill />
                </Button>
                <Button
                  style={{margin: '3px'}}
                  onClick={() => moveOne(idx, 1)}
                >
                  <CaretDownFill />
                </Button>
                <Button
                  style={{margin: '3px'}}
                  onClick={showDeleteModal}
                >
                  <TrashFill />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>))}
      </ListGroup>
      <Button id="add-customer-button" onClick={showAddModal}>Add a Party</Button>
    </Card>
  );
};

interface ModalProps {
  show: boolean,
  mainAction: (p: Party) => void,
  party ?: Party,
  close: () => void,
}

const AddCustomerModal = ({show, close, mainAction} : ModalProps) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [phoneNumber, setNumber] = useState('');

  const clearState = () => {
    setName('');
    setSize('');
    setNumber('');
  };

  const onSubmit = () => {
    const party : Party = new Party(name, parseInt(size), phoneNumber, 50);

    mainAction(party);
    clearState();
  };

  const onHide = () => {
    clearState();
    close();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a Party</Modal.Title>
      </Modal.Header>
      <Form style={{margin: '2%'}}>
        <Row>
          <Col>
            <Form.Label>Party Name</Form.Label>
            <Form.Control
              placeholder='Michael Jordan'
              type='text'
              onChange={(e) => setName(e.target.value)}
              name='name'
              value={name}
            />
          </Col>
          <Col>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder='555-555-5555'
              type='text'
              onChange={(e) => setNumber(e.target.value)}
              name='phoneNumber'
              value={phoneNumber}
            />
          </Col>
        </Row>
        <Row style={{marginTop: '5px'}}>
          <Col>
            <Form.Label>Party Size</Form.Label>
            <Form.Control
              placeholder='23'
              type='number'
              onChange={(e) => setSize(e.target.value)}
              name='size'
              value={size}
            />
          </Col>
        </Row>
      </Form>
      <Modal.Footer>
        <Button onClick={onSubmit}>Add Party</Button>
      </Modal.Footer>
    </Modal>
  );
};

const DeleteCustomerModal = ({show, close, party, mainAction} : ModalProps) => {
  const onDelete = () => {
    mainAction(party!);
    close();
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header>
        <Modal.Title>
          Are you sure you want to remove {party!.name} from the queue?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onDelete}>Remove {party!.name}</Button>
      </Modal.Footer>
    </Modal>
  );
};

interface ViewProps {
  queue: Queue
}

export const QueueView = ({queue} : ViewProps) => {
  const [stateQ, setQ] = useState<Queue>(queue);
  const [party, setParty] = useState<Party | undefined>(queue.parties[0]);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const submit = (party: Party) => {
    const list: Party[] = stateQ.parties.slice();

    list.push(party);

    setQ(new Queue(stateQ.name, stateQ.end, list));
    setAddModal(false);
  };

  const removeParty = (party: Party) => {
    const list: Party[] = stateQ.parties.filter((val) => val !== party);

    setQ(new Queue(stateQ.name, stateQ.end, list));
  };

  return (
    <Container id='queue-party-container'>
      <AddCustomerModal
        show={addModal}
        close={() => setAddModal(false)}
        mainAction={(p : Party) => submit(p)}
      />
      <DeleteCustomerModal
        show={deleteModal}
        close={() => setDeleteModal(false)}
        mainAction={(p: Party) => removeParty(p)}
        party={party!}
      />
      <QueueList queue={stateQ}
        showParty={setParty}
        setQueue={setQ}
        showAddModal={() => setAddModal(true)}
        showDeleteModal={() => setDeleteModal(true)}
      />
      <UserCard party={party!}/>
    </Container>
  );
};
