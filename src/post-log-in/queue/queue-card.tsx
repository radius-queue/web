import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Party} from '../../util/queue';
import {timeDiffInMinutes} from '../../logic/logic';
import {parsePhoneNum} from '../../util/util-functions';

interface CardProps {
  party: Party | undefined, // the current party to be displayed
  time: Date, // the most recent time stamp to show elapsed time
  sendMessage: (s: string) => void, // sends a message to the user
}

const FIVE_MIN_MESSAGE = 'We are able to serve you in 5 minutes.';
const READY_MESSAGE = 'We can now serve you. Please come to the front desk.';

/**
 * A Card filled with the info of the given user.
 * @param {CardProps} CardProps The user's info to be displayed.
 * @return {jsx} A React Bootstrap Card filled with user info.
 */
const UserCard = ({party, sendMessage, time} : CardProps) => {
  const [message, setMessage] = useState<string>('');

  const sendPM = () => {
    sendMessage(message);
    setMessage('');
  };

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
          <Card.Title as='h1'>
            {party.firstName + ' ' + party.lastName}
          </Card.Title>
          <Card.Text>
            Phone Number: {parsePhoneNum(party.phoneNumber)}
          </Card.Text>
          <Card.Text>
            Estimated Wait Time: {party.quote !== -1 ?
              `${party.quote} minutes` :
              'N/A (registered on app)'}
          </Card.Text>
          <Card.Text>
            Time in Line: {timeDiffInMinutes(time, party.checkIn)} minutes
          </Card.Text>
          <Card.Text>
            Size: {party.size}
          </Card.Text>
          <div id='centered-container'>
            <Button
              style={{margin: '10px'}}
              onClick={() => sendMessage(READY_MESSAGE)}
            >
              Send Ready Notification
            </Button>
            <Button
              style={{margin: '10px'}}
              onClick={() => sendMessage(FIVE_MIN_MESSAGE)}
            >
              Send 5 Min. Notification
            </Button>
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
            <Button
              style={{width: '100%'}}
              onClick={sendPM}
            >
              Send Custom Message
            </Button>
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
