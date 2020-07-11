import React, {useState} from 'react';
import {useForm} from '../logic/logic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './profile.css';
import Col from 'react-bootstrap/Col';
import Map from './google-components/profile-map';
import AddressAutocomplete from './google-components/profile-autocomplete';
import {UW_MAP_PROPS} from '../util/HardcodedData';

interface ProfileProps {
  uid: string;
}
const ProfilePage = ({uid}: ProfileProps) => {
  const [formValues, setFormValues] = useForm({businessName: '', ownerName: '',
    city: '', state: '', zip: '', phone: ''});

  const [address, setAddress] = useState('');
  const [building, setBuilding] = useState<google.maps.LatLng>(UW_MAP_PROPS.buildingLocation);
  const [radius, setRadius] = useState<number>(UW_MAP_PROPS.radius);
  const [editing, setEditing] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setEditing(false);

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
                    onChange={setFormValues}
                    value={formValues.businessName}
                    isValid={submitted &&
                      formValues.businessName.length > 0}
                    isInvalid={submitted &&
                      formValues.businessName.length === 0}
                    placeholder={'My Amazing Business'}
                    readOnly={!editing}
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
                    placeholder="John Smith"
                    onChange={setFormValues}
                    isValid={submitted && formValues.ownerName.length > 0}
                    isInvalid={submitted && formValues.ownerName.length === 0}
                    value={formValues.ownerName}
                    readOnly={!editing}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please Enter an Owner Name
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <AddressAutocomplete
              onChange={setAddress}
              isValid={submitted && address.length > 0}
              isInvalid={submitted && address.length === 0}
              setCenter={setBuilding}
              editable={editing}
            />
            <Form.Group>
              <Form.Label>Radius (m)</Form.Label>
              <Form.Control
                type='number'
                value={Math.round(radius)}
                readOnly
              />
              <Form.Text>Edit using the circle on the map.</Form.Text>
            </Form.Group>
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
                readOnly={!editing}
              />
              <Form.Control.Feedback type='invalid'>
                Please Enter A Phone Number
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {!editing ? <Button key='edit' onClick={() => setEditing(true)} style={{width: '100%'}}>Edit Your Info</Button> :
              <Button key='submit' type='submit' style={{width: '100%'}}>Submit Changes</Button>}
          </Form>
        </Card.Body>
      </Card>
      <Card id='map-container'>
        <Map
          buildingLocation={building}
          setRadius={setRadius}
          radius={radius}
          editable={editing}
        />
      </Card>
    </div>
  );
};

export default ProfilePage;
