import React, {useState, useEffect} from 'react';
import {Queue, Party} from '../util/queue';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import {CaretUpFill, CaretDownFill, TrashFill} from 'react-bootstrap-icons';
import {AddCustomerModal, DeleteCustomerModal} from './queue-modals';
import postQueue from '../util/post-queue';
import './queue-view.css';
import {QueueListener} from '../util/queue-listener';

const timeDiffInMinutes = (t1: Date, t2: Date) => {
  return Math.round((t1.getTime() - t2.getTime()) / 60000);
}

interface CardProps {
  party: Party | undefined,
  time: Date,
}

const UserCard = ({party, time} : CardProps) => {
  const [message, setMessage] = useState('');

  return (
    <Card id='party-card'>
      {!party ? <img style={{width: '100%', height: 'auto'}} src='../images/radius-logo.PNG' alt='Radius Logo'></img> :
      <Card.Body>
        <Card.Title as='h1'>{party.name}</Card.Title>
        <Card.Text>Phone Number: {party.phoneNumber}</Card.Text>
        <Card.Text>Estimated Wait Time: {party.quote} minutes</Card.Text>
        <Card.Text>Time in Line: {timeDiffInMinutes(time, party.checkIn)} minutes</Card.Text>
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
      </Card.Body>}
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
  showDeleteModal: () => void,
  time: Date,
}

const QueueList = ({queue, currentParty, time, showParty, setQueue,
  showAddModal, showDeleteModal} : ListProps) => {
  const moveOne = (index : number, offset: number) => {
    if (index + offset >= 0 && index + offset < queue.parties.length) {
      const list : Party[] = queue.parties.slice();

      const target = list[index + offset];

      list[index + offset] = list[index];
      list[index] = target;

      const newQ : Queue = new Queue(queue.name, queue.end, queue.uid, queue.open, list);
      setQueue(newQ);
      postQueue(newQ);
    }
  };

  return (
    <Card id='queue-card'>
      <Card.Header>
        <Row>
          <Col md={1}>#</Col>
          <Col md={3}>Name</Col>
          <Col md={2}>Party Size</Col>
          <Col md={2}>Time in Line</Col>
          <Col md={3}>Actions</Col>
        </Row>
      </Card.Header>
      <ListGroup id='queue' variant="flush">
        {queue.parties.map((person: Party, idx: number) =>
          (<ListGroup.Item
            className={(currentParty && currentParty.phoneNumber === person.phoneNumber) ?
              'queue-entry highlighted' :
              'queue-entry'}
            key={person.phoneNumber}
            onClick={() => showParty(person)}
          >
            <Row>
              <Col md={1}>{idx + 1}</Col>
              <Col md={3}>{person.name}</Col>
              <Col md={2}>{person.size}</Col>
              <Col md={2}>{timeDiffInMinutes(time, person.checkIn)} minutes</Col>
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

/**
 * Sets the 'open' field of the given queue to true.
 * @param {Queue} queue The queue to be opened.
 * @param {(Queue)} callBack the function that
 * sets the top level queue
 */
const openQueue = (queue: Queue, setQueue: (q: Queue) => void) => {
  const newQ : Queue = new Queue(queue.name, queue.end, queue.uid, true, queue.parties);
  console.log(queue.parties);
  setQueue(newQ);
  postQueue(newQ);
};

/**
 * Sets the 'open' field of the given queue to false.
 * @param {Queue} queue The queue to be opened.
 */
const closeQueue = (queue: Queue, setQueue: (q: Queue) => void) => {
  const newQ : Queue = new Queue(queue.name, queue.end, queue.uid, false, queue.parties);
  console.log(queue.parties);
  setQueue(newQ);
  postQueue(newQ);
};

const QueueControls = ({queue, setQueue, clear}: QueueControlsProps) => {
  const selectedOpenClosed: string = queue.open ? 'open' : 'closed';
  return (
    <Card id='control-group-card'>
      <Card.Body >
        <div id='control-button-group'>
          <ToggleButtonGroup
            name='open-close'
            type='radio'
            defaultValue={selectedOpenClosed}
            id = 'open-close-buttons'
          >
            <ToggleButton
              value='open'
              onChange={() => openQueue(queue, setQueue)}
            >
              Open Queue
            </ToggleButton>
            <ToggleButton
              value='closed'
              onChange={() => closeQueue(queue, setQueue)}
            >
              Close Queue
            </ToggleButton>
          </ToggleButtonGroup>

          <Button id='clear-button' variant='danger' onClick={() => clear()}>
            Clear Queue
          </Button>
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
  );
};

interface QueueControlsProps {
  queue: Queue,
  clear: () => void, // clears the queue
  setQueue: (q: Queue) => void, //updates the parent state with the passed in Q
}

interface ViewProps {
  queue: Queue,
  setQueue: (q :Queue) => void,
}

export const QueueView = ({queue, setQueue} : ViewProps) => {
  const [stateQ, setQ] = useState<Queue>(queue);
  const [party, setParty] = useState<Party | undefined>(undefined);
  const [time, setTime] = useState<Date>(new Date());
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [listener, setListener] = useState<QueueListener | undefined>(undefined);

  useEffect(()=> {
    setListener(new QueueListener(queue.uid, (newQ: Queue) => {
      setQ(newQ);

      const contains = (party: Party) => {
        for (const p of newQ.parties) {
          if (p.phoneNumber === party.phoneNumber) {
            return true;
          }
        }
        return false;
      };

      if (party && !contains(party)) {
        setParty(undefined);
      }
    }));
    const interval = setInterval(() => setTime(new Date()), 60000);

    return () => {
      if (listener) {
        listener!.free();
      }
      setQueue(stateQ);
      clearInterval(interval);
    };
  }, []);

  const addParty = (party: Party) => {
    const list: Party[] = stateQ!.parties.slice();

    list.push(party);
    const newQueue : Queue = new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, list);
    setQ(newQueue);
    postQueue(newQueue);
  };

  const removeParty = (party: Party) => {
    const list: Party[] = stateQ.parties.filter((val) => val !== party);

    const newQ: Queue = new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, list);
    setQ(newQ);
    setParty(list[0]);
    postQueue(newQ);
  };

  const clearQueue = () => {
    const newQ: Queue = new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, []);
    setQ(newQ);
    setParty(undefined);
    postQueue(newQ);
  };

  return (
    <Container>
      <QueueControls
        queue={stateQ}
        clear={clearQueue}
        setQueue={(q: Queue) => setQ(q)}
      />
      <QueueList queue={stateQ}
        showParty={setParty}
        setQueue={setQ}
        showAddModal={() => setAddModal(true)}
        showDeleteModal={() => setDeleteModal(true)}
        currentParty={party}
        time={time}
      />
      <UserCard party={party} time={time}/>
      <AddCustomerModal
        show={addModal}
        close={() => setAddModal(false)}
        mainAction={(p : Party) => addParty(p)}
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

interface URLParamProps {
  queue: Queue,
  party: Party | undefined,
}
export const QueueURLParamViewer = ({queue, party} : URLParamProps) => {
  return (
    <Card id='queue-card'>
      <Card.Header>
        <Row>
          <Col md={1}>#</Col>
          <Col md={4}>Name</Col>
          <Col md={2}>Party Size</Col>
          <Col md={2}>Time in Line</Col>
        </Row>
      </Card.Header>
      <ListGroup id='queue' variant="flush">
        {queue.parties.map((person: Party, idx: number) =>
          (<ListGroup.Item
            className="queue-entry"
            key={idx}
            active={person === party}
          >
            <Row>
              <Col md={1}>{idx + 1}</Col>
              <Col md={4}>{person.name}</Col>
              <Col md={2}>{person.size}</Col>
              <Col md={2}>{person.quote}</Col>
            </Row>
          </ListGroup.Item>))}
      </ListGroup>
    </Card>
  );
};
