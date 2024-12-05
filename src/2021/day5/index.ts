import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const map = readInput();
  const result = map.flatMap((line) => line).filter((p) => p >= 2).length;

  return result;
};

export const problem2 = () => {
  const map = readInput(false);
  const result = map.flatMap((line) => line).filter((p) => p >= 2).length;

  return result;
};

const readInput = (ignoreDiagonalLines = true) => {
  const lines = fs
    .readFileSync(path.join(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map((line) => {
      return line.split(' -> ').map((pos) => pos.split(',').map(Number));
    });
  const rowCount = Math.max(...lines.flatMap(([from, to]) => [from[0], to[0]])) + 1;
  const colCount = Math.max(...lines.flatMap(([from, to]) => [from[1], to[1]])) + 1;
  const map = Array.from({ length: rowCount }).map((_) => Array.from({ length: colCount }).map((_) => 0));

  for (const line of lines) {
    const [[X1, Y1], [X2, Y2]] = line;
    if (ignoreDiagonalLines && X1 !== X2 && Y1 !== Y2) {
      continue;
    }

    if (X1 === X2) {
      for (let i = Math.min(Y1, Y2); i <= Math.max(Y1, Y2); i++) {
        map[X1][i] += 1;
      }

      continue;
    }

    if (Y1 === Y2) {
      for (let i = Math.min(X1, X2); i <= Math.max(X1, X2); i++) {
        map[i][Y1] += 1;
      }

      continue;
    }

    const stepX = X1 < X2 ? 1 : -1;
    const stepY = Y1 < Y2 ? 1 : -1;
    let [curX, endX] = [X1, X2];
    let curY = Y1;

    map[curX][curY] += 1;

    while (curX !== endX) {
      curX += stepX;
      curY += stepY;

      map[curX][curY] += 1;
    }
  }

  return map;
};
