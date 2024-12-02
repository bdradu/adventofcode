import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const lines = input.split('\n').map((line) => {
    let [left, right] = line.split('   ').map(Number);
    return { left, right };
  });

  const lefts = lines.map((l) => l.left);
  const rights = lines.map((l) => l.right);

  lefts.sort();
  rights.sort();

  const result = lefts.map((left, i) => Math.abs(left - rights[i])).reduce((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const lines = input.split('\n').map((line) => {
    let [left, right] = line.split('   ').map(Number);
    return { left, right };
  });

  const lefts = lines.map((l) => l.left);
  const rights = lines.map((l) => l.right);
  const rightsMap = new Map<number, number>();

  for (const right of rights) {
    if (rightsMap.has(right)) {
      rightsMap.set(right, rightsMap.get(right)! + 1);
    } else {
      rightsMap.set(right, 1);
    }
  }

  const result = lefts.map((left) => left * (rightsMap.get(left) || 0)).reduce((x, y) => x + y, 0);

  return result;
};
