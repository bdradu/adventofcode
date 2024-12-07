import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const operations = readInput();

  const result = operations
    .map((operation) => {
      const { result, operands } = operation;

      for (let ops = 0; ops < Math.pow(2, operands.length - 1); ops++) {
        let opsBits = ops.toString(2).padStart(operands.length - 1, '0');
        let possibleResult = operands[0];
        for (let i = 1; i < operands.length; i++) {
          possibleResult = opsBits[i - 1] === '0' ? possibleResult + operands[i] : possibleResult * operands[i];
        }

        if (possibleResult === result) {
          return result;
        }
      }

      return 0;
    })
    .reduce((x: number, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const operations = readInput();

  const result = operations
    .map((operation) => {
      const { result, operands } = operation;

      for (let ops = 0; ops < Math.pow(3, operands.length - 1); ops++) {
        let opsBits = ops.toString(3).padStart(operands.length - 1, '0');
        let possibleResult = operands[0];
        for (let i = 1; i < operands.length; i++) {
          possibleResult = opsBits[i - 1] === '0'
            ? possibleResult + operands[i]
            : opsBits[i - 1] === '2'
              ? possibleResult * operands[i]
              : possibleResult * Math.pow(10, operands[i].toString().length) + operands[i]
              ;
        }

        if (possibleResult === result) {
          return result;
        }
      }

      return 0;
    })
    .reduce((x: number, y) => x + y, 0);

  return result;
};

const readInput = () => {
  return fs
    .readFileSync(path.join(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map((line) => {
      const [result, ops] = line.split(': ');
      return {
        result: Number(result),
        operands: ops.split(' ').map(Number),
      };
    });
};
