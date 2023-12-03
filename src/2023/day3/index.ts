import fs, { cp } from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const matrix = input.split("\n").map((line) => line.split(""));

  const numbers = [];

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];
    let number = 0;
    let indices: number[] = [];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex];
      let completeNumber = false;

      if (cell >= "0" && cell <= "9") {
        number = number * 10 + Number(cell);
        indices.push(columnIndex);
      } else {
        completeNumber = true;
      }

      if (columnIndex === matrix.length - 1) {
        completeNumber = true;
      }

      if (completeNumber) {
        if (number > 0) {
          numbers.push({
            number,
            row: rowIndex,
            indices,
          });
        }

        number = 0;
        indices = [];
      }
    }
  }

  return numbers
    .filter((number) => isNumberAdjacentToASymbol(number, matrix))
    .reduce((acc, curr) => acc + curr.number, 0);
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const matrix = input.split("\n").map((line) => line.split(""));

  const numbers: any[] = [];
  const possibleGears: any[] = [];

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];
    let number = 0;
    let indices: number[] = [];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex];
      let completeNumber = false;

      if (cell >= "0" && cell <= "9") {
        number = number * 10 + Number(cell);
        indices.push(columnIndex);
      } else {
        completeNumber = true;
      }

      if (columnIndex === matrix.length - 1) {
        completeNumber = true;
      }

      if (completeNumber) {
        if (number > 0) {
          numbers.push({
            number,
            row: rowIndex,
            indices,
          });
        }

        number = 0;
        indices = [];
      }

      if (cell === "*") {
        possibleGears.push({ row: rowIndex, column: columnIndex });
      }
    }
  }

  return possibleGears
    .map((possibleGear) =>
      getAdjacentNumbersToAPossibleGear(possibleGear, numbers)
    )
    .filter((list) => list.length === 2)
    .map(([number1, number2]) => number1.number * number2.number)
    .reduce((x, y) => x + y, 0);
};

const isNumberAdjacentToASymbol = (
  numberWithMetadata: any,
  matrix: string[][]
) => {
  const { number, row, indices } = numberWithMetadata as {
    number: string;
    row: number;
    indices: number[];
  };

  for (let rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
    for (
      let columnIndex = indices[0] - 1;
      columnIndex <= indices[indices.length - 1] + 1;
      columnIndex++
    ) {
      if (rowIndex < 0 || rowIndex >= matrix.length) {
        continue;
      }

      if (columnIndex < 0 || columnIndex >= matrix.length) {
        continue;
      }

      if (
        rowIndex === row &&
        columnIndex >= indices[0] &&
        columnIndex <= indices[indices.length - 1]
      ) {
        continue;
      }

      const cellValue = matrix[rowIndex][columnIndex];
      if (cellValue !== ".") {
        return true;
      }
    }
  }

  return false;
};

const getAdjacentNumbersToAPossibleGear = (possibleGear: any, numbers: any) => {
  const { row, column } = possibleGear as { row: number; column: number };
  const result: any[] = [];

  for (const number of numbers) {
    let numberIsAdjacent = false;
    for (let rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
      if (numberIsAdjacent) {
        break;
      }

      for (
        let columnIndex = column - 1;
        columnIndex <= column + 1;
        columnIndex++
      ) {
        const min = number.indices[0];
        const max = number.indices[number.indices.length - 1];

        if (
          rowIndex === number.row &&
          columnIndex >= min &&
          columnIndex <= max
        ) {
          numberIsAdjacent = true;
          break;
        }
      }
    }

    if (numberIsAdjacent) {
      result.push(number);
    }
  }

  return result;
};
