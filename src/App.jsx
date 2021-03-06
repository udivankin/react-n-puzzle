import React from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState } from 'recoil';

import Board from './Board';
import Congrats from './Congrats';
import Controls from './Controls';
import Stats from './Stats';
import { isCompleteState, sizeState } from './state';

import './App.css';

const App = () => {
  const [isComplete] = useRecoilState(isCompleteState);
  const [size] = useRecoilState(sizeState);

  return (
    <>
      <Helmet>
        <title>
          {`${size.chips}-puzzle`}
        </title>
      </Helmet>
      {!isComplete && <Controls />}
      {isComplete ? <Congrats /> : <Board />}
      {!isComplete && <Stats />}
    </>
  );
}

export default App;