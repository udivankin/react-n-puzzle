import React, { Component } from 'react';

import Board from './Board';
import Congrats from './Congrats';
import Controls from './Controls';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id='main'>
        <Board />
        <Controls />
        <Congrats />
      </div>
    );
  }
}

export default App;
