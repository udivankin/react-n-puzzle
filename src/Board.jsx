import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBoard } from './helpers'; 
import Tile from './Tile';
import './Board.css';

const getAspectRatio = () => document.body.offsetWidth / document.body.offsetHeight;

const restrictSize = ({ width, height }, offset) => ({
  width: `${width}%`,
  height: `${height}%`,
  ...(width > 100 - offset) ? { transform: `scale(${(100 - offset) / width})`} : {},
  ...(height > 100 - offset) ? { transform: `scale(${(100 - offset) / height})`} : {},
});

const getStyles = (cols, rows, aspectRatio = getAspectRatio(), offset = 20) => (
  restrictSize({
    width: cols > rows
      ? (100 - offset)
      : (100 - offset) / aspectRatio * cols / rows,
    height: cols > rows
      ? (100 - offset) * aspectRatio * rows / cols
      : (100 - offset),
  }, offset)
);

class Board extends Component {
  updateDimensions = debounce(() => this.forceUpdate(), 500);

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('orientationchange', this.updateDimensions);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    window.removeEventListener('orientationchange', this.updateDimensions);
  };

  render() {
    const { cols, rows, tiles } = this.props;

    return (
      <div id='board' style={getStyles(cols, rows)}>
        {tiles.map(
          tile => <Tile key={tile.id} {...{ cols, rows, tile }} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ cols: state.cols, rows: state.rows, tiles: getBoard(state) });

export default connect(mapStateToProps)(Board);
