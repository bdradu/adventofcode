import fs from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const monkeyDetails = input.split("\n\n").map((group) => {
    const [
      monkeyLine,
      startingItemsLine,
      operationLine,
      testLine,
      trueLine,
      falseLine,
    ] = group.split("\n");

    const index = Number(monkeyLine.split(" ")[1].split(":")[0]);
    const items = startingItemsLine.split(": ")[1].split(", ").map(Number);

    const operation = (x: number) =>
      eval(`(old => ${operationLine.split(" = ")[1]})(${x})`);

    const testDivisibleBy = Number(testLine.split("divisible by ")[1]);
    const throwToMonkeyIfTrue = Number(trueLine.split("monkey ")[1]);
    const throwToMonkeyIfFalse = Number(falseLine.split("monkey ")[1]);

    return {
      index,
      items,
      operation,
      testDivisibleBy,
      throwToMonkeyIfTrue,
      throwToMonkeyIfFalse,
      inspections: 0,
    };
  });

  for (let round = 0; round < 20; round++) {
    for (let monkey of monkeyDetails) {
      for (let item of monkey.items) {
        monkey.inspections++;

        const worryLevel = Math.floor(monkey.operation(item) / 3);

        if (worryLevel % monkey.testDivisibleBy === 0) {
          monkeyDetails[monkey.throwToMonkeyIfTrue].items.push(worryLevel);
        } else {
          monkeyDetails[monkey.throwToMonkeyIfFalse].items.push(worryLevel);
        }
      }

      monkey.items = [];
    }
  }

  const inspections = monkeyDetails.map((m) => m.inspections);

  inspections.sort((a, b) => b - a);

  return inspections[0] * inspections[1];
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  return 0;
};
