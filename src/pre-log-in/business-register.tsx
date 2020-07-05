import React from 'react';
import {useForm} from './../logic/logic';
import './../firebase.ts';
import firebase from 'firebase/app';

interface registerValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const RegistrationPage = () => {
  const [formValues, setFormValues] = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="form">
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
        type="password"
        name="confirmPassword"
        value={formValues.confirmPassword}
        placeholder="Confirm Password"
        onChange={setFormValues}
      />
      <button onClick={() => submitFormValues(
          {
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
          },
      )}>Register</button>
    </div>
  );
};

const submitFormValues = (formValues : registerValues) => {
  if (formValues.password !== formValues.confirmPassword) {
    console.log('mismatching passwords');
  } else {
    firebase.auth()
        .createUserWithEmailAndPassword(formValues.email, formValues.password)
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error code: ' + errorCode);
          console.log('error message: ' + errorMessage);
        });
    console.log('register button clicked');
  }
};

export default RegistrationPage;
