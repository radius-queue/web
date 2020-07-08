import React, {useState} from 'react';
import {useForm} from '../logic/logic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './profile.css';
import Col from 'react-bootstrap/Col';
import './../firebase.ts';
import firebase from 'firebase/app';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';

interface ValidityState {
  submitted: boolean;
  email: [boolean, string];
  password: [boolean, string];
}

const initialState : ValidityState = {
  submitted: false,
  email: [true, ''],
  password: [true, ''],
};

const ProfilePage = () => {
  const [formValues, setFormValues] = useForm({businessName: '', ownerName: '',
    address: '', city: '', state: '', zip: '',
    hoursOpen: '', openAP: '', hoursClose: '', closeAP: '', phone: ''});

  const [validity, setValidity] = useState(initialState);

  const allFieldsCompleted : () => boolean = () => {
    let result : boolean = true;
    for (const field of Object.keys(formValues)) {
      result = result && formValues[field].length > 0;
    }
    return result;
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidity(initialState);
    const validityObject : any = {
      submitted: true,
    };

    const fieldsFilled : boolean = allFieldsCompleted();
    let shouldSetValidity : boolean = true;
    if (!!validityObject.password[0] && fieldsFilled) {
      const createResult = await firebase.auth()
          .createUserWithEmailAndPassword(formValues.email, formValues.password)
          .catch(function(error) {
            const result : [boolean, string] = [false, error.message];
            setValidity({
              ...validityObject,
              email: result,
            });
            return false;
          });
      if (typeof createResult === 'boolean') {
        shouldSetValidity = false;
      }
    }
    if (shouldSetValidity) {
      setValidity(validityObject);
    }
  };

  return (
    <div id="profile-container">
      <Card border="dark" style={{width: '18rem'}} id="profile-card">
        <Card.Title className="form-header-profile">
        Fill out your business info to get started!</Card.Title>

        <Card.Body>
          <Form noValidate onSubmit={submitForm}>
            <Form.Row>
              <Col>
                <Form.Group controlId="businessName">
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="businessName"
                    value={formValues.businessName}
                    placeholder="Enter name of business here"
                    onChange={setFormValues}
                    isValid={validity.submitted &&
                      formValues.businessName.length > 0}
                    isInvalid={validity.submitted &&
                      formValues.businessName.length === 0}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please Enter a Business Name
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="ownerName">
                  <Form.Label>Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    value={formValues.ownerName}
                    placeholder="Enter name of owner here"
                    onChange={setFormValues}
                    isValid={validity.submitted &&
                      formValues.ownerName.length > 0}
                    isInvalid={validity.submitted &&
                      formValues.ownerName.length === 0}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please Enter an Owner Name
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formValues.address}
                placeholder="555 Example Dr."
                onChange={setFormValues}
                isInvalid={validity.submitted &&
                  formValues.address.length === 0}
                isValid={validity.submitted &&
                  formValues.address.length > 0}
              />
              <Form.Control.Feedback type='invalid'>
                Please Enter a Location Address
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
              <Col>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formValues.city}
                    placeholder="Seattle"
                    onChange={setFormValues}
                    isInvalid={validity.submitted &&
                  formValues.city.length === 0}
                    isValid={validity.submitted &&
                  formValues.city.length > 0}
                  />
                  <Form.Control.Feedback type='invalid'>
                Please Enter a City
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formValues.state}
                    placeholder="WA"
                    onChange={setFormValues}
                    isInvalid={validity.submitted &&
                  formValues.state.length === 0}
                    isValid={validity.submitted &&
                  formValues.state.length > 0}
                  />
                  <Form.Control.Feedback type='invalid'>
                Please Enter a State
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="zip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    value={formValues.zip}
                    placeholder="98195"
                    onChange={setFormValues}
                    isInvalid={validity.submitted &&
                  formValues.zip.length === 0}
                    isValid={validity.submitted &&
                  formValues.zip.length > 0}
                  />
                  <Form.Control.Feedback type='invalid'>
                Please Enter a Zip Code
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Row} controlId="hoursOpen">
                <Form.Label id="day">
                  Monday
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    max="12"
                    min="1"
                    name="newHoursOpen"
                    value={formValues.newHoursOpen}
                    placeholder="Enter a number between 1-12"
                    onChange={setFormValues}
                    isValid={validity.submitted &&
                    formValues.newHoursOpen > 0 && formValues.newHours < 13}
                    isInvalid={validity.submitted &&
                    (formValues.newHoursOpen < 1 || formValues.newHours > 12)}
                  />
                  <Form.Control.Feedback type='invalid'>
                  Please enter a number between 1 and 12
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Col>
                <Form.Group>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-dark" id="openAP">
                      Select
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>AM</Dropdown.Item>
                      <Dropdown.Item>PM</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Col>

              <Form.Group as={Row} controlId="hoursClose">
                <Col>
                  <Form.Control
                    type="number"
                    max="12"
                    min="1"
                    name="newHoursClose"
                    value={formValues.newHoursClose}
                    placeholder="Enter a number between 1-12"
                    onChange={setFormValues}
                    isValid={validity.submitted &&
                    formValues.newHoursClose > 0 && formValues.newHours < 13}
                    isInvalid={validity.submitted &&
                    (formValues.newHoursClose > 1 || formValues.newHours > 12)}
                  />
                  <Form.Control.Feedback type='invalid'>
                  Please enter a number between 1 and 12
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-dark" id="closeAP">
                      Select
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>AM</Dropdown.Item>
                      <Dropdown.Item>PM</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formValues.phone}
                placeholder="Enter phone number here"
                onChange={setFormValues}
                isInvalid={validity.submitted &&
                  formValues.phone.length === 0}
                isValid={validity.submitted &&
                  formValues.phone.length > 0}
              />
              <Form.Control.Feedback type='invalid'>
                Please Enter A Phone Number
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Button type='submit' style={{width: '100%'}}>
            Register</Button>
          </Form>
        </Card.Body>

      </Card>
    </div>
  );
};

export default ProfilePage;
