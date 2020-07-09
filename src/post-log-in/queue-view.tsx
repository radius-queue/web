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
import {CaretUpFill, CaretDownFill, TrashFill} from 'react-bootstrap-icons';
import {AddCustomerModal, DeleteCustomerModal} from './queue-modals';
import './queue-view.css';

interface CardProps {
  party: Party | undefined
}


const UserCard = ({party} : CardProps) => {
  const [message, setMessage] = useState('');

  return !party ? <div></div> : (
    <Card id='party-card'>
      <Card.Body>
        <Card.Title as='h1'>{party.name}</Card.Title>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)}
            value={message}
            rows={3}
          />
          <Button style={{width: '100%'}}>Send Custom Message</Button>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

UserCard.propTypes = {
  party: PropTypes.element,
};
interface ListProps {
  queue: Queue,
  currentParty: Party | undefined,
  showParty: (party: Party) => void,
  setQueue: (queue: Queue) => void,
  showAddModal: () => void,
  showDeleteModal: () => void
}

const QueueList = ({queue, currentParty, showParty, setQueue, showAddModal,
  showDeleteModal} : ListProps) => {
  const moveOne = (index : number, offset: number) => {
    if (index + offset >= 0 && index + offset < queue.parties.length) {
      const list : Party[] = queue.parties.slice();

      const target = list[index + offset];

      list[index + offset] = list[index];
      list[index] = target;

      setQueue(new Queue(queue.name, queue.end, queue.uid, list));
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
          (<ListGroup.Item
            className="queue-entry"
            key={idx}
            onClick={() => showParty(person)}
            active={person === currentParty}
            action
          >
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
      <Button
        id="add-customer-button"
        onClick={showAddModal}
      >
        Add a Party
      </Button>
    </Card>
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

    setQ(new Queue(stateQ.name, stateQ.end, stateQ.uid, list));
  };

  const removeParty = (party: Party) => {
    const list: Party[] = stateQ.parties.filter((val) => val !== party);

    setQ(new Queue(stateQ.name, stateQ.end, stateQ.uid, list));
    setParty(list[0]);
  };

  return (
    <Container>
      <Card id='control-group-card'>
        <Card.Body id='control-group-container'>
          <div id='control-button-group'>
            <Button id='control-button'>Open Queue</Button>
            <Button id='control-button'>Close Queue</Button>
          </div>
          <Form.Group style={{textAlign: 'center'}}>
            <Form.Control
              as='textarea'
              placeholder='Type a Message'
              rows={3}
              id='messanger'
            />
            <Button id='control-message-button'>Send Message to All</Button>
          </Form.Group>
        </Card.Body>
      </Card>
      <QueueList queue={stateQ}
        showParty={setParty}
        setQueue={setQ}
        showAddModal={() => setAddModal(true)}
        showDeleteModal={() => setDeleteModal(true)}
        currentParty={party}
      />
      <UserCard party={party!}/>
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
    </Container>
  );
};
