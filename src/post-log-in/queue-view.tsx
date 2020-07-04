import React, {useState} from 'react';
import {Queue, Party} from '../util/queue';
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
  const [invalid, setInvalid] = useState(false);

  const setSizeField = (val: string) => {
    if (val.length === 0 || val[val.length-1] !== 'e') {
      setSize(val);
    }
  };

  const clearState = () => {
    setName('');
    setSize('');
    setNumber('');
  };

  const onHide = () => {
    clearState();
    close();
    setInvalid(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setInvalid(true);
      return;
    }
    const party : Party = new Party(name, parseInt(size), phoneNumber, 50);

    mainAction(party);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a Party</Modal.Title>
      </Modal.Header>
      <Form style={{margin: '2%'}} onSubmit={onSubmit} validated={invalid} noValidate>
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
              <Form.Control.Feedback type='invalid'>Please Enter a Name</Form.Control.Feedback>
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
              <Form.Control.Feedback type='invalid'>Please Enter a Phone Number</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row style={{marginTop: '5px'}}>
          <Col>
            <Form.Group>
              <Form.Label>Party Size</Form.Label>
              <Form.Control
                placeholder='23'
                type='number'
                onChange={(e) => setSizeField(e.target.value)}
                name='size'
                max={100}
                required
              />
              <Form.Control.Feedback type='invalid'>Please Enter a Valid Group Size</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Modal.Footer>
          <Button type='submit'>Add Party</Button>
        </Modal.Footer>
      </Form>
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
  };

  const removeParty = (party: Party) => {
    const list: Party[] = stateQ.parties.filter((val) => val !== party);

    setQ(new Queue(stateQ.name, stateQ.end, list));
    setParty(list[0]);
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
