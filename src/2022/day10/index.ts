import fs from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  let x = 1;

  const result: number[] = ["noop"]
    .concat(input.split("\n"))
    .flatMap((line) => {
      const [op, value] = line.split(" ");

      if (op === "noop") {
        return [x];
      }

      if (op === "addx") {
        return [x, (x = x + Number(value))];
      }

      return [];
    });

  return [20, 60, 100, 140, 180, 220]
    .map((x) => x * result[x - 1])
    .reduce((x, y) => x + y, 0);
};

export const problem2 = () => {
  const printMatrix = (matrix: any[], rows: number, columns: number) => {
    console.log();
    for (let index = 0; index < rows; index++) {
      console.log(
        matrix.slice(index * columns, (index + 1) * columns).join("")
      );
    }
  };

  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  const rows = 6;
  const columns = 40;
  const crt = Array.from({ length: rows * columns }).map((_) => ".");

  let register = 1;
  let position = -1;

  input.split("\n").forEach((line) => {
    const [op, valueStr] = line.split(" ");
    const value = Number(valueStr);

    position++;

    if (
      register - 1 <= position % columns &&
      position % columns <= register + 1
    ) {
      crt[position] = "#";
    }

    if (op !== "addx") {
      return;
    }

    position++;

    if (
      register - 1 <= position % columns &&
      position % columns <= register + 1
    ) {
      crt[position] = "#";
    }

    register += value;
  });

  printMatrix(crt, rows, columns);
};
