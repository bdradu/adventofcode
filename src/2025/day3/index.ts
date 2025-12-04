import fs from 'fs';
import path from 'path';
import { sum } from '../../utilities/array';

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const banks = input.split('\r\n').map((line) => line.split('').map(Number));
  const result = sum(banks.map((bank) => findMaximums(bank, 2).reduce((x, y) => x * 10 + y, 0)));

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const banks = input.split('\r\n').map((line) => line.split('').map(Number));
  const result = sum(banks.map((bank) => findMaximums(bank, 12).reduce((x, y) => x * 10 + y, 0)));

  return result;
};

const findMaximums = (numbers: number[], count: number): number[] => {
  const maximums = [];

  for (let index = count; index > 0; index--) {
    const max = Math.max.apply(null, numbers.slice(0, numbers.length - index + 1));
    const maxIndex = numbers.indexOf(max);
    numbers = numbers.slice(maxIndex + 1);
    maximums.push(max);
  }

  return maximums;
};
