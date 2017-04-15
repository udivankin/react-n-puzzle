import { MOVE, BOARD_SIZE_UPDATE } from './actions.js';
import { DEFAULT_COLS, DEFAULT_ROWS, generateTiles, move } from './helpers.js';

const initialState = {
  /**
   * Tiles map
   * 
   * @type {{id: <string>, x: <number>, y: <number>}:<Map>}
   */
  tiles: generateTiles(),

  /**
   * Cols count
   * 
   * @type {number}
   */
  cols: DEFAULT_COLS,
  
  /**
   * Rows count
   * 
   * @type {number}
   */
  rows: DEFAULT_ROWS,
};

function updateBoardSize(state, { axis, amount }) {
  let cols = axis === 'cols' ? state.cols + amount : state.cols;
  let rows = axis === 'rows' ? state.rows + amount : state.rows;
  cols = cols > 2 ? cols : state.cols;
  rows = rows > 2 ? rows : state.rows;

  return {
    cols,
    rows,
    tiles: generateTiles(cols, rows),
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE:
      return {
        ...state,
        tiles: move(state, action.tile),
      };
    case BOARD_SIZE_UPDATE:
      return {
        ...state,
        ...updateBoardSize(state, action),
      };
    default:
      return state;
  }
}

export default reducer;