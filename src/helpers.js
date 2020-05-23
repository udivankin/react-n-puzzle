export function clone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export function sequence(a, b) {
  return Array.from({ length: Math.abs(a - b) }, (v, k) => a + (k * (a > b ? -1 : 1)));
}

export function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function find(arr, n) {
  const row = arr.findIndex(row => row.indexOf(n) > -1);
  const col = arr[row].indexOf(n);

  return [row, col];
}

export function move(tiles, targetTile) {
  const [emptyTileRow, emptyTileCol] = find(tiles, 0);
  const [targetTileRow, targetTileCol] = find(tiles, targetTile);
  let moves = 0;

  if (emptyTileRow !== targetTileRow && emptyTileCol !== targetTileCol) return [tiles, moves];

  if (emptyTileRow === targetTileRow) {
    const direction = emptyTileCol < targetTileCol ? 1 : -1;
    sequence(emptyTileCol, targetTileCol).forEach((col) => {
      [tiles[emptyTileRow][col], tiles[emptyTileRow][col + direction]] = [tiles[emptyTileRow][col + direction], tiles[emptyTileRow][col]];
      moves += 1;
    });
  } else {
    const direction = emptyTileRow < targetTileRow ? 1 : -1;
    sequence(emptyTileRow, targetTileRow).forEach((row) => {
      [tiles[row][emptyTileCol], tiles[row + direction][emptyTileCol]] = [tiles[row + direction][emptyTileCol], tiles[row][emptyTileCol]];
      moves += 1;
    });
  }

  return [tiles, moves];
}

export function randomMove(tiles, direction = Math.round(Math.random())) {
  const [emptyTileRow, emptyTileCol] = find(tiles, 0);
  let randomTile = direction === 0
    ? random(tiles[emptyTileRow].filter(n => n !== 0))
    : random(tiles.map((row) => row[emptyTileCol]).filter(Boolean));

  return move(tiles, randomTile);
}

export function generateTiles(rows, cols) {
  const tiles = [];
  
  for (let y = 0; y < rows; y++) {
    tiles.push(Array.from({ length: cols }, (v, k) => k + cols * y + 1));
  }

  tiles[rows-1][cols-1] = 0;

  return tiles;
}

export function shuffleBoard(tiles) {
  for (let i = 0; i < tiles.length * tiles[0].length ** 2; i++) {
    randomMove(tiles);
  }

  return getIsComlete(tiles) ? randomMove(tiles)[0] : tiles;
}

export function getIsComlete(tiles, rows = tiles.length, cols = tiles[0].length) {
  for (let y = 0, i = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      i++;
      if (tiles[y][x] === 0 && i === rows * cols) return true;
      if (tiles[y][x] !== i) return false;
    }
  }

  return true;
}

export const getTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(c => String(c).padStart(2, '0')).join(':');
}
