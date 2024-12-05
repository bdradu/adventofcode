import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const lines = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n');
  const position = [0, 0];

  for (let i = 0; i < lines.length; i++) {
    const [direction, delta] = lines[i].split(' ');

    switch (direction) {
      case 'forward':
        position[0] += Number(delta);
        break;
      case 'down':
        position[1] += Number(delta);
        break;
      case 'up':
        position[1] -= Number(delta);
        break;
    }
  }

  return position[0] * position[1];
};

export const problem2 = () => {
  const lines = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n');
  const position = [0, 0, 0];

  for (let i = 0; i < lines.length; i++) {
    const [direction, delta] = lines[i].split(' ');

    switch (direction) {
      case 'forward':
        position[0] += Number(delta);
        position[1] += position[2] * Number(delta);
        break;
      case 'down':
        position[2] += Number(delta);
        break;
      case 'up':
        position[2] -= Number(delta);
        break;
    }
  }

  return position[0] * position[1];
};
