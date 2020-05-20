export function clone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function find(arr, n) {
  const row = arr.findIndex(row => row.indexOf(n) > -1);
  const col = arr[row].indexOf(n);

  return [row, col];
}

export function getSiblings(tiles, n) {
  const siblings = [];
  const [row, col] = find(tiles, n);
  if (row > 0) siblings.push(tiles[row - 1][col]);
  if (row < tiles.length - 1) siblings.push(tiles[row + 1][col]);
  if (col > 0) siblings.push(tiles[row][col - 1]);
  if (col < tiles[0].length - 1) siblings.push(tiles[row][col + 1]);
  return siblings;
}

export function move(tiles, targetTile) {
  const [emptyTileRow, emptyTileCol] = find(tiles, 0);
  const [targetTileRow, targetTileCol] = find(tiles, targetTile);

  if (Math.abs(emptyTileRow - targetTileRow) + Math.abs(emptyTileCol - targetTileCol) === 1) {
    tiles[emptyTileRow][emptyTileCol] = targetTile;
    tiles[targetTileRow][targetTileCol] = 0;
  }

  return tiles;
}

export function randomMove(tiles) {
  return move(tiles, random(getSiblings(tiles, 0)));
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

  return tiles;
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