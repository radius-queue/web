import React from 'react';
<<<<<<< HEAD
import {QueueList} from './QueueView/QueueView';
import './App.css';
import {TEST_QUEUE} from './util/HardcodedData';
=======
import './App.css';
import BusinessLogInPage from './logIn/log-in';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './register/business-register';
>>>>>>> f5a95cb02f1d23d93bf7896e8aec4ab6ace5dec9

/**
 * Top Level app component
 *
 * @return {HTMLElement} App HTML
 */
function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <QueueList queue={TEST_QUEUE} />
=======
      <BusinessLogInPage/>
      <RegistrationPage/>
>>>>>>> f5a95cb02f1d23d93bf7896e8aec4ab6ace5dec9
    </div>
  );
}

export default App;
