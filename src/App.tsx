import React from 'react';
import './App.css';
import BusinessLogInPage from './logIn/log-in';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './register/business-register';

/**
 * Presents the Business-Side Web App.
 * @return {html} Web App.
 */
function App() {
  return (
    <div>
      <BusinessLogInPage/>
      <RegistrationPage/>
    </div>
  );
}

export default App;
