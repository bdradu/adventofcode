import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const lines = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n');

  return lines
    .map((line) => {
      const memoryText = line
        .replaceAll(/\\\\/g, 'Z')
        .replaceAll(/\\"/g, 'Z')
        .replaceAll(/\\x.{2}/g, 'Z')
        .replaceAll(/"/g, '');

      const codeLength = line.length;
      const memoryLength = memoryText.length;

      return codeLength - memoryLength;
    })
    .reduce((x, y) => x + y, 0);
};

export const problem2 = () => {
  const lines = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n');

  return lines
    .map((line) => {
      const memoryText = '"' + line.replaceAll(/\\/g, '\\\\').replaceAll(/"/g, '\\"') + '"';

      const codeLength = line.length;
      const memoryLength = memoryText.length;

      return memoryLength - codeLength;
    })
    .reduce((x, y) => x + y, 0);
};
