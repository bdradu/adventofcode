import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const result = input
    .split('\n')
    .map((line) => {
      let levels = line.split(' ').map(Number);
      return isReportSafe(levels) ? 1 : (0 as number);
    })
    .reduce((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const result = input
    .split('\n')
    .map((line) => {
      let levels = line.split(' ').map(Number);

      let isSafe = isReportSafe(levels);
      if (isSafe) {
        return 1;
      }

      for (let index = 0; index < levels.length; index++) {
        const newLevels = levels.slice();
        newLevels.splice(index, 1);
        if (isReportSafe(newLevels)) {
          return 1;
        }
      }

      return 0;
    })
    .reduce((x: number, y: number) => x + y, 0);

  return result;
};

const isReportSafe = (levels: number[]): boolean => {
  const correction = levels[0] > levels[1] ? 1 : -1;

  for (let index = 0; index < levels.length - 1; index++) {
    const diff = (levels[index] - levels[index + 1]) * correction;
    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
};
