import React from 'react';
import {useForm} from './../logic/logic';

interface registerValues {
    businessName: string;
    ownerName: string;
    email: string;
    password: string;
    address: string;
    hours: string;
    phone: string;
}

const RegistrationPage = () => {
  const [formValues, setFormValues] = useForm({businessName: '', ownerName: '',
    email: '', password: '', address: '', hours: '', phone: ''});

  return (
    <div className="form">
      <input
        type="text"
        name="businessName"
        value={formValues.businessName}
        placeholder="Business Name"
        onChange={setFormValues}
      />
      <input
        type="text"
        name="ownerName"
        value={formValues.ownerName}
        placeholder="Owner Name"
        onChange={setFormValues}
      />
      <input
        type="text"
        name="email"
        value={formValues.email}
        placeholder="E-mail"
        onChange={setFormValues}
      />
      <input
        type="password"
        name="password"
        value={formValues.password}
        placeholder="Password"
        onChange={setFormValues}
      />
      <input
        type="text"
        name="address"
        value={formValues.address}
        placeholder="Address"
        onChange={setFormValues}
      />
      <input
        type="text"
        name="hours"
        value={formValues.hours}
        placeholder="Hours"
        onChange={setFormValues}
      />
      <input
        type="text"
        name="phone"
        value={formValues.phone}
        placeholder="Phone Number"
        onChange={setFormValues}
      />
      <button onClick={() => submitFormValues(
          {
            businessName: formValues.businessName,
            ownerName: formValues.ownerName,
            email: formValues.email,
            password: formValues.password,
            address: formValues.address,
            hours: formValues.hours,
            phone: formValues.phone,
          },
      )}>Register</button>
    </div>
  );
};

const submitFormValues = (formValues : registerValues) => {
  console.log('TODO: Push data to Firebase.');
};

export default RegistrationPage;
