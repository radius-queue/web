import React from 'react';
import {useForm} from './../logic/logic';
import './../firebase.ts';
import firebase from 'firebase/app';
import {
  useHistory,
} from 'react-router-dom';

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

  const history = useHistory();

  const submitFormValues = async (formValues : registerValues) => {
    let changePage: boolean = true;
    if (formValues.password !== formValues.confirmPassword) {
      console.log('mismatching passwords');
    } else {
      firebase.auth()
          .createUserWithEmailAndPassword(formValues.email, formValues.password)
          .catch(function(error) {
            changePage = false;
          });
      if (changePage) {
        history.replace('/post-log-in/hub');
      }
    }
  };

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

export default RegistrationPage;
