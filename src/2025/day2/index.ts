import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const ranges = input.split(',').map((range) => {
    const [start, stop] = range.split('-').map(Number);
    return { start, stop };
  });

  let result = 0;
  for (const { start, stop } of ranges) {
    for (let index = start; index <= stop; index++) {
      if (isInvalid1(index)) {
        result += index;
      }
    }
  }

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const ranges = input.split(',').map((range) => {
    const [start, stop] = range.split('-').map(Number);
    return { start, stop };
  });

  let result = 0;
  for (const { start, stop } of ranges) {
    for (let index = start; index <= stop; index++) {
      if (isInvalid2(index)) {
        result += index;
      }
    }
  }

  return result;
};

const isInvalid1 = (id: number): boolean => {
  const str = id.toString();

  if (str.length % 2 !== 0) {
    return false;
  }

  return str.slice(0, str.length / 2) === str.slice(str.length / 2);
};

const isInvalid2 = (id: number): boolean => {
  const str = id.toString();

  if (str.length === 2) {
    return str[0] === str[1];
  }

  for (let index = 1; index <= str.length / 2; index++) {
    if (str.length % index !== 0) {
      continue;
    }

    const pattern = str.slice(0, index);
    const strFromPattern = Array.from({ length: str.length / index })
      .map((i) => pattern)
      .join('');

    if (str === strFromPattern) {
      return true;
    }
  }

  return false;
};
