import React, {useState} from 'react';
import {Queue, Party, Q_COLUMNS} from '../util/queue';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from '../logic/logic';
import {CaretUpFill, CaretDownFill} from 'react-bootstrap-icons';

interface CardProps {
  party: Party
}

export const UserCard = ({party} : CardProps) => {
  const [message, setMessage] = useForm({data: ''});

  return !party ? <div></div> :
    (<div id='queue-card'>
      <Card>
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
            name={'data'}
            onChange={setMessage}
            value={message.data}
            rows={3}
          />
          <Button style={{width: '100%'}}>Send Custom Message</Button>
        </Form.Group>
      </Card>
    </div>);
};

interface ListProps {
  queue: Queue,
  showParty: (party: Party) => void,
  setQueue: (queue: Queue) => void
}

export const QueueList = ({queue, showParty, setQueue} : ListProps) => {
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
    <Card body>
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
      (<Card key={person.name} body>
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
    <Card body>
      <Container>
        <Row id='centered-container'>
          <Button style={{marginLeft: '10px'}}>Add a Customer</Button>
        </Row>
      </Container>
    </Card>
  </div>);
};

interface ViewState {
  queue: Queue
  currentParty: Party | undefined
}

interface ViewProps {
  queue: Queue
}

export const QueueView = ({queue} : ViewProps) => {
  const [stateQ, setQ] = useState<Queue>(queue);
  const [party, setParty] = useState<Party | undefined>();

  return (
    <div id='queue-container'>
      <QueueList queue={stateQ} showParty={setParty} setQueue={setQ}/>
      <UserCard party={party!}/>
    </div>
  );
};
