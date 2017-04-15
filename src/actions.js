export const MOVE = 'puzzle/MOVE';
export const SHUFFLE = 'puzzle/SHUFFLE';
export const BOARD_SIZE_UPDATE = 'puzzle/BOARD_SIZE_UPDATE';

export function move(tile) {
  return {
    type: MOVE,
    tile,
  };
}

export function shuffle() {
  return {
    type: SHUFFLE,
  };
}

export function updateBoardSize(axis, amount) {
  return {
    type: BOARD_SIZE_UPDATE,
    axis,
    amount,
  };
}