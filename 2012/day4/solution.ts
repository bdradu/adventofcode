import fs from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const result = input
    .split("\n")
    .map((line) => {
      const [[x1, y1], [x2, y2]] = line
        .split(",")
        .map((group) => group.split("-").map(Number));

      const result = (x1 <= x2 && y1 >= y2) || (x1 >= x2 && y1 <= y2) ? 1 : 0;

      return result;
    })
    .reduce<number>((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const result = input
    .split("\n")
    .map((line) => {
      const [[x1, y1], [x2, y2]] = line
        .split(",")
        .map((group) => group.split("-").map(Number));

      const result = (x2 > y1 || y2 < x1) ? 0 : 1;

      return result;
    })
    .reduce<number>((x, y) => x + y, 0);

  return result;
};
