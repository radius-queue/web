import React from 'react';
import './App.css';
import BusinessLogInPage from './logIn/log-in';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './register/business-register';

function App() {
  return (
    <div className="App">
      <BusinessLogInPage/>
      <RegistrationPage/>
    </div>
  );
}

export default App;
