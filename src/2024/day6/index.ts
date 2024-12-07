import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { guardPosition, map } = readInput();

  const path = findSimplePath(guardPosition, map);

  return path.size;
};

export const problem2 = () => {
  const { guardPosition, map } = readInput();

  const path = findSimplePath(guardPosition, map);

  let count = 0;

  for (const position of path) {
    const [row, col] = position.split(',').map(Number);
    map[row][col] = '#';
    const loopDetected = detectLoop(guardPosition, map);
    if (loopDetected) {
      count++;
    }
    map[row][col] = '.';
  }

  return count;
};

const readInput = () => {
  const map = fs
    .readFileSync(path.join(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map((line) => line.split(''));

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map.length; col++) {
      if (map[row][col] === '^') {
        return {
          guardPosition: [row, col],
          map,
        };
      }
    }
  }

  return { guardPosition: [0, 0], map };
};

const findSimplePath = (guardPosition: number[], map: string[][]) => {
  const directionDeltas = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visitedPositions = new Set<string>();
  let currentPosition = guardPosition.slice();
  let direction = 0;

  while (true) {
    const positionToAdd = currentPosition.join(',');
    visitedPositions.add(positionToAdd);

    const directionDelta = directionDeltas[direction];

    const nextPossiblePosition = [currentPosition[0] + directionDelta[0], currentPosition[1] + directionDelta[1]];

    if (!map[nextPossiblePosition[0]]?.[nextPossiblePosition[1]]) {
      break;
    }

    if (map[nextPossiblePosition[0]][nextPossiblePosition[1]] === '#') {
      direction = (direction + 1) % 4;
    } else {
      currentPosition = nextPossiblePosition;
    }
  }

  return visitedPositions;
};

const detectLoop = (guardPosition: number[], map: string[][]) => {
  const directionDeltas = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visitedPositions = new Set<string>();
  let currentPosition = guardPosition.slice();
  let direction = 0;

  while (true) {
    const positionToAdd = [...currentPosition, direction].join(',');
    if (visitedPositions.has(positionToAdd)) {
      return true;
    } else {
      visitedPositions.add(positionToAdd);
    }

    const directionDelta = directionDeltas[direction];

    const nextPossiblePosition = [currentPosition[0] + directionDelta[0], currentPosition[1] + directionDelta[1]];

    if (!map[nextPossiblePosition[0]]?.[nextPossiblePosition[1]]) {
      break;
    }

    if (map[nextPossiblePosition[0]][nextPossiblePosition[1]] === '#') {
      direction = (direction + 1) % 4;
    } else {
      currentPosition = nextPossiblePosition;
    }
  }

  return false;
};
