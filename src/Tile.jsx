import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { move } from './actions';

const getStyles = (cols, rows, tile) => {
  const width = 100 / cols;
  const height = 100 / rows;

  return {
    left: width * tile.x + '%',
    top: height * tile.y + '%',
    width: width + '%',
    height: height + '%',
  };
};

const Tile = ({ cols, rows, tile, move }) => {
  if (tile.id === 'empty') {
    return null;
  }

  return (
    <div className="tile" style={getStyles(cols, rows, tile)} onClick={() => move(tile)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <text
          x="50"
          y="50"
          alignmentBaseline="central"
          fontSize="50"
          textAnchor="middle"
          fill="white"
        >
          {tile.id}
        </text>
      </svg>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ move }, dispatch);

export default connect(null, mapDispatchToProps)(Tile);
