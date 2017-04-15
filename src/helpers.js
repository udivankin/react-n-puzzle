export const DEFAULT_COLS = 4;
export const DEFAULT_ROWS = 4;

function compare(valueA, valueB) {
  if (valueA === valueB) {
    return 0;
  }

  return valueA > valueB ? 1 : -1;
}

function sort(tiles) {
  return tiles.sort((valueA, valueB) => { 
    if (valueA.y === valueB.y) {
      return compare(valueA.x, valueB.x);
    }
    
    return compare(valueA.y, valueB.y);
  })
}

function getEmptyTile({ tiles }) {
  for (let [id, tile] of tiles) {
    if (id === 'empty') {
      return tile;
    }
  }
}

function getSiblings(state, targetTile) {
  const { cols, rows } = state;
  const { x, y } = targetTile;

  return [{ x: x - 1, y }, { x, y: y - 1 }, { x: x + 1, y }, { x: x, y: y + 1 }].reduce(
    (result, value) => {
      return (value.x >= 0 && value.x < cols && value.y >= 0 && value.y < rows)
        ? [...result, value]
        : result;
    },
    []
  );
}

function getTileAt({ tiles }, x, y) {
  for (let [id, tile] of tiles) {
    if (tile.x === x && tile.y === y) {
      return tile;
    }
  }
}

function getCanExchange(siblings, emptyTile) {
  return siblings.some(tile => tile.x === emptyTile.x && tile.y === emptyTile.y);
}

export function move(state, targetTile) {
  const emptyTile = getEmptyTile(state);
  const siblings = getSiblings(state, targetTile);

  if (getCanExchange(siblings, emptyTile)) {
    const result = new Map(state.tiles);
    result.set('empty', targetTile);
    result.set(targetTile.id, emptyTile);
    return result;
  }

  return state.tiles;
}

export function generateTiles(cols = DEFAULT_COLS, rows = DEFAULT_ROWS) {
  const tiles = new Map();
  
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      const id = tiles.size + 1;
      if (x * y < (cols - 1) * (rows - 1)) { // skip last item
        tiles.set(id, { id, x, y });
      } else {
        tiles.set('empty', { id: 'empty', x, y });
      }
    }
  }

  return tiles;
}

export function getBoard(state) {
  return sort([...state.tiles.values()]);
}