import shuffle from 'lodash.shuffle';

export const DEFAULT_COLS = 4;
export const DEFAULT_ROWS = 4;

function getEmptyTile({ tiles }) {
  for (let id in tiles) {
    if (id === 'empty') {
      return tiles[id];
    }
  }
}

function getTileAt({ tiles }, x, y) {
  for (let id in tiles) {
    if (tiles[id].x === x && tiles[id].y === y) {
      return tiles[id];
    }
  }
}

function getSiblings(state, targetTile) {
  const { cols, rows } = state;
  const { x, y } = targetTile;

  return [{ x: x - 1, y }, { x, y: y - 1 }, { x: x + 1, y }, { x: x, y: y + 1 }].reduce(
    (result, value) => {
      return (value.x >= 0 && value.x < cols && value.y >= 0 && value.y < rows)
        ? [...result, getTileAt(state, value.x, value.y)]
        : result;
    },
    []
  );
}

function getCanExchange(siblings, emptyTile) {
  return siblings.some(tile => tile.x === emptyTile.x && tile.y === emptyTile.y);
}

export function move(state, targetTile) {
  const emptyTile = getEmptyTile(state);
  const siblings = getSiblings(state, targetTile);

  if (getCanExchange(siblings, emptyTile)) {
    return {
      ...state.tiles,
      empty: { ...targetTile, id: 'empty' },
      [targetTile.id]: { ...emptyTile, id: targetTile.id },
    };
  }

  return state.tiles;
}

export function randomMove(state) {
  const emptyTile = getEmptyTile(state);
  const siblings = getSiblings(state, emptyTile);
  const targetTile = shuffle(siblings).pop();
  let result;

  Object.values(state.tiles).forEach((tile) => {
    if (tile.x === targetTile.x && tile.y === targetTile.y) {
      result = move(state, targetTile);
    }
  });

  return result;
}

export function generateTiles(cols = DEFAULT_COLS, rows = DEFAULT_ROWS) {
  const tiles = {};
  
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      const id = Object.keys(tiles).length + 1;
      if (x * y < (cols - 1) * (rows - 1)) { // skip last item
        tiles[id] = { id, x, y };
      } else {
        tiles.empty = { id: 'empty', x, y };
      }
    }
  }

  return tiles;
}

export function shuffleBoard(state) {
  let nextState = { ...state };

  for (var i = 0; i < Math.pow(nextState.rows * nextState.cols, 2); i++) {
    nextState = { ...state, tiles: randomMove(nextState) };
  }

  return nextState;
}

export function getBoard(state) {
  return Object.values(state.tiles);
}