import fs from "fs";
import path from "path";

const priority = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const problem1 = () => {
  const input = fs
    .readFileSync(path.join(__dirname, "./input.txt"))
    .toString();

  const result = input
    .split("\n")
    .map((line) => {
      const fh = line.substring(0, line.length / 2);
      const sh = line.substring(line.length / 2);

      for (let i = 0; i < fh.length; i++) {
        if (sh.indexOf(fh[i]) >= 0) {
          return priority.indexOf(fh[i]);
        }
      }

      return 0;
    })
    .reduce((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const input = fs
    .readFileSync(path.join(__dirname, "./input.txt"))
    .toString();

  const lines = input.split("\n");
  const groups: string[][] = [];

  for (let i = 0; i < lines.length; i += 3) {
    groups.push(lines.slice(i, i + 3));
  }

  const result = groups
    .map((group) => {
      for (let i = 0; i < group[0].length; i++) {
        const element = group[0][i];
        if (group[1].indexOf(element) >= 0 && group[2].indexOf(element)>=0) {
          return priority.indexOf(element);
        }
      }

      return 0;
    })
    .reduce((x, y) => x + y, 0);

  return result;
};
