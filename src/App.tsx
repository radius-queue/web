import React from 'react';
import {QueueList} from './QueueView/QueueView';
import {TEST_QUEUE} from './util/HardcodedData';
import RegistrationPage from './register/business-register';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
<<<<<<< HEAD
 * Top Level app component
 *
 * @return {HTMLElement} App HTML
 */
function App() {
  return (
    <QueueList queue={TEST_QUEUE} />
=======
 * Presents the Business-Side Web App.
 * @return {html} Web App.
 */
function App() {
  return (
    <div>
      <BusinessLogInPage/>
      <RegistrationPage/>
    </div>
>>>>>>> 001df634b1bf5608c0f016b29ebd065f2ea50132
  );
}

export default App;
