import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  const matches = input.matchAll(regex);
  const result = [...matches].map((match) => Number(match[1]) * Number(match[2])).reduce((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  const result = input
    .split('do()')
    .map((section) => {
      const [doSection] = section.split("don't()");
      const matches = doSection.matchAll(regex);
      return [...matches].map((match) => Number(match[1]) * Number(match[2])).reduce((x, y) => x + y, 0);
    })
    .reduce((x, y) => x + y, 0);

  return result;
};
