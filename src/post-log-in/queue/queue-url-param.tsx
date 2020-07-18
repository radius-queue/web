import React from 'react';
import {Queue, Party} from '../../util/queue';
import {timeDiffInMinutes} from '../../logic/logic';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';


interface URLParamProps {
  queue: Queue,
  phoneNum: string,
  time: Date,
}
const QueueURLParamViewer = ({queue, phoneNum, time} : URLParamProps)=> {
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
                {person.firstName}
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

QueueURLParamViewer.propTypes = {
  time: PropTypes.element,
  phoneNum: PropTypes.element,
  queue: PropTypes.element,
};

export default QueueURLParamViewer;