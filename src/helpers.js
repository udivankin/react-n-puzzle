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
  for (let tileIndex of tiles) {
    if (tiles[tileIndex] === 'empty') {
      return tiles[tileIndex];
    }
  }
}

function getSiblings(state, targetTile) {
  const { cols, rows } = state;
  const { x, y } = targetTile;
  const result = [];

  [{ x: x - 1, y }, { x, y: y - 1 }, { x: x + 1, y }, { x: x, y: y + 1 }].forEach(
    (sibling) => {
      if (sibling.x >= 0 || sibling.x < cols || sibling.y >= 0 || sibling.y < rows) {
        result.push(sibling);
      }
    }
  );

  return result;
}

function getTileAt({ tiles }, x, y) {
  for (let tileIndex of tiles) {
    if (tiles[tileIndex].x === x && tiles[tileIndex].y === y) {
      return tiles[tileIndex];
    }
  }
}

function getCanExchange(state, targetTile) {
  const emptyTyle = getEmptyTile(state);

  if (targetTile) {

  }
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