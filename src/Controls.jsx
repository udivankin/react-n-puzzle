import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { clone, generateTiles, find, move, shuffleBoard } from './helpers';
import { sizeState, tilesState } from './state';

import './Controls.css';

const SizeButton = ({ rows = false, cols = false, direction }) => {
  const [_, setTiles] = useRecoilState(tilesState);
  const [size] = useRecoilState(sizeState);

  const clickHandler = () => {
    const nextRows = Math.max(2, size.rows + (rows ? direction : 0));
    const nextCols = Math.max(2, size.cols + (cols ? direction : 0));
    setTiles(shuffleBoard(generateTiles(nextRows, nextCols)));
  };

  return (
    <button
      className="btn btn-outline"
      title={`${direction > 0 ? 'More' : 'Less'} ${rows ? 'rows' : 'columns'}`}
      onClick={clickHandler}
    >
      {direction > 0 ? '+' : '-'}
    </button>
  );
};

const Controls = () => {
  const [tiles, setTiles] = useRecoilState(tilesState);
  const [size] = useRecoilState(sizeState);

  const handleKeyDown = ({ keyCode }) => {
    const [row, col] = find(tiles, 0);
    let tile;

    if (keyCode === 37 && (col < size.cols - 1)) { // LEFT
      tile = tiles[row][col + 1];
    } else if (keyCode === 38 && (row < size.rows - 1)) { // UP
      tile = tiles[row + 1][col];
    } else if (keyCode === 39 && col > 0) { // RIGHT
      tile = tiles[row][col - 1];
    } else if (keyCode === 40 && row > 0) { // DOWN
      tile = tiles[row - 1][col];
    }

    if (tile) setTiles(move(clone(tiles), tile));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); }
  });
    
  return (
    <div className="controls">
      <div className="rows-controls">
        Rows
        <SizeButton rows direction={-1} />
        <SizeButton rows direction={+1} />
      </div>
      <div className="cols-controls">
        Columns
        <SizeButton cols direction={-1} />
        <SizeButton cols direction={+1} />
      </div>
      <div className="aside-controls">
        <button
          className="btn btn-shuffle"
          title="Shuffle"
          onClick={() => setTiles(shuffleBoard(clone(tiles)))}
        ></button>
      </div>
    </div>
  );
}

export default Controls;