import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { clone, find, move } from './helpers';
import { sortedTilesState, tilesState, sizeState, gameState } from './state';

import './Board.css';

const Board = () => {
  const [game, setGame] = useRecoilState(gameState);
  const [tiles, setTiles] = useRecoilState(tilesState);
  const [sortedTiles] = useRecoilState(sortedTilesState);
  const [size] = useRecoilState(sizeState);

  const handleMove = (tile) => {
    const [nextTiles, movesTaken] = move(clone(tiles), tile);
    setGame({ ...game, moves: game.moves + movesTaken });
    setTiles(nextTiles);
  }

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

    if (tile) handleMove(tile);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); }
  });

  return (
    <div className='board-wrapper'>
      <svg
        className="board"
        width="100%"
        height="100%"
        viewBox={`0 0 ${size.cols * 24} ${size.rows * 24}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {sortedTiles.map((pos, tileName) => {
          if (tileName === 0) return null;
          return (
            <g
              className="tile"
              onClick={() => handleMove(tileName)}
              key={tileName} 
              transform={`translate(${pos[1] * 24}, ${pos[0] * 24})`}
            >
              <rect
                height="22"
                width="22"
                strokeWidth="0"
                x="1"
                y="1"
              />
              <text
                fontSize="12"
                transform={`translate(12, 16)`}
                textAnchor="middle"
              >
                {tileName}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  )
};

export default Board;