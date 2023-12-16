import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { steps } = parseInput();

  return steps.map(hash).reduce((x, y) => x + y, 0);
};

export const problem2 = () => {
  const { steps } = parseInput();

  const boxes = Array.from({ length: 256 }).map(() => [] as { label: string; focalLength: number }[]);

  for (const step of steps) {
    const possibleOperations = ['=', '-'];
    let label = '';
    let operation = '';
    let focalLength = 0;

    for (const op of possibleOperations) {
      const operationIndex = step.indexOf(op);
      if (operationIndex < 0) {
        continue;
      }

      label = step.substring(0, operationIndex);
      operation = op;
      focalLength = Number(step.substring(operationIndex + 1, operationIndex + 2));
    }

    const index = hash(label);
    const labelIndex = boxes[index].findIndex((item) => item.label === label);

    if (operation === '-') {
      if (labelIndex < 0) {
        continue;
      }

      for (let i = labelIndex; i < boxes[index].length - 1; i++) {
        boxes[index][i] = boxes[index][i + 1];
      }

      boxes[index].pop();
    } else {
      if (labelIndex < 0) {
        boxes[index].push({ label, focalLength });
      } else {
        boxes[index][labelIndex].focalLength = focalLength;
      }
    }
  }

  return boxes.map(getFocusingPower).reduce((x, y) => x + y, 0);
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const steps = input.split(',');

  return { steps };
};

const hash = (step: string): number => {
  let result = 0;

  for (let i = 0; i < step.length; i++) {
    result += step.charCodeAt(i);
    result *= 17;
    result %= 256;
  }

  return result;
};

const getFocusingPower = (lenses: { label: string; focalLength: number }[], index: number): number => {
  const result = lenses.map((lens, i) => (index + 1) * (i + 1) * lens.focalLength).reduce((x, y) => x + y, 0);

  return result;
};
