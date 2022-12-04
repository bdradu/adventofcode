import fs from "fs";
import path from "path";

/* Rock Paper Scissors
A ----> Rock
B ----> Paper
C ----> Scissors

X ----> Rock
Y ----> Paper
Z ----> Scissors

Rock: 1
Paper: 2
Scissors: 3

Loss: 0
Draw: 3
Win: 6
*/

const points: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

export const problem1 = () => {
  const input = fs
    .readFileSync(path.join(__dirname, "./input.txt"))
    .toString();

  const scores: Record<string, number> = {
    "A X": 3,
    "A Y": 6,
    "A Z": 0,

    "B X": 0,
    "B Y": 3,
    "B Z": 6,

    "C X": 6,
    "C Y": 0,
    "C Z": 3,
  };

  const result = input
    .split("\n")
    .reduce(
      (x: number, y: string) => x + scores[y] + points[y.split(" ")[1]],
      0
    );

  return result;
};

export const problem2 = () => {
  const input = fs
    .readFileSync(path.join(__dirname, "./input.txt"))
    .toString();

  const scores: Record<string, number> = {
    "A X": 0 + 3,
    "A Y": 3 + 1,
    "A Z": 6 + 2,

    "B X": 0 + 1,
    "B Y": 3 + 2,
    "B Z": 6 + 3,

    "C X": 0 + 2,
    "C Y": 3 + 3,
    "C Z": 6 + 1,
  };

  const result = input
    .split("\n")
    .reduce((x: number, y: string) => x + scores[y], 0);

  return result;
};
