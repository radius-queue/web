import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {DAYS} from '../../util/business';

interface HoursProps {
  values: [string, string][], // input element values
  setValues: (vals: [string, string][]) => void, // parent setter for values
  openState: boolean[], // elements indicate which day of the weeks are open
  setOpenState: (state: boolean[]) => void, // sets parent open states
  submitted: boolean, // whether the form has been submitted
  editable: boolean, // whether the form is editable or not
}
/**
 * The display for the business hours for the profile
 * form.
 *
 * @param {HoursProps} props props passed into component
 * @return {jsx} the HTML display for the hours portion of
 * the proile page.
 */
const ProfileHours = ({values, setValues, openState, setOpenState,
  submitted, editable} : HoursProps) => {
  /**
   * Handles the change from a business day going from open to closed
   * and vice versa. This will set the parent component's state
   * for which days are open. Also will clear the values of the day
   * if the day is changed to closed.
   *
   * @param {number} idx index or "day" of the week in which the switch
   * is changed. Sunday is 0 and Saturday is 6.
   */
  const handleSwitchChange = (idx: number) => {
    openState[idx] = !openState[idx];
    setOpenState([...openState]);
    if (!openState[idx]) { // if originally true (now false) we will
      values[idx] = ['', '']; // clear the hour values
      setValues([...values]);
    }
  };

  /**
   * Change handler for when a valid time has been inputted
   * into a business hour element. This sets the parent
   * component state based on the event.
   *
   * @param {React.ChangeEvent<any>} e onChange event
   * @param {number} openClose whether the input is an opening hour
   * or closing hour element. Value is 0 for opening, and 1
   * for closing.
   * @param {number} idx index in the values array of the "day"
   * whose times were change.
   */
  const handleTimeChange = (e: React.ChangeEvent<any>,
      openClose: number, idx: number) => {
    values[idx][openClose] = e.target.value;
    setValues([...values]);
  };

  return (
    <Form.Group>
      <Form.Label>Business Hours</Form.Label>
      {DAYS.map((val:string, idx: number) => (
        <Form.Row key={val} id='business-hour'>
          <Col>
            <Form.Check
              type="switch"
              label={`${val}`}
              id={`${val} switch`}
              checked={openState[idx]}
              onChange={() => handleSwitchChange(idx)}
              isInvalid={submitted && openState[idx] &&
                values[idx][0].length === 0 &&
                values[idx][1].length === 0}
              disabled={!editable}
            />
          </Col>
          <Col>
            <Form.Control
              type='time'
              disabled={!openState[idx] || !editable}
              value={values[idx][0]}
              onChange={(e) => handleTimeChange(e, 0, idx)}
              isInvalid={submitted && openState[idx] &&
                values[idx][0].length === 0 &&
                values[idx][1].length === 0}
            />
            <Form.Control.Feedback type='invalid'>
              Open days must have hours specified.
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control
              type='time'
              disabled={!openState[idx] || !editable}
              value={values[idx][1]}
              onChange={(e) => handleTimeChange(e, 1, idx)}
              isInvalid={submitted && openState[idx] &&
                values[idx][0].length === 0 &&
                values[idx][1].length === 0}
            />
          </Col>
        </Form.Row>
      ))}
    </Form.Group>
  );
};

export default ProfileHours;

