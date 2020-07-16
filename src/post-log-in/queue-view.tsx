import React, {useState, useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
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
import {AddCustomerModal, DeleteCustomerModal, ClearModal} from './queue-modals';
import postQueue from '../util/post-queue';
import './queue-view.css';
import {QueueListener} from '../util/queue-listener';

/**
 * Calculates the time difference in minutes betweeen two Date objects.
 * @param {Date} t1 The most current time.
 * @param {Date} t2 The oldest time.
 * @return {boolean} the time difference in minutes
 */
const timeDiffInMinutes = (t1: Date, t2: Date) => {
  const result : number = Math.round((t1.getTime() - t2.getTime()) / 60000);
  return result === -1 ? 0 : result;
};

interface CardProps {
  party: Party | undefined,
  time: Date,
}

/**
 * A Card filled with the info of the given user.
 * @param {CardProps} CardProps The user's info to be displayed.
 * @return {jsx} A React Bootstrap Card filled with user info.
 */
const UserCard = ({party, time} : CardProps) => {
  const [message, setMessage] = useState('');

  return (
    <Card id='party-card'>
      {!party ? (
        <img
          id='no-party-selected-logo'
          src='../../images/radius-logo.PNG'
          alt='Radius Logo'
        />
      ) : (
        <Card.Body>
          <Card.Title as='h1'>{party.name}</Card.Title>
          <Card.Text>
            Phone Number: {party.phoneNumber}
          </Card.Text>
          <Card.Text>
            Estimated Wait Time: {party.quote} minutes
          </Card.Text>
          <Card.Text>
            Time in Line: {timeDiffInMinutes(time, party.checkIn)} minutes
          </Card.Text>
          <Card.Text>
            Size: {party.size}
          </Card.Text>
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
      )}
    </Card>
  );
};

UserCard.propTypes = {
  party: PropTypes.element,
};

interface ListProps {
  queue: Queue,
  currentPartyInfo: [Party, number] | undefined,
  showParty: (party: [Party, number]) => void,
  setQueue: (queue: Queue) => void,
  showAddModal: () => void,
  showDeleteModal: () => void,
  time: Date,
}

/**
 * A Card displaying the given queue with add/remove/swap functionality.
 * @param {ListProps} ListProps The properties of the queue to be displayed.
 * @return {jsx} A React Bootstrap Card filled with the given queue info
 * and functionality.
 */
const QueueList = ({queue, currentPartyInfo, time, showParty, setQueue,
  showAddModal, showDeleteModal} : ListProps) => {
  const moveOne = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index : number, offset: number) => {
    e.stopPropagation();
    if (index + offset >= 0 && index + offset < queue.parties.length) {
      const list : Party[] = queue.parties.slice();

      const target = list[index + offset];

      list[index + offset] = list[index];
      list[index] = target;

      const newQ : Queue = new Queue(queue.name, queue.end, queue.uid, queue.open, list);
      if (currentPartyInfo) {
        showParty([currentPartyInfo[0], currentPartyInfo[1] + offset]);
      }
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
          <Col md={4}>Actions</Col>
        </Row>
      </Card.Header>
      <ListGroup id='queue' variant="flush">
        {queue.parties.map((person: Party, idx: number) =>
          (<ListGroup.Item
            className={
              (currentPartyInfo && currentPartyInfo[1] === idx) ?
                              ('queue-entry highlighted') : ('queue-entry')
            }
            key={idx}
            onClick={() => showParty([person, idx])}
          >
            <Row>
              <Col md={1}>
                {idx + 1}
              </Col>
              <Col md={3}>
                {person.name}
              </Col>
              <Col md={2}>
                {person.size}
              </Col>
              <Col md={2}>
                {timeDiffInMinutes(time, person.checkIn)} minutes
              </Col>
              <Col md={4}>
                <Button
                  style={{margin: '3px'}}
                  onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => moveOne(e, idx, -1)}
                >
                  <CaretUpFill />
                </Button>
                <Button
                  style={{margin: '3px'}}
                  onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => moveOne(e, idx, 1)}
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
 * @param {function(Queue)} setQueue the function that
 * sets the top level queue
 */
const openQueue = (queue: Queue, setQueue: (q: Queue) => void) => {
  const newQ : Queue =
    new Queue(queue.name, queue.end, queue.uid, true, queue.parties);
  setQueue(newQ);
  postQueue(newQ);
};

/**
 * Sets the 'open' field of the given queue to false.
 * @param {Queue} queue The queue to be opened.
 * @param {function(Queue)} setQueue
 */
const closeQueue = (queue: Queue, setQueue: (q: Queue) => void) => {
  const newQ : Queue =
    new Queue(queue.name, queue.end, queue.uid, false, queue.parties);
  setQueue(newQ);
  postQueue(newQ);
};

/**
 * A Card displaying the queue controls: Open/Close/Clear queue and
 * send message to all in queue.
 * TODO: implement send message to all in queue.
 * @param {QueueControlsProps} QueueControlsProps The current queue on
 * the page and access to functions to set it and clear it.
 * @return {jsx} A React Bootstrap Card filled with the controls for the
 * displayed queue.
 */
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
  setQueue: (q: Queue) => void, // updates the parent state with the passed in Q
}

interface ViewProps {
  queue: Queue,
  setQueue: (q :Queue) => void,
}

/**
 * The container for all queue Cards and Modals.
 * @param {ViewProps} ViewProps The given queue with access to editing.
 * @return {jsx} A React Boostrap container containing every Card and Modal
 * on the queue-view page.
 */
export const QueueView = ({queue, setQueue} : ViewProps) => {
  const [stateQ, setQ] = useState<Queue>(queue);
  const [party, setParty] = useState<[Party, number] | undefined>(undefined);
  const [time, setTime] = useState<Date>(new Date());
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [clearModal, setClearModal] = useState<boolean>(false);

  useEffect(()=> {
    const listener = new QueueListener(stateQ.uid, (newQ: Queue) => {
      setQ(newQ);
      const contains = (party: Party) => {
        for (const p of newQ.parties) {
          if (p.phoneNumber === party.phoneNumber) {
            return true;
          }
        }
        return false;
      };
      if (party && !contains(party[0])) {
        setParty(undefined);
      }
    });

    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => {
      if (listener) {
        listener!.free();
      }
      setQueue(stateQ);
      clearInterval(interval);
    };
  }, [stateQ, party, queue, setQueue]);

  /**
   * Adds the given party at the bottom of the current queue.
   * @param {Party} party The party to be added to the queue.
   */
  const addParty = (party: Party) => {
    const list: Party[] = stateQ!.parties.slice();
    list.push(party);
    const newQueue : Queue =
      new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, list);
    setQ(newQueue);
    postQueue(newQueue);
  };

  /**
   * Removes the given party from the current queue.
   * @param {Party} party The party to be removed from the queue.
   */
  const removeParty = (party: Party) => {
    const list: Party[] = stateQ.parties.filter((val) => val !== party);
    const newQ: Queue =
      new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, list);
    setQ(newQ);
    setParty(undefined);
    postQueue(newQ);
  };

  /**
   * Clears all parties from the current queue.
   */
  const clearQueue = () => {
    const newQ: Queue =
      new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, []);
    setQ(newQ);
    setParty(undefined);
    postQueue(newQ);
  };

  return (
    <Container>
      <QueueControls
        queue={stateQ}
        clear={() => setClearModal(true)}
        setQueue={(q: Queue) => setQ(q)}
      />
      <QueueList queue={stateQ}
        showParty={setParty}
        setQueue={setQ}
        showAddModal={() => setAddModal(true)}
        showDeleteModal={() => setDeleteModal(true)}
        currentPartyInfo={party}
        time={time}
      />
      <UserCard party={party ? party[0] : party} time={time}/>
      <AddCustomerModal
        show={addModal}
        close={() => setAddModal(false)}
        mainAction={(p : Party) => addParty(p)}
      />
      <DeleteCustomerModal
        show={deleteModal}
        close={() => setDeleteModal(false)}
        mainAction={(p: Party) => removeParty(p)}
        party={party ? party[0] : party}
      />
      <ClearModal
        show={clearModal}
        close={() => setClearModal(false)}
        clear={clearQueue}
      />
    </Container>
  );
};

interface URLParamProps {
  queue: Queue,
  phoneNum: string,
  time: Date,
}
export const QueueURLParamViewer = ({queue, phoneNum, time} : URLParamProps)=> {
  return (
    <Card id='queue-card'>
      <Card.Header>
        <Row>
          <Col md={1}>#</Col>
          <Col md={5}>Name</Col>
          <Col md={3}>Party Size</Col>
          <Col md={3}>Time in Line</Col>
        </Row>
      </Card.Header>
      <ListGroup id='queue' variant="flush">
        {queue.parties.map((person: Party, idx: number) =>
          (<ListGroup.Item
            className="queue-entry"
            key={idx}
            active={person.phoneNumber === phoneNum}
          >
            <Row>
              <Col md={1}>
                {idx + 1}
              </Col>
              <Col md={5}>
                {person.name}
              </Col>
              <Col md={3}>
                {person.size}
              </Col>
              <Col md={3}>
                {timeDiffInMinutes(time, person.checkIn)} minutes
              </Col>
            </Row>
          </ListGroup.Item>))}
      </ListGroup>
    </Card>
  );
};
