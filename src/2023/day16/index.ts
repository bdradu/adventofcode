import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { contraption } = parseInput();

  return solve(contraption, [0, 0], 'right');
};

export const problem2 = () => {
  const { contraption } = parseInput();

  const startingPositionDirectionPairs: { start: number[]; direction: string }[] = [];

  for (let row = 0; row < contraption.length; row++) {
    startingPositionDirectionPairs.push({
      start: [row, 0],
      direction: 'right',
    });
    startingPositionDirectionPairs.push({
      start: [row, contraption.length - 1],
      direction: 'left',
    });
  }

  for (let column = 0; column < contraption[0].length; column++) {
    startingPositionDirectionPairs.push({
      start: [0, column],
      direction: 'down',
    });
    startingPositionDirectionPairs.push({
      start: [contraption.length - 1, column],
      direction: 'up',
    });
  }

  return Math.max.apply(
    null,
    startingPositionDirectionPairs.map(({ start, direction }) => solve(contraption, start, direction))
  );
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const contraption = input.split('\n').map((line) => line.split(''));

  return { contraption };
};

const solve = (grid: string[][], start: number[], direction: string): number => {
  const visitedGrid: string[][] = Array.from({ length: grid.length }).map((): string[] =>
    Array.from({ length: grid[0].length }).map(() => '.')
  );

  const beams = [{ start, direction, visited: false }];

  let index = 0;
  while (index < beams.length) {
    const visitedCells = new Set<string>();
    let { start: currentPosition, direction: currentDirection } = beams[index];

    beams[index++].visited = true;

    while (!getIsOutOfBounds(currentPosition, grid)) {
      const [row, column] = currentPosition;
      const element = grid[row][column];
      const cellIdentifier = `${row},${column},${currentDirection}`;

      // exist if we find ourselves in a loop
      // A loop can be easily identified as already having visited a cell going in the same direction.
      if (visitedCells.has(cellIdentifier)) {
        break;
      }

      visitedCells.add(cellIdentifier);
      visitedGrid[row][column] = '#';

      const directions = getNextDirections(currentDirection, element);

      // The beam is split in case multiple new directions are returned.
      // Next steps:
      //    - Enqueue a new beam with the current starting postion and the second computed direction.
      //    - Continue with the first direction
      if (directions.length > 1) {
        // We may already have the beam in the beam queue. Enqueue a new beam starting
        const beamNotInTheBeamsQueue =
          beams.filter(
            (beam) =>
              beam.direction === directions[1] &&
              beam.start[0] === currentPosition[0] &&
              beam.start[1] === currentPosition[1]
          ).length === 0;

        if (beamNotInTheBeamsQueue) {
          beams.push({ start: currentPosition, direction: directions[1], visited: false });
        }
      }

      currentDirection = directions[0];
      currentPosition = getNextPosition(currentPosition, currentDirection);
    }
  }

  return visitedGrid
    .map((line) => line.reduce((acc, curr) => (acc += curr === '.' ? 0 : 1), 0))
    .reduce((x, y) => x + y, 0);
};

const getIsOutOfBounds = (position: number[], grid: string[][]) => {
  const [row, column] = position;

  if (row < 0 || row >= grid.length) {
    return true;
  }

  if (column < 0 || column >= grid[0].length) {
    return true;
  }

  return false;
};

const getNextDirections = (currentDirection: string, currentElement: string): string[] => {
  const directionToDirectionMap: Record<string, Record<string, string[]>> = {
    '.': {
      up: ['up'],
      down: ['down'],
      left: ['left'],
      right: ['right'],
    },
    '|': {
      up: ['up'],
      down: ['down'],
      left: ['up', 'down'],
      right: ['up', 'down'],
    },
    '-': {
      up: ['left', 'right'],
      down: ['left', 'right'],
      left: ['left'],
      right: ['right'],
    },
    '/': {
      up: ['right'],
      down: ['left'],
      left: ['down'],
      right: ['up'],
    },
    '\\': {
      up: ['left'],
      down: ['right'],
      left: ['up'],
      right: ['down'],
    },
  };

  return directionToDirectionMap[currentElement][currentDirection];
};

const getNextPosition = (position: number[], direction: string): number[] => {
  const directionToPositionMap: Record<string, number[]> = {
    up: [position[0] - 1, position[1]],
    down: [position[0] + 1, position[1]],
    left: [position[0], position[1] - 1],
    right: [position[0], position[1] + 1],
  };

  return directionToPositionMap[direction];
};
