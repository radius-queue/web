import React, {useState} from 'react';
import {Queue, Party, Q_COLUMNS} from '../util/queue';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {CaretUpFill, CaretDownFill} from 'react-bootstrap-icons';

interface CardProps {
  party: Party | undefined
}

const UserCard = ({party} : CardProps) => {
  const [message, setMessage] = useState('');

  return !party ? <div></div> :
    (<div id='queue-card'>
      <Card style={{margin: '5px'}} >
        <div style={{margin: '5px'}}>
          <h1>{party.name}</h1>
          <Card.Text>Phone Number: {party.phoneNumber}</Card.Text>
          <Card.Text>Estimated Wait Time: {party.quote} minutes</Card.Text>
          <Card.Text>Size: {party.size}</Card.Text>
          <div id='centered-container'>
            <Button style={{margin: '10px'}}>Send Ready Notification</Button>
            <Button style={{margin: '10px'}}>Send 5 Min. Notification</Button>
          </div>
        </div>
        <Form.Group style={{margin: '5px'}}>
          <Form.Control
            as='textarea'
            placeholder='Type a Message'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            value={message}
            rows={3}
            style={{marginBottom: '5px'}}
          />
          <Button style={{width: '100%'}}>Send Custom Message</Button>
        </Form.Group>
      </Card>
    </div>);
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

  return (<div id='queue-card'>
    <Card body style={{margin: '5px'}}>
      <Container>
        <Row>
          {Q_COLUMNS.map((val: string) => <Col key={val}>
            {val}
          </Col>)}
          <Col></Col>
        </Row>
      </Container>
    </Card>
    {queue.parties.map((person: Party, idx: number) =>
      (<Card key={person.name} body style={{margin: '5px'}}>
        <Container>
          <Row onClick={() => showParty(person)}>
            <Col>{idx + 1}</Col>
            <Col>{person.name}</Col>
            <Col>{person.size}</Col>
            <Col>{person.quote}</Col>
            <Col>
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
        </Container>
      </Card>))}
    <Card body style={{margin: '5px'}}>
      <Container>
        <Row id='centered-container'>
          <Button
            style={{marginLeft: '10px'}}
            onClick={showModal}
          >
            Add a Party
          </Button>
        </Row>
      </Container>
    </Card>
  </div>);
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
    <div id='queue-container'>
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
    </div>
  );
};
