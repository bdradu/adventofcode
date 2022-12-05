import fs from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const [inputArray, inputMoves] = input
    .split("\n\n")
    .map((group) => group.split("\n"));

  inputArray.pop(); // remove the stack numbers from processing

  const inputStacks = inputArray.reverse();

  const stacks: string[][] = [];

  for (let i = 0; i < inputStacks.length; i++) {
    for (let j = 0; j < inputStacks[i].length; j += 4) {
      const crate = inputStacks[i].substring(j, j + 4).trim();

      if (!crate) {
        continue;
      }

      if (stacks[j / 4]) {
        stacks[j / 4].push(crate);
      } else {
        stacks[j / 4] = [crate];
      }
    }
  }

  const regexp = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;
  const moves = inputMoves.map((line) => {
    const match = line.match(regexp) || [];
    return {
      count: Number(match[1]),
      from: Number(match[2]),
      to: Number(match[3]),
    };
  });

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];

    for (let index = 0; index < move.count; index++) {
      const popped = stacks[move.from - 1].pop() || "";
      stacks[move.to - 1].push(popped);
    }
  }

  return stacks
    .map((stack) => stack[stack.length - 1])
    .join("")
    .replace(/\[*\]*/g, "");
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const [inputArray, inputMoves] = input
    .split("\n\n")
    .map((group) => group.split("\n"));

  inputArray.pop(); // remove the stack numbers from processing

  const inputStacks = inputArray.reverse();

  const stacks: string[][] = [];

  for (let i = 0; i < inputStacks.length; i++) {
    for (let j = 0; j < inputStacks[i].length; j += 4) {
      const crate = inputStacks[i].substring(j, j + 4).trim();

      if (!crate) {
        continue;
      }

      if (stacks[j / 4]) {
        stacks[j / 4].push(crate);
      } else {
        stacks[j / 4] = [crate];
      }
    }
  }

  const regexp = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;
  const moves = inputMoves.map((line) => {
    const match = line.match(regexp) || [];
    return {
      count: Number(match[1]),
      from: Number(match[2]),
      to: Number(match[3]),
    };
  });

  for (const move of moves) {
    const cratesToMove = stacks[move.from - 1].splice(
      stacks[move.from - 1].length - move.count,
      move.count
    );

    stacks[move.to - 1] = stacks[move.to - 1].concat(cratesToMove);
  }

  return stacks
    .map((stack) => stack[stack.length - 1])
    .join("")
    .replace(/\[*\]*/g, "");
};
