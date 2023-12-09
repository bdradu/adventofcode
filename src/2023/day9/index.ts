import fs from "fs";
import path from "path";

export const problem1 = () => {
  const [...histories] = parseInput();

  return histories.map(computeNextValue).reduce((x, y) => x + y, 0);
};

export const problem2 = () => {
  const [...histories] = parseInput();

  return histories.map(computePreviousValue).reduce((x, y) => x + y, 0);
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  return input.split("\n").map((line) => line.split(" ").map(Number));
};

const computeNextValue = (history: number[]): number => {
  if (history.every((item) => item === 0)) {
    return 0;
  }

  const newHistory: number[] = [];
  for (let i = 0; i < history.length - 1; i++) {
    newHistory.push(history[i + 1] - history[i]);
  }

  const nextValue = computeNextValue(newHistory);

  return history[history.length - 1] + nextValue;
};

const computePreviousValue = (history: number[]): number => {
  if (history.every((item) => item === 0)) {
    return 0;
  }

  const newHistory: number[] = [];
  for (let i = 0; i < history.length - 1; i++) {
    newHistory.push(history[i + 1] - history[i]);
  }

  const previousValue = computePreviousValue(newHistory);

  return history[0] - previousValue;
};
