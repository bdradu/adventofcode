import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { grid, start, directions } = parseInput();
  const visitedPoints = walkTheMap(grid, start, directions[0]);

  return visitedPoints.length / 2;
};

export const problem2 = () => {
  const { grid, start, directions } = parseInput();
  const points = walkTheMap(grid, start, directions[0]);
  const area = getPolygonAreaFromBorderPoints(points);
  const insidePoints = getInsidePointCountFromArea(area, points);

  return insidePoints;
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const grid = input.split('\n').map((line) => line.split(''));
  let start = [0, 0];

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (grid[row][column] === 'S') {
        start = [row, column];
        break;
      }
    }
  }

  const possibleMoves: Record<string, string[]> = {
    '-1,0': ['|', 'F', '7'], // up
    '0,1': ['-', 'J', '7'], // right
    '1,0': ['|', 'J', 'L'], // down
    '0,-1': ['-', 'F', 'L'], // left
  };
  const directions: number[][] = [];

  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
      const key = `${rowOffset},${columnOffset}`;
      const move = possibleMoves[key];
      if (!move) {
        continue;
      }

      const row = start[0] + rowOffset;
      const column = start[1] + columnOffset;
      if (row < 0 || row >= grid.length || column < 0 || column >= grid[row].length) {
        continue;
      }

      if (move.includes(grid[row][column])) {
        directions.push([rowOffset, columnOffset]);
      }
    }
  }

  return {
    start,
    grid,
    directions,
  };
};

const getDirection = (direction: number[], cellValue: string): number[] => {
  if (cellValue === 'S') {
    return [0, 0];
  }

  const posibleDirections: Record<string, any[]> = {
    '|': [
      { from: [-1, 0], to: [-1, 0] },
      { from: [1, 0], to: [1, 0] },
    ],
    '-': [
      { from: [0, -1], to: [0, -1] },
      { from: [0, 1], to: [0, 1] },
    ],
    L: [
      { from: [0, -1], to: [-1, 0] },
      { from: [1, 0], to: [0, 1] },
    ],
    J: [
      { from: [0, 1], to: [-1, 0] },
      { from: [1, 0], to: [0, -1] },
    ],
    '7': [
      { from: [-1, 0], to: [0, -1] },
      { from: [0, 1], to: [1, 0] },
    ],
    F: [
      { from: [-1, 0], to: [0, 1] },
      { from: [0, -1], to: [1, 0] },
    ],
  };

  const newDirection = posibleDirections[cellValue]
    .filter(({ from }) => from[0] === direction[0] && from[1] === direction[1])
    .map(({ to }) => to)[0];

  return newDirection;
};

const walkTheMap = (grid: string[][], startingPoint: number[], direction: number[]): number[][] => {
  const points = [];
  let currentPosition = startingPoint;

  while (true) {
    const x = currentPosition[0] + direction[0];
    const y = currentPosition[1] + direction[1];

    currentPosition = [x, y];
    points.push([x, y]);

    const cellValue = grid[x][y];
    direction = getDirection(direction, cellValue);

    if (cellValue === 'S') {
      break;
    }
  }

  return points;
};

// Calculate the area of the described polygon using the shoelace formula
// https://en.wikipedia.org/wiki/Shoelace_formula
const getPolygonAreaFromBorderPoints = (points: number[][]): number => {
  let area = 0;

  for (let i = 0; i < points.length - 1; i++) {
    area += points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1];
  }
  area += points[points.length - 1][0] * points[0][1] - points[0][0] * points[points.length - 1][1];

  return Math.abs(area / 2);
};

// Derive the inside points number using Pick's theorem
// https://en.wikipedia.org/wiki/Pick's_theorem
const getInsidePointCountFromArea = (area: number, points: number[][]): number => {
  // According to the theorem:
  // A = i + b/2 - 1, where i is the number of interior points and b is the number of points on its boundary
  const insidePoints = area - points.length / 2 + 1;

  return insidePoints;
};
