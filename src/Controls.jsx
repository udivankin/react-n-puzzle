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
    <svg className="btn btn-outline" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={clickHandler}>
      <circle cx="12" cy="12" fill="#fff" fillOpacity="0.1" r="11" strokeWidth="0.5" stroke="#fff"/>
      <text textAnchor="middle" fontSize="9" fontWeight="bold" transform={`translate(12, 15.5)`} fill="#fff">
        {direction > 0 ? '+' : '-'}
      </text>
    </svg>
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
        <svg className="btn btn-shuffle" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => setTiles(shuffleBoard(clone(tiles)))}>
          <circle cx="12" cy="12" fill="#0dad8a" r="11"/>
          <g fill="#fff">
            <path d="M6.59 9.49h2.43c.51 0 .97.27 1.29.68.22-.4.5-.8.82-1.15a2.95 2.95 0 00-2.11-.93H6.59a.7.7 0 100 1.4zm5.34 2.15c.38-1.15 1.56-2.15 2.53-2.15h1.28l-.9.89a.7.7 0 10.97.98L18.4 8.8l-2.57-2.57a.7.7 0 10-.98.98l.9.9h-1.28c-1.58 0-3.27 1.36-3.85 3.1l-.33.99c-.45 1.33-1.44 2.15-1.95 2.15H6.58a.7.7 0 100 1.4h1.75c1.28 0 2.69-1.34 3.28-3.12l.32-.98z"/>
            <path d="M15 12.47a.7.7 0 000 .98l.9.9h-1.63a2 2 0 01-1.88-1.47 6.36 6.36 0 01-.75 1.52 3.3 3.3 0 002.63 1.34h1.62l-.9.89a.7.7 0 10.98.98l2.58-2.57-2.57-2.57a.7.7 0 00-.99 0z"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Controls;