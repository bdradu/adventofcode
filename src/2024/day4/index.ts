import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const wordSearch = input.split('\n').map((line) => line.split(''));
  const wordToFind = 'XMAS';
  const directions = getPossibleDirectionsForXmas(wordToFind.length);
  let occurences = 0;

  for (let row = 0; row < wordSearch.length; row++) {
    for (let col = 0; col < wordSearch[row].length; col++) {
      const letter = wordSearch[row][col];
      if (letter !== wordToFind[0]) {
        continue;
      }

      for (const direction of directions) {
        let found = true;
        for (let i = 1; i < direction.length; i++) {
          const dr = row + direction[i][0];
          const dc = col + direction[i][1];

          if (dr < 0 || dr >= wordSearch.length) {
            found = false;
            break;
          }

          if (dc < 0 || dc >= wordSearch[0].length) {
            found = false;
            break;
          }

          if (wordToFind[i] !== wordSearch[dr][dc]) {
            found = false;
            break;
          }
        }

        if (found) {
          occurences++;
        }
      }
    }
  }

  return occurences;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

  const wordSearch = input.split('\n').map((line) => line.split(''));
  const wordToFind = 'MAS';
  const directions = getPossibleDirections(wordToFind.length);
  let occurences = 0;

  for (let row = 0; row < wordSearch.length; row++) {
    for (let col = 0; col < wordSearch[row].length; col++) {
      const letter = wordSearch[row][col];
      if (letter !== wordToFind[1]) {
        continue;
      }

      let localOccurences = 0;
      for (const direction of directions) {
        let found = true;
        for (let i = 0; i < direction.length; i++) {
          const dr = row + direction[i][0];
          const dc = col + direction[i][1];

          if (dr < 0 || dr >= wordSearch.length) {
            found = false;
            break;
          }

          if (dc < 0 || dc >= wordSearch[0].length) {
            found = false;
            break;
          }

          if (wordToFind[i] !== wordSearch[dr][dc]) {
            found = false;
            break;
          }
        }

        if (found) {
          localOccurences++;
        }
      }

      if (localOccurences == 2) {
        occurences++;
      }
    }
  }

  return occurences;
};

const getPossibleDirectionsForXmas = (count: number) => {
  const rowRightToLeft = [];
  const rowLeftToRight = [];
  const colDownToUp = [];
  const colUpToDown = [];
  const diagUpRightToLeft = [];
  const diagUpLeftToRight = [];
  const diagDownLeftToRight = [];
  const diagDownRightToLeft = [];

  for (let i = 0; i < count; i++) {
    rowRightToLeft.push([-i, 0]);
    rowLeftToRight.push([i, 0]);
    colDownToUp.push([0, i]);
    colUpToDown.push([0, -i]);
    diagUpRightToLeft.push([-i, -i]);
    diagUpLeftToRight.push([i, -i]);
    diagDownLeftToRight.push([i, i]);
    diagDownRightToLeft.push([-i, i]);
  }

  return [
    rowRightToLeft,
    rowLeftToRight,
    colDownToUp,
    colUpToDown,
    diagUpRightToLeft,
    diagUpLeftToRight,
    diagDownLeftToRight,
    diagDownRightToLeft,
  ];
};

const getPossibleDirections = (count: number) => {
  const diagUpRightToLeft = [];
  const diagUpLeftToRight = [];
  const diagDownLeftToRight = [];
  const diagDownRightToLeft = [];

  const from = Math.round(-count / 2);
  const to = Math.round(count / 2);

  for (let i = from; i < to; i++) {
    diagUpRightToLeft.push([-i, -i]);
    diagUpLeftToRight.push([i, -i]);
    diagDownLeftToRight.push([i, i]);
    diagDownRightToLeft.push([-i, i]);
  }

  return [diagUpRightToLeft, diagUpLeftToRight, diagDownLeftToRight, diagDownRightToLeft];
};
