import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { clone, shuffleBoard } from './helpers';
import { tilesState } from './state';
import Audio from './win.ogg';

import './Congrats.css';

const Congrats = () => {
  const audioRef = useRef();
  useEffect(() => { audioRef.current.play(); }, []);
  const [tiles, setTiles] = useRecoilState(tilesState);

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
          onClick={() => setTiles(shuffleBoard(clone(tiles)))}
        >
          Play again!
        </a>
      </div>
    </div>
  );
}

export default Congrats;