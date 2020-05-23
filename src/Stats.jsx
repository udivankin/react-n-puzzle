import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { gameState } from './state';

import './Stats.css';
import { getTime } from './helpers';

const Timer = () => {
  const [game] = useRecoilState(gameState);
  const [previousGameId, setPreviousGameId] = useState(game.gameId);
  const [seconds, setSeconds] = useState(0);

  if (game.gameId !== previousGameId) {
    setSeconds(0);
    setPreviousGameId(game.gameId);
  }

  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000)

    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <span>Time: {getTime(seconds)}</span>
  );
}

const Moves = () => {
  const [game] = useRecoilState(gameState);
  return <span>Moves: {game.moves}</span>;
}

const Stats = () => {
  return (
    <div className="stats">
      <Moves />
      <Timer />
    </div>
  );
}

export default Stats;