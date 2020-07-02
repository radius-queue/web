import React from 'react';
import {QueueList} from './QueueView/QueueView';
import {TEST_QUEUE} from './util/HardcodedData';
// import RegistrationPage from './register/business-register';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Top Level app component
 *
 * @return {HTMLElement} App HTML
 */
function App() {
  return (
    <QueueList queue={TEST_QUEUE} />
  );
}

export default App;
