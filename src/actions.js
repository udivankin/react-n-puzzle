export const MOVE = 'puzzle/MOVE';
export const BOARD_SIZE_UPDATE = 'puzzle/BOARD_SIZE_UPDATE';

export function move(tile) {
  return {
    type: MOVE,
    tile,
  };
}

export function updateBoardSize(axis, amount) {
  return {
    type: BOARD_SIZE_UPDATE,
    axis,
    amount,
  };
}