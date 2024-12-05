import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const lines = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n\n');
  const { numbers, boards } = readInput(lines);

  for (const number of numbers) {
    for (let index = 0; index < boards.length; index++) {
      const board = boards[index];

      markNumberOnBoard(number, board);

      if (detectBingo(board)) {
        return (
          number *
          board.map((line) => line.filter((c) => c !== -1).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0)
        );
      }
    }
  }

  return 0;
};

export const problem2 = () => {
  const lines = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n\n');
  const { numbers, boards } = readInput(lines);
  let winningBoards = new Set<number>();

  for (const number of numbers) {
    for (let index = 0; index < boards.length; index++) {
      const board = boards[index];

      markNumberOnBoard(number, board);

      if (detectBingo(board)) {
        winningBoards.add(index);

        if (winningBoards.size === boards.length) {
          return (
            number *
            board.map((line) => line.filter((c) => c !== -1).reduce((x, y) => x + y, 0)).reduce((x, y) => x + y, 0)
          );
        }
      }
    }
  }

  return 0;
};

const readInput = (lines: string[]) => {
  const [numbers, ...boards] = lines;

  return {
    numbers: numbers.split(',').map(Number),
    boards: boards.map((board) => board.split('\n').map((line) => line.split(' ').filter(Boolean).map(Number))),
  };
};

const detectBingo = (board: number[][]) => {
  for (let index = 0; index < board.length; index++) {
    if (board[index].every((c) => c === -1)) {
      return true;
    }
    if (board.map((line) => line[index]).every((c) => c === -1)) {
      return true;
    }
  }

  return false;
};

const markNumberOnBoard = (number: number, board: number[][]) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const element = board[row][col];
      if (board[row][col] === number) {
        board[row][col] = -1;
        return;
      }
    }
  }
};
