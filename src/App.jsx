import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import Board from './Board';
import Congrats from './Congrats';
import Controls from './Controls';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id='main'>
        <Helmet>
          <title>{`${this.props.tileCount}-puzzle`}</title>
        </Helmet>
        <Board />
        <Controls />
        <Congrats />
      </div>
    );
  }
}

const mapStateToProps = ({ rows, cols }) => ({ tileCount: rows * cols - 1 });

export default connect(mapStateToProps)(App);
