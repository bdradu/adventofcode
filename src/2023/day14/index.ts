import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { dish } = parseInput();

  return processDish(dish, 1, false);
};

export const problem2 = () => {
  const { dish } = parseInput();

  return processDish(dish, 1000000000, true);
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const dish = input.split('\n').map((line) => line.split(''));

  return { dish };
};

const calculateLoad = (dish: string[][]): number => {
  let load = 0;
  for (let row = 0; row < dish.length; row++) {
    for (let column = 0; column < dish[row].length; column++) {
      if (dish[row][column] === 'O') {
        load += dish.length - row;
      }
    }
  }

  return load;
};

const processDish = (dish: string[][], reps: number, doCycles: boolean): number => {
  if (!doCycles) {
    tiltDish(dish, 'north');
    return calculateLoad(dish);
  }

  const directions = ['north', 'west', 'south', 'east'];
  const layouts = new Map<string, { index: number; direction: string }>();
  const repetitions = reps * 4;

  let repeatingLayoutStartedAt = 0;
  let repeatingLayoutEndedAt = 0;
  let repeatingLayoutDirection = 'north';

  // find the repeating pattern
  for (let i = 0; i < repetitions; i++) {
    const direction = directions[i % 4];
    tiltDish(dish, direction);

    const dishLayout = dish.map((line) => line.join('')).join('\n');

    if (layouts.has(dishLayout)) {
      repeatingLayoutStartedAt = layouts.get(dishLayout)!.index;
      repeatingLayoutEndedAt = i;
      repeatingLayoutDirection = direction;
      break;
    }

    layouts.set(dishLayout, { index: i, direction });
  }

  const newRepetitions = (repetitions - repeatingLayoutStartedAt) % (repeatingLayoutEndedAt - repeatingLayoutStartedAt);
  const repeatingLayoutDirectionOffset = directions.indexOf(repeatingLayoutDirection);

  // continue the pattern with the next direction
  for (let i = 0; i < newRepetitions - 1; i++) {
    tiltDish(dish, directions[(i + repeatingLayoutDirectionOffset + 1) % 4]);
  }

  return calculateLoad(dish);
};

const tiltDish = (dish: string[][], direction: string) => {
  switch (direction) {
    case 'north':
      tiltDishUp(dish);
      break;
    case 'west':
      tiltDishLeft(dish);
      break;
    case 'south':
      tiltDishDown(dish);
      break;
    case 'east':
      tiltDishRight(dish);
      break;
    default:
      throw new Error('Invalid direction.');
  }
};

const tiltDishUp = (dish: string[][]) => {
  for (let column = 0; column < dish[0].length; column++) {
    for (let row = 0; row < dish.length; row++) {
      const element = dish[row][column];

      if (element === '#' || element === '.') {
        continue;
      }

      for (let i = row - 1; i >= 0; i--) {
        if (dish[i][column] === '#' || dish[i][column] === 'O') {
          break;
        }

        const temp = dish[i + 1][column];
        dish[i + 1][column] = dish[i][column];
        dish[i][column] = temp;
      }
    }
  }
};

const tiltDishLeft = (dish: string[][]) => {
  for (let row = 0; row < dish.length; row++) {
    for (let column = 0; column < dish[row].length; column++) {
      const element = dish[row][column];

      if (element === '#' || element === '.') {
        continue;
      }

      for (let i = column - 1; i >= 0; i--) {
        if (dish[row][i] === '#' || dish[row][i] === 'O') {
          break;
        }

        const temp = dish[row][i + 1];
        dish[row][i + 1] = dish[row][i];
        dish[row][i] = temp;
      }
    }
  }
};

const tiltDishDown = (dish: string[][]) => {
  for (let column = 0; column < dish[0].length; column++) {
    for (let row = dish.length - 1; row >= 0; row--) {
      const element = dish[row][column];

      if (element === '#' || element === '.') {
        continue;
      }

      for (let i = row + 1; i < dish.length; i++) {
        if (dish[i][column] === '#' || dish[i][column] === 'O') {
          break;
        }

        const temp = dish[i - 1][column];
        dish[i - 1][column] = dish[i][column];
        dish[i][column] = temp;
      }
    }
  }
};

const tiltDishRight = (dish: string[][]) => {
  for (let row = 0; row < dish.length; row++) {
    for (let column = dish[row].length - 1; column >= 0; column--) {
      const element = dish[row][column];

      if (element === '#' || element === '.') {
        continue;
      }

      for (let i = column + 1; i < dish[row].length; i++) {
        if (dish[row][i] === '#' || dish[row][i] === 'O') {
          break;
        }

        const temp = dish[row][i - 1];
        dish[row][i - 1] = dish[row][i];
        dish[row][i] = temp;
      }
    }
  }
};
