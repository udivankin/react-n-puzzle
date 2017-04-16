export const MOVE = 'puzzle/MOVE';
export const RESET = 'puzzle/RESET';
export const SHUFFLE = 'puzzle/SHUFFLE';
export const RESIZE = 'puzzle/RESIZE';

export function move(tile) {
  return {
    type: MOVE,
    tile,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function shuffle() {
  return {
    type: SHUFFLE,
  };
}

export function updateBoardSize(axis, amount) {
  return {
    type: RESIZE,
    axis,
    amount,
  };
}