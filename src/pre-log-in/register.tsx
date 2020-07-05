import React from 'react';
import {useForm} from '../logic/logic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './register.css';
import Col from 'react-bootstrap/Col';

interface registerValues {
    businessName: string;
    ownerName: string;
    email: string;
    password: string;
    confirm: string;
    address: string;
    hours: string;
    phone: string;
}

const RegistrationPage = () => {
  const [formValues, setFormValues] = useForm({businessName: '', ownerName: '',
    email: '', password: '', confirm: '', address: '', hours: '', phone: ''});

  return (
    <div id="reg-container">
      <Card bg='dark' text='white' id="reg-card">
        <Card.Title className="form-header">
        Register your business with Radius.</Card.Title>

        <Card.Body>
          <Form>
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
                  />
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
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Group controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                placeholder="Enter e-mail here"
                onChange={setFormValues}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                placeholder="Enter password here"
                onChange={setFormValues}
              />
            </Form.Group>

            <Form.Group controlId="confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                value={formValues.confirm}
                placeholder="Confirm password"
                onChange={setFormValues}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formValues.address}
                placeholder="Enter address here"
                onChange={setFormValues}
              />
            </Form.Group>

            <Form.Group controlId="hours">
              <Form.Label>Hours of Operation</Form.Label>
              <Form.Control
                type="text"
                name="hours"
                value={formValues.hours}
                placeholder="Enter hours of operation here"
                onChange={setFormValues}
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formValues.phone}
                placeholder="Enter phone number here"
                onChange={setFormValues}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={() => submitFormValues(
              {
                businessName: formValues.businessName,
                ownerName: formValues.ownerName,
                email: formValues.email,
                password: formValues.password,
                confirm: formValues.confirm,
                address: formValues.address,
                hours: formValues.hours,
                phone: formValues.phone,
              },
          )}>Register</Button>
        </Card.Body>

      </Card>
    </div>
  );
};

const submitFormValues = (formValues : registerValues) => {
  console.log('TODO: Push data to Firebase.');
};

export default RegistrationPage;
