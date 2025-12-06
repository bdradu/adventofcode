import fs from 'fs';
import path from 'path';
import { sum } from '../../utilities/array';

type Range = {
  left: number;
  right: number;
};

export const problem1 = () => {
  const { ranges, ingridients } = parseInput();

  const result = sum(
    ingridients.map((ingridient) => {
      for (const range of ranges) {
        if (range.left <= ingridient && ingridient <= range.right) {
          return 1;
        }
      }
      return 0;
    })
  );

  return result;
};

export const problem2 = () => {
  let { ranges } = parseInput();
  let rangeMap = ranges;

  do {
    ranges = rangeMap;
    rangeMap = [ranges[0]];

    for (let index = 1; index < ranges.length; index++) {
      let rangeWasMerged = false;
      for (const range of rangeMap) {
        if (detectIfRangesOverlap(ranges[index], range)) {
          const newRange = mergeRanges(ranges[index], range);
          range.left = newRange.left;
          range.right = newRange.right;
          rangeWasMerged = true;
          break;
        }
      }

      if (!rangeWasMerged) {
        rangeMap.push(ranges[index]);
      }
    }
  } while (rangeMap.length !== ranges.length);

  return sum(rangeMap.map((range) => range.right - range.left + 1));
};

const parseInput = (): { ranges: Range[]; ingridients: number[] } => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const groups = input.split('\r\n\r\n').map((group) => group.split('\r\n'));

  const ranges = groups[0].map((line) => {
    const limits = line.split('-').map(Number);
    return { left: limits[0], right: limits[1] };
  });
  const ingridients = groups[1].map(Number);

  return { ranges, ingridients };
};

const detectIfRangesOverlap = (first: Range, second: Range): boolean => {
  const { left: l1, right: r1 } = first;
  const { left: l2, right: r2 } = second;

  if (r1 < l2) {
    return false;
  }

  if (r2 < l1) {
    return false;
  }

  return true;
};

const mergeRanges = (first: Range, second: Range): Range => {
  const { left: l1, right: r1 } = first;
  const { left: l2, right: r2 } = second;

  let left = Math.min(l1, l2);
  let right = Math.max(r1, r2);

  return { left, right };
};
