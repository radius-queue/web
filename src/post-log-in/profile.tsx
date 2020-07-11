import React, {useState, useEffect} from 'react';
import getBusiness from '../util/get-business';
import {Business} from '../util/business';
import GOOGLE_API_KEY from '../google-key';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './profile.css';
import Col from 'react-bootstrap/Col';
import Map from './google-components/profile-map';
import AddressAutocomplete from './google-components/profile-autocomplete';
import {UW_MAP_PROPS} from '../util/HardcodedData';

import {
  Prompt,
} from 'react-router-dom';

interface ProfileProps {
  uid: string;
  setBusiness: (b:Business) => void;
  business: Business | undefined;
}
const ProfilePage = ({uid, setBusiness, business}: ProfileProps) => {
  const [form, setForm] = useState({businessName: business ? business.name : '',
    firstName: business ? business.firstName : '',
    lastName: business ? business.lastName : '',
    phone: '',
    address: ''});
  const [building, setBuilding] =
    useState<google.maps.LatLng>(UW_MAP_PROPS.buildingLocation);
  const [radius, setRadius] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const queryForBusiness = async () => {
    const val : Business | undefined = await getBusiness(uid);
    if (val) {
      setForm({
        businessName: val!.name,
        firstName: val!.firstName,
        lastName: val!.lastName,
        phone: '',
        address: val!.locations[0].address,
      });
      setBuilding(new google.maps.LatLng(val!.locations[0].coordinates[0], val!.locations[0].coordinates[1]));
      setRadius(val!.locations[0].geoFenceRadius);
      setBusiness(val!);
    } else {
      setEditing(true);
    }
  };

  useEffect(() => {
    if (!business) {
      queryForBusiness();
    }
  }, []);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (allFieldsCompleted()) {
      setEditing(false);
      // setBusiness(business);
      /**
     * TODO: PUSH TO FIREBASE
     * */
    }
  };

  const allFieldsCompleted : () => boolean = () => {
    let result : boolean = true;
    for (const field of Object.keys(form)) {
      result = result && field.length > 0;
    }
    return result;
  };

  return (
    <div>
      <Card id="profile-container">
        <Card.Title className="form-header-profile">
          My Profile
        </Card.Title>
        <Card.Body>
          <Form noValidate onSubmit={submitForm}>
            <Prompt
              when={editing}
              message={() => 'You have unsaved changes. Are you sure you want to leave the page?'}
            />
            <Form.Group controlId="businessName">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                onChange={(e) => setForm({...form, businessName: e.target.value})}
                value={form.businessName}
                isValid={submitted &&
                  form.businessName.length > 0}
                isInvalid={submitted &&
                  form.businessName.length === 0}
                placeholder={'My Amazing Business'}
                readOnly={!editing}
              />
              <Form.Control.Feedback type='invalid'>
                Please Enter a Business Name
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="John"
                    onChange={(e) => setForm({...form, firstName: e.target.value})}
                    isValid={submitted && form.firstName.length > 0}
                    isInvalid={submitted && form.firstName.length === 0}
                    value={form.firstName}
                    readOnly={!editing}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please Enter an First Name
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Smith"
                    onChange={(e) => setForm({...form, lastName: e.target.value})}
                    isValid={submitted && form.lastName.length > 0}
                    isInvalid={submitted && form.lastName.length === 0}
                    value={form.lastName}
                    readOnly={!editing}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please Enter a Last Name
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={form.phone}
                placeholder="###-###-####"
                onChange={(e) => setForm({...form, phone: e.target.value})}
                isInvalid={submitted &&
                  form.phone.length === 0}
                isValid={submitted &&
                  form.phone.length > 0}
                readOnly={!editing}
              />
              <Form.Control.Feedback type='invalid'>
                Please Enter A Phone Number
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <AddressAutocomplete
              onChange={(s: string) => setForm({...form, address: s})}
              isValid={submitted && form.address.length > 0}
              isInvalid={submitted && form.address.length === 0}
              setCenter={setBuilding}
              editable={editing}
              key={`${editing}`}
              value={form.address}
            />
            <Form.Group>
              <Form.Label>Radius (m)</Form.Label>
              <Form.Control
                type='number'
                value={Math.round(radius)}
                readOnly
              />
              {editing && <Form.Text>Edit using the circle on the map.</Form.Text>}
            </Form.Group>
            {!editing ? <Button variant='warning' key='edit' onClick={() => setEditing(true)}
              style={{width: '100%'}}>Edit Your Info</Button> :
              <Button key='submit' type='submit' style={{width: '100%'}}>
                Submit Changes
              </Button>}
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
