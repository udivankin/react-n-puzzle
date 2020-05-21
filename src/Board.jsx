import React from 'react';
import { useRecoilState } from 'recoil';

import { clone, move } from './helpers';
import { sortedTilesState, tilesState, sizeState } from './state';

import './Board.css';

const Board = () => {
  const [tiles, setTiles] = useRecoilState(tilesState);
  const [sortedTiles] = useRecoilState(sortedTilesState);
  const [size] = useRecoilState(sizeState);

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
              onClick={() => setTiles(move(clone(tiles), tileName))}
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