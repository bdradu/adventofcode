import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const moves = input.split('\n').map((line) => {
    const [direction, length] = [line[0], Number(line.slice(1))];
    return { direction, length };
  });

  let result = 0;
  let position = 50;

  for (const { direction, length } of moves) {
    const size = length % 100;

    if (direction === 'L') {
      position -= size;
    } else {
      position += size;
    }

    if (position < 0) {
      position += 100;
    }

    if (position >= 100) {
      position -= 100;
    }

    if (position === 0) {
      result++;
    }
  }

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const moves = input.split('\n').map((line) => {
    const [direction, length] = [line[0], Number(line.slice(1))];
    return { direction, length };
  });

  let result = 0;
  let position = 50;

  for (const { direction, length } of moves) {
    const fullRotations = Math.floor(length / 100);
    result += fullRotations;

    const size = length % 100;
    let newPosition = position;

    if (direction === 'L') {
      newPosition = position - size;
      if (newPosition < 0) {
        newPosition += 100;

        if (position !== 0) {
          result++;
        }
      }

      if (newPosition === 0) {
        result++;
      }
    } else {
      newPosition = position + size;
      if (newPosition > 99) {
        newPosition -= 100;

        if (position !== 0) {
          result++;
        }
      }
    }

    position = newPosition;
  }

  return result;
};
