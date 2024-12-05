import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const lines = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n');

  let gamma = '';
  let epsilon = '';

  for (let col = 0; col < lines[0].length; col++) {
    const line = lines.map((line) => line[col]);

    if (compareBitOneOccurences(line) > 0) {
      gamma += '1';
      epsilon += '0';
    } else {
      gamma += '0';
      epsilon += '1';
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

export const problem2 = () => {
  const lines = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n');

  let oxygenNumbers = lines.slice();
  for (let col = 0; col < oxygenNumbers[0].length; col++) {
    const line = oxygenNumbers.map((line) => line[col]);
    const comparisonResult = compareBitOneOccurences(line);
    oxygenNumbers = oxygenNumbers.filter((number) => number[col] === (comparisonResult >= 0 ? '1' : '0'));

    if (oxygenNumbers.length === 1) {
      break;
    }
  }

  let co2Numbers = lines.slice();
  for (let col = 0; col < co2Numbers[0].length; col++) {
    const line = co2Numbers.map((line) => line[col]);
    const comparisonResult = compareBitOneOccurences(line);
    co2Numbers = co2Numbers.filter((number) => number[col] === (comparisonResult >= 0 ? '0' : '1'));

    if (co2Numbers.length === 1) {
      break;
    }
  }

  return parseInt(oxygenNumbers[0], 2) * parseInt(co2Numbers[0], 2);
};

const compareBitOneOccurences = (array: string[]) => {
  const occurences = array.filter((el) => el === '1').length;

  if (occurences === array.length / 2) {
    return 0;
  }

  return occurences > array.length / 2 ? 1 : -1;
};
