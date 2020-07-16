import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Party} from '../../util/queue';
import {timeDiffInMinutes} from '../../logic/logic';

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

export default UserCard;