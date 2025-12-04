import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const grid = input.split('\r\n').map((line) => line.split(''));

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (isAccessible(row, column, grid)) {
        count++;
      }
    }
  }

  return count;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const grid = input.split('\r\n').map((line) => line.split(''));

  let total = 0;
  let count = 0;

  do {
    const rollsToRemove = [];
    count = 0;

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
        if (isAccessible(row, column, grid)) {
          count++;
          rollsToRemove.push([row, column]);
        }
      }
    }

    if (count > 0) {
      for (let index = 0; index < rollsToRemove.length; index++) {
        const [row, column] = rollsToRemove[index];
        grid[row][column] = '.';
      }

      total += count;
    }
  } while (count !== 0);

  return total;
};

const isAccessible = (x: number, y: number, grid: string[][]) => {
  if (grid[x][y] !== '@') {
    return false;
  }

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let count = 0;
  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (grid[newX] && grid[newX][newY] && grid[newX][newY] === '@') {
      count++;
    }

    if (count === 4) {
      return false;
    }
  }

  return true;
};
