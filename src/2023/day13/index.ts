import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { mirrors } = parseInput();

  return mirrors.map(summarize).reduce((x, y) => x + y, 0);
};

export const problem2 = () => {
  const { mirrors } = parseInput();

  return mirrors.map(summarizeAfterChange).reduce((x, y) => x + y, 0);
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const mirrors = input.split('\n\n').map((group) => {
    const mirror = group.split('\n').map((line) => line.split(''));

    return mirror;
  });

  return { mirrors };
};

const summarize = (mirror: string[][]): number => {
  const [{ line, isVertical }] = findReflectionLines(mirror);

  return isVertical ? line : line * 100;
};

const summarizeAfterChange = (mirror: string[][]): number => {
  const [{ line, isVertical }] = findReflectionLines(mirror);

  for (let row = 0; row < mirror.length; row++) {
    for (let column = 0; column < mirror[row].length; column++) {
      mirror[row][column] = mirror[row][column] === '#' ? '.' : '#';

      const reflectionLines = findReflectionLines(mirror);

      if (reflectionLines.length === 0) {
        mirror[row][column] = mirror[row][column] === '#' ? '.' : '#';
        continue;
      }

      if (reflectionLines.length > 1) {
        const newReflectionLine = reflectionLines.find(
          (reflectionLine) => reflectionLine.line !== line || reflectionLine.isVertical !== isVertical
        )!;

        return newReflectionLine.isVertical ? newReflectionLine.line : newReflectionLine?.line * 100;
      }

      const [{ line: newLine, isVertical: newIsVertical }] = reflectionLines;

      if (line !== newLine || isVertical !== newIsVertical) {
        return newIsVertical ? newLine : newLine * 100;
      }

      mirror[row][column] = mirror[row][column] === '#' ? '.' : '#';
    }
  }

  return isVertical ? line : line * 100;
};

const findReflectionLines = (mirror: string[][]): { line: number; isVertical: Boolean }[] => {
  const { rows, columns } = findMatchingAdjacentLines(mirror);

  let rowReflectionLines = rows.filter((row) => rowIsReflectionLine(mirror, row));

  let columnReflectionLines = columns.filter((row) => columnIsReflectionLine(mirror, row));

  const reflectionLines: { line: number; isVertical: Boolean }[] = [
    ...rowReflectionLines.map((row) => ({ isVertical: false, line: row + 1 })),
    ...columnReflectionLines.map((column) => ({
      isVertical: true,
      line: column + 1,
    })),
  ];

  return reflectionLines;
};

const findMatchingAdjacentLines = (mirror: string[][]) => {
  const matchingLines: { rows: number[]; columns: number[] } = {
    rows: [],
    columns: [],
  };

  for (let row = 0; row < mirror.length - 1; row++) {
    let foundMatch = true;
    for (let column = 0; column < mirror[row].length; column++) {
      if (mirror[row][column] !== mirror[row + 1][column]) {
        foundMatch = false;
        break;
      }
    }
    if (foundMatch) {
      matchingLines.rows.push(row);
    }
  }

  for (let column = 0; column < mirror[0].length - 1; column++) {
    let foundMatch = true;
    for (let row = 0; row < mirror.length; row++) {
      if (mirror[row][column] !== mirror[row][column + 1]) {
        foundMatch = false;
        break;
      }
    }
    if (foundMatch) {
      matchingLines.columns.push(column);
    }
  }

  return matchingLines;
};

const rowIsReflectionLine = (mirror: string[][], row: number): Boolean => {
  for (let delta = 0; delta < mirror.length - row; delta++) {
    const upIndex = row - delta;
    const downIndex = row + delta + 1;

    const up = mirror[upIndex];
    const down = mirror[downIndex];

    const rowsMatch = up.every((item, i) => item === down[i]);
    if (upIndex === 0 || downIndex === mirror.length - 1) {
      return rowsMatch;
    }

    if (!rowsMatch) {
      return false;
    }
  }

  return false;
};

const columnIsReflectionLine = (mirror: string[][], column: number): Boolean => {
  for (let delta = 0; delta < mirror[0].length; delta++) {
    const leftIndex = column - delta;
    const rightIndex = column + delta + 1;

    const left = mirror.map((_, row) => mirror[row][leftIndex]);
    const right = mirror.map((_, row) => mirror[row][rightIndex]);

    const columnsMatch = left.every((item, i) => item === right[i]);
    if (leftIndex === 0 || rightIndex === mirror[0].length - 1) {
      return columnsMatch;
    }

    if (!columnsMatch) {
      return false;
    }
  }

  return false;
};
