import fs from 'fs';
import path from 'path';
import { sum } from '../../utilities/array';

type Operation = {
  operands: number[];
  operator: string;
};

export const problem1 = () => {
  const operations = parseInput();

  const result = sum(
    operations.map((operation) =>
      operation.operands.reduce(
        (x, y) => (operation.operator === '*' ? x * y : x + y),
        operation.operator === '*' ? 1 : 0
      )
    )
  );

  return result;
};

export const problem2 = () => {
  const operations = parseCephalopodInput();

  const result = sum(
    operations.map((operation) =>
      operation.operands.reduce(
        (x, y) => (operation.operator === '*' ? x * y : x + y),
        operation.operator === '*' ? 1 : 0
      )
    )
  );

  return result;
};

const parseInput = (): Operation[] => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const lines = input.split('\r\n').map((line) => line.split(' ').filter(Boolean));

  const operators: string[] = lines[lines.length - 1];
  const operands = lines.slice(0, lines.length - 1).map((line) => line.map(Number));

  const operations = operators.map((operator, index) => {
    return { operator, operands: operands.map((line) => line[index]) };
  });

  return operations;
};

const parseCephalopodInput = (): Operation[] => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const lines = input.split('\r\n');

  const operatorsWithGaps: string[] = lines[lines.length - 1].split('');
  const operandSizes: number[] = [];
  let size = 1;
  for (let index = 1; index < operatorsWithGaps.length; index++) {
    if (operatorsWithGaps[index] !== ' ') {
      operandSizes.push(size - 1);
      size = 1;
    } else {
      size++;
    }
  }
  operandSizes.push(size);

  const operators: string[] = lines[lines.length - 1].split(' ').filter(Boolean);

  const operands = lines.slice(0, lines.length - 1).map((line) => {
    const numbers = [];

    let currentIndex = 0;
    for (const size of operandSizes) {
      numbers.push(line.substring(currentIndex, currentIndex + size));
      currentIndex += size + 1;
    }

    return numbers;
  });

  const operations = operators.map((operator, operatorIndex) => {
    return {
      operator,
      operands: Array.from({ length: operandSizes[operatorIndex] }).map((_, index) => {
        const number = operands.map((line) => line[operatorIndex]).reduce((acc, prev) => acc + prev[index], '');
        return Number(number);
      }),
    };
  });

  return operations;
};
