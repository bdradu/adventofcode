import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const depths = fs
    .readFileSync(path.join(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map((line) => Number(line));

  let counter = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      counter++;
    }
  }

  return counter;
};

export const problem2 = () => {
  const depths = fs
    .readFileSync(path.join(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map((line) => Number(line));

  const windows = [];
  for (let i = 0; i < depths.length - 2; i += 1) {
    windows.push(depths[i] + depths[i + 1] + depths[i + 2]);
  }

  let counter = 0;
  for (let i = 1; i < windows.length; i++) {
    if (windows[i] > windows[i - 1]) {
      counter++;
    }
  }

  return counter;
};
