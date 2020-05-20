import { atom, selector } from 'recoil';
import {
  generateTiles, shuffleBoard, getIsComlete
} from './helpers.js';

export const tilesState = atom({
  key: 'tilesState',
  default: shuffleBoard(generateTiles(4, 4)),
});

export const isCompleteState = selector({
  key: 'isCompleteState',
  get: ({ get }) => getIsComlete(get(tilesState)),
});

export const sizeState = selector({
  key: 'sizeState',
  get: ({ get }) => {
    const tiles = get(tilesState);
    const rows = tiles.length;
    const cols = tiles[0].length;
    const chips = rows * cols - 1;
    return { rows, cols, chips };
  },
});

export const sortedTilesState = selector({
  key: 'sortedTilesState',
  get: ({ get }) => {
    const tiles = get(tilesState);
    const sortedTiles = [];

    tiles.forEach((rowTiles, y) => {
      rowTiles.forEach((number, x) => {
        sortedTiles[number] = [y, x];
      });
    });

    return sortedTiles;
  },
});