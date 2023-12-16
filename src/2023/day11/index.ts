import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { universe, emptyRows, emptyColumns } = parseInput();

  return findDistances(universe, emptyRows, emptyColumns, 1).reduce((x, y) => x + y, 0);
};

export const problem2 = () => {
  const { universe, emptyRows, emptyColumns } = parseInput();

  return findDistances(universe, emptyRows, emptyColumns, 999999).reduce((x, y) => x + y, 0);
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const universe = input.split('\n').map((line) => line.split(''));

  const emptyRows: number[] = [];
  const emptyColumns: number[] = [];

  for (let i = 0; i < universe.length; i++) {
    const row = universe[i];
    if (row.every((cell) => cell === '.')) {
      emptyRows.push(i);
    }

    const column = universe.map((line) => line[i]);
    if (column.every((cell) => cell === '.')) {
      emptyColumns.push(i);
    }
  }

  return { universe, emptyRows, emptyColumns };
};

const findDistances = (universe: string[][], emptyRows: number[], emptyColumns: number[], expansionSize: number) => {
  const result: number[] = [];
  const galaxies: number[][] = [];

  for (let row = 0; row < universe.length; row++) {
    for (let column = 0; column < universe[row].length; column++) {
      if (universe[row][column] === '#') {
        const rowIndex = row + emptyRows.filter((r) => r < row).length * expansionSize;
        const columnIndex = column + emptyColumns.filter((c) => c < column).length * expansionSize;
        galaxies.push([rowIndex, columnIndex]);
      }
    }
  }

  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [x0, y0] = galaxies[i];
      const [x1, y1] = galaxies[j];

      const distance = Math.abs(x0 - x1) + Math.abs(y0 - y1);

      result.push(distance);
    }
  }

  return result;
};
