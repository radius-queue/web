import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {DAYS} from '../../util/business';

interface HoursProps {
  values: [string, string][],
  setValues: (vals: [string, string][]) => void,
  openState: boolean[],
  setOpenState: (state: boolean[]) => void,
  submitted: boolean,
  editable: boolean,
}
const ProfileHours = ({values, setValues, openState, setOpenState, submitted, editable} : HoursProps) => {

  const handleSwitchChange = (idx: number) => {
    openState[idx] = !openState[idx];
    setOpenState([...openState]);
    values[idx] = ['', ''];
    setValues([...values]);
  };

  const handleTimeChange = (e: React.ChangeEvent<any>, openClose: number, idx: number) => {
    values[idx][openClose] = e.target.value;
    setValues([...values]);
  };

  return (
    <Form.Group>
      <Form.Label>Business Hours</Form.Label>
      {DAYS.map((val:string, idx: number) => (
        <Form.Row key={val}>
          <Col>
            <Form.Check
              type="switch"
              label={`${val}`}
              id={`${val} switch`}
              checked={openState[idx]}
              onChange={() => handleSwitchChange(idx)}
              isInvalid={submitted && openState[idx] && values[idx][0].length === 0 && values[idx][1].length === 0}
              disabled={!editable}
            />
          </Col>
          <Col>
            <Form.Control
              type='time'
              disabled={!openState[idx] || !editable}
              value={values[idx][0]}
              onChange={(e) => handleTimeChange(e, 0, idx)}
            />
          </Col>
          <Col>
            <Form.Control
              type='time'
              disabled={!openState[idx] || !editable}
              value={values[idx][1]}
              onChange={(e) => handleTimeChange(e, 1, idx)}
            />
          </Col>
        </Form.Row>
      ))}
    </Form.Group>
  );
};

export default ProfileHours;

