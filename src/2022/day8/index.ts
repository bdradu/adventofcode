import fs from "fs";
import path from "path";

const isNumberGreaterThanElementsInArray = (n: number, array: number[]) => {
  return n > Math.max.apply(null, array);
};

const getViewingDistance = (n: number, array: number[]) => {
  let result = 0;

  for (let index = 0; index < array.length; index++) {
    if (array[index] <= n) {
      result++;
    }

    if (array[index] === n) {
      break;
    }
  }

  return result;
};

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  const lines = input.split("\n").map((line) => line.split("").map(Number));

  let result = 2 * lines[0].length + 2 * (lines.length - 2);

  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      const n = lines[i][j];
      // check up
      const up = lines
        .map((line, index) => (index < i ? line[j] : -1))
        .filter((x) => x > -1);
      if (isNumberGreaterThanElementsInArray(n, up)) {
        result++;
        continue;
      }

      // check down
      const down = lines
        .map((line, index) => (index > i ? line[j] : -1))
        .filter((x) => x > -1);
      if (isNumberGreaterThanElementsInArray(n, down)) {
        result++;
        continue;
      }

      // check left
      const left = lines[i].slice(0, j);
      if (isNumberGreaterThanElementsInArray(n, left)) {
        result++;
        continue;
      }

      // check right
      const right = lines[i].slice(j + 1);
      if (isNumberGreaterThanElementsInArray(n, right)) {
        result++;
        continue;
      }
    }
  }

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  const lines = input.split("\n").map((line) => line.split("").map(Number));

  let result = 0;

  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      const n = lines[i][j];

      // check up
      const up = lines
        .map((line, index) => (index < i ? line[j] : -1))
        .filter((x) => x > -1)
        .reverse();
      const distanceUp = getViewingDistance(n, up);

      // check down
      const down = lines
        .map((line, index) => (index > i ? line[j] : -1))
        .filter((x) => x > -1);
      const distanceDown = getViewingDistance(n, down);

      // check left
      const left = lines[i].slice(0, j).reverse();
      const distanceLeft = getViewingDistance(n, left);

      // check right
      const right = lines[i].slice(j + 1);
      const distanceRight = getViewingDistance(n, right);

      const scenicScore =
        distanceUp * distanceDown * distanceLeft * distanceRight;

      if (scenicScore > result) {
        result = scenicScore;
      }
    }
  }

  return result;
};
