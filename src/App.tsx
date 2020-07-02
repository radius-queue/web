import React from 'react';
import {QueueList} from './QueueView/QueueView';
import './App.css';
import {TEST_QUEUE} from './util/HardcodedData';

/**
 * Top Level app component
 *
 * @return {HTMLElement} App HTML
 */
function App() {
  return (
    <div className="App">
      <QueueList queue={TEST_QUEUE} />
    </div>
  );
}

export default App;
