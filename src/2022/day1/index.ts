import fs from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const results = input.split("\n\n").map((lines) =>
    lines
      .split("\n")
      .map((line) => Number(line))
      .reduce((x, y) => x + y, 0)
  );

  results.sort((a, b) => b - a);

  return results[0];
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const results = input.split("\n\n").map((lines) =>
    lines
      .split("\n")
      .map((line) => Number(line))
      .reduce((x, y) => x + y, 0)
  );

  results.sort((a, b) => b - a);

  return results[0] + results[1] + results[2];
};
