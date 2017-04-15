import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { reset } from './actions';
import './Congrats.css';
import Audio from './win.ogg';

class Congrats extends Component {
  componentDidUpdate() {
    if (this.audioRef && this.props.isCompleted) {
      this.audioRef.play();
    }
  }

  render() {
    const { isCompleted, reset } = this.props;

    if (!isCompleted) {
      return null;
    }

    return (
      <div id="congrats">
        <div className="star" />
        <div className="header">
          You won!
        </div>
        <audio src={Audio} ref={(c) => {this.audioRef = c;}} />
        <div className="controls">
          <a href="#" onClick={reset}>Play again!</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ isCompleted }) => ({ isCompleted });
const mapDispatchToProps = (dispatch) => bindActionCreators({ reset }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Congrats);