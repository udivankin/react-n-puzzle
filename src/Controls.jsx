import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { shuffle, updateBoardSize } from './actions';
import './Controls.css';

const Controls = ({ cols, isCompleted, rows, tile, shuffle, updateBoardSize }) => {
  if (isCompleted) {
    return null;
  }

  const incrementCols = () => updateBoardSize('cols', 1);
  const incrementRows = () => updateBoardSize('rows', 1);
  const decrementCols = () => updateBoardSize('cols', -1);
  const decrementRows = () => updateBoardSize('rows', -1);

  return (
    <div id="controls">
      <div className="rows-controls">
        Rows
        <button className="btn btn-outline" title="Less rows" onClick={decrementRows}>-</button>
        <button className="btn btn-outline" title="More rows" onClick={incrementRows}>+</button>
      </div>
      <div className="cols-controls">
        Columns
        <button className="btn btn-outline" title="Less columns" onClick={decrementCols}>-</button>
        <button className="btn btn-outline" title="More columns" onClick={incrementCols}>+</button>
      </div>
      <div className="aside-controls">
        <button className="btn btn-shuffle" title="Shuffle" onClick={shuffle}></button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ isCompleted }) => ({ isCompleted });
const mapDispatchToProps = (dispatch) => bindActionCreators({ shuffle, updateBoardSize }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
