import React, {useState} from 'react';
import {Queue, Party, Q_COLUMNS} from '../util/queue';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import {useForm} from '../logic/logic';
import Modal from 'react-bootstrap/Modal';
import {CaretUpFill, CaretDownFill} from 'react-bootstrap-icons';
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

interface ListProps {
  queue: Queue,
  showParty: (party: Party) => void,
  setQueue: (queue: Queue) => void,
  showModal: () => void
}

const QueueList = ({queue, showParty, setQueue, showModal} : ListProps) => {
  const moveOne = (index : number, offset: number) => {
    if (index + offset >= 0 && index + offset < queue.parties.length) {
      const list : Party[] = queue.parties.slice();

      const target = list[index + offset];

      list[index + offset] = list[index];
      list[index] = target;

      setQueue(new Queue(queue.name, queue.end, list));
    }
  };

  return (
    <Card id='queue-card'>
      <ListGroup id='queue' variant="flush">
        <ListGroup.Item>
          {/* {Q_COLUMNS.map((val: string) => <Col key={val} md={2}>
            {val}
          </Col>)} */}
          <Row>
            <Col md={1}>#</Col>
            <Col md={4}>Name</Col>
            <Col md={2}>Party Size</Col>
            <Col md={2}>Time in Line</Col>
            <Col md={3}>Actions</Col>
          </Row>
        </ListGroup.Item>
        {queue.parties.map((person: Party, idx: number) =>
          (<ListGroup.Item className="queue-entry" key={person.name} onClick={() => showParty(person)}>
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
              </Col>
            </Row>
          </ListGroup.Item>))}
      </ListGroup>
      <Button id="add-customer-button" onClick={showModal}>Add a Party</Button>
    </Card>
  );
};

interface ModalProps {
  show: boolean,
  add: (p: Party) => void,
  close: () => void,
}

const AddCustomerModal = ({show, close, add} : ModalProps) => {
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

    add(party);
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


interface ViewProps {
  queue: Queue
}

export const QueueView = ({queue} : ViewProps) => {
  const [stateQ, setQ] = useState<Queue>(queue);
  const [party, setParty] = useState<Party | undefined>(queue.parties[0]);
  const [modal, setModal] = useState<boolean>(false);

  const submit = (party: Party) => {
    const list: Party[] = stateQ.parties.slice();

    list.push(party);

    setQ(new Queue(stateQ.name, stateQ.end, list));
    setModal(false);
  };

  return (
    <Container id='queue-party-container'>
      <AddCustomerModal
        show={modal}
        close={() => setModal(false)}
        add={(p : Party) => submit(p)}
      />
      <QueueList queue={stateQ}
        showParty={setParty}
        setQueue={setQ}
        showModal={() => setModal(true)}
      />
      <UserCard party={party!}/>
    </Container>
  );
};
