import React, {useState} from 'react';
import {useForm} from '../logic/logic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './profile.css';
import Col from 'react-bootstrap/Col';
import Map from './maps/profile-map';
import {UW_MAP_PROPS} from '../util/HardcodedData';
import './../firebase.ts';

interface ProfileProps {
  uid: string;
}
const ProfilePage = ({uid}: ProfileProps) => {
  const [formValues, setFormValues] = useForm({businessName: '', ownerName: '',
    address: '', city: '', state: '', zip: '', phone: ''});

  const [submitted, setSubmitted] = useState<boolean>(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    /**
     * TODO: PUSH TO FIREBASE
     * */
  };

  return (
    <div>
      <Card id="profile-container">
        <Card.Title className="form-header-profile">
          My Profile
        </Card.Title>
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
                    isValid={submitted &&
                      formValues.businessName.length > 0}
                    isInvalid={submitted &&
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
                    isValid={submitted &&
                      formValues.ownerName.length > 0}
                    isInvalid={submitted &&
                      formValues.ownerName.length === 0}
                    defaultValue={uid!.displayName!}
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
                isInvalid={submitted &&
                  formValues.address.length === 0}
                isValid={submitted &&
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
                    isInvalid={submitted &&
                  formValues.city.length === 0}
                    isValid={submitted &&
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
                    isInvalid={submitted &&
                  formValues.state.length === 0}
                    isValid={submitted &&
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
                    isInvalid={submitted &&
                  formValues.zip.length === 0}
                    isValid={submitted &&
                  formValues.zip.length > 0}
                  />
                  <Form.Control.Feedback type='invalid'>
                Please Enter a Zip Code
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>

            {/* <Form.Row>
              <Col md='auto'>
                <Form.Label id="day">Monday</Form.Label>
              </Col>
              <Form.Group as={Col} controlId="hoursOpen">
                <Col md='auto'>
                  <Form.Label>Open:</Form.Label>
                  <Form.Control
                    type="time"
                    name="hoursOpen"
                    onChange={setFormValues}
                    isValid={submitted &&
                    formValues.hoursOpen.length > 0}
                    isInvalid={submitted &&
                    formValues.hoursOpen.length === 0}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter your Hours of Operation
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Col} controlId="hoursClose">
                <Form.Label>Close:</Form.Label>
                <Form.Control
                  type="time"
                  name="hoursClose"
                  onChange={setFormValues}
                  isValid={submitted &&
                  formValues.hoursClose.length > 0}
                  isInvalid={submitted &&
                  formValues.hoursClose === 0}
                />
                <Form.Control.Feedback type='invalid'>
                    Please Enter a Closing Time
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>*/}

            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formValues.phone}
                placeholder="###-###-####"
                onChange={setFormValues}
                isInvalid={submitted &&
                  formValues.phone.length === 0}
                isValid={submitted &&
                  formValues.phone.length > 0}
              />
              <Form.Control.Feedback type='invalid'>
                Please Enter A Phone Number
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Button type='submit' style={{width: '100%'}}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card id='map-container'>
        <Map {...UW_MAP_PROPS}/>
      </Card>
    </div>
  );
};

export default ProfilePage;
