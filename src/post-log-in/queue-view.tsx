import React, {useState} from 'react';
import {Queue, Party, Q_COLUMNS} from '../util/queue';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {CaretUpFill, CaretDownFill} from 'react-bootstrap-icons';

interface ListProps {
    queue: Queue
}

export const QueueList = ({queue} : ListProps) => {
  const [partyList, setPartyList] = useState(queue.parties);

  const moveOne = (index : number, offset: number) => {
    if (index + offset >= 0 && index + offset < partyList.length) {
      const list = partyList.slice();
      console.log(list);
      const target = list[index + offset];

      list[index + offset] = list[index];
      list[index] = target;
      console.log(list);
      setPartyList(list);
    }
  };

  return (<div>
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
    {partyList.map((person: Party, idx: number) =>
      (<Card key={person.name} body>
        <Container>
          <Row>
            <Col>{idx + 1}</Col>
            <Col>{person.name}</Col>
            <Col>{person.size}</Col>
            <Col>{person.quote}</Col>
            <Col>
              <Button style={{margin: '3px'}} onClick={() => moveOne(idx, -1)}><CaretUpFill /></Button>
              <Button style={{margin: '3px'}} onClick={() => moveOne(idx, 1)}><CaretDownFill /></Button>
            </Col>
          </Row>
        </Container>
      </Card>))}
  </div>);
};
