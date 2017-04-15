import { MOVE, BOARD_SIZE_UPDATE } from './actions.js';
import { DEFAULT_COLS, DEFAULT_ROWS, generateTiles } from './helpers.js';

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
  let cols = action.axis === 'cols' ? state.cols + action.amount : state.cols;
  let rows = action.axis === 'rows' ? state.rows + action.amount : state.rows;
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
      return { ...state };
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