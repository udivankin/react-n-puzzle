import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { clone, shuffleBoard } from './helpers';
import { gameState, tilesState } from './state';
import Audio from './win.ogg';

import './Congrats.css';

const Congrats = () => {
  const audioRef = useRef();
  useEffect(() => { audioRef.current.play(); }, []);
  const [tiles, setTiles] = useRecoilState(tilesState);
  const [, setGame] = useRecoilState(gameState);

  const handleClick = () => {
    setTiles(shuffleBoard(clone(tiles)));
    setGame({ moves: 0, gameId: Symbol('gameId')});
  };

  return (
    <div className="congrats">
      <div className="congrats-star" />
      <div className="congrats-header">
        You did it!
      </div>
      <audio src={Audio} ref={audioRef} />
      <div className="congrats-controls">
        <a
          href="#"
          alt="Play again!"
          onClick={handleClick}
        >
          Play again!
        </a>
      </div>
    </div>
  );
}

export default Congrats;