import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { rows } = parseInput(1);

  return rows.map(({ springs, damaged }) => solve(springs, damaged)).reduce((x, y) => x + y, 0);
};

export const problem2 = () => {
  const { rows } = parseInput(5);

  return rows.map(({ springs, damaged }) => solve(springs, damaged)).reduce((x, y) => x + y, 0);
};

const parseInput = (repetitions: number) => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
  const rows = input.split('\n').map((line) => {
    const [springsText, damagedText] = line.split(' ');
    const springs = Array.from({ length: repetitions })
      .map(() => springsText)
      .join('?');
    const damaged = Array.from({ length: repetitions })
      .map(() => damagedText)
      .join(',')
      .split(',')
      .map(Number);

    return { springs, damaged };
  });

  return { rows };
};

const memoizationCache = new Map<string, number>();
const solve = (springs: string, damaged: number[]): number => {
  const runIndentifier = `${springs}-${damaged.join(',')}`;
  if (memoizationCache.has(runIndentifier)) {
    return memoizationCache.get(runIndentifier)!;
  }

  if (springs.length === 0) {
    return damaged.length === 0 ? 1 : 0;
  }

  if (damaged.length === 0) {
    return springs.indexOf('#') < 0 ? 1 : 0;
  }

  const first = springs[0];
  const rest = springs.substring(1);

  if (first === '.') {
    const result = solve(rest, damaged);
    memoizationCache.set(runIndentifier, result);
    return result;
  }

  if (first === '?') {
    const result = solve(`#${rest}`, damaged) + solve(`.${rest}`, damaged);
    memoizationCache.set(runIndentifier, result);
    return result;
  }

  if (first === '#') {
    const [currentDamage, ...damagedRest] = damaged;

    if (
      currentDamage <= springs.length &&
      springs
        .substring(0, currentDamage)
        .split('')
        .every((c) => c !== '.') &&
      springs[currentDamage] !== '#'
    ) {
      const result = solve(springs.substring(currentDamage + 1), damagedRest);
      memoizationCache.set(runIndentifier, result);
      return result;
    }

    return 0;
  }

  return 0;
};
