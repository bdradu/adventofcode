import fs from "fs";
import path from "path";

const computePosition = (
  [headX, headY]: [number, number],
  [tailX, tailY]: [number, number]
) => {
  const deltaX = headX - tailX;
  const deltaY = headY - tailY;
  const relativePosition = `${deltaX === 0 ? 0 : Math.abs(deltaX) / deltaX} ${
    deltaY === 0 ? 0 : Math.abs(deltaY) / deltaY
  }`;

  let resultX = tailX;
  let resultY = tailY;

  switch (relativePosition) {
    case "-1 -1":
      if (deltaX === -2 || deltaY === -2) {
        resultX = tailX - 1;
        resultY = tailY - 1;
      }
      break;
    case "-1 0":
      if (deltaX === -2) {
        resultX = tailX - 1;
      }
      break;
    case "-1 1":
      if (deltaX === -2 || deltaY === 2) {
        resultX = tailX - 1;
        resultY = tailY + 1;
      }
      break;
    case "0 -1":
      if (deltaY === -2) {
        resultY = tailY - 1;
      }
      break;
    case "0 0":
      // do nothing
      break;
    case "0 1":
      if (deltaY === 2) {
        resultY = tailY + 1;
      }
      break;
    case "1 -1":
      if (deltaX === 2 || deltaY === -2) {
        resultX = tailX + 1;
        resultY = tailY - 1;
      }
      break;
    case "1 0":
      if (deltaX === 2) {
        resultX = tailX + 1;
      }
      break;
    case "1 1":
      if (deltaX === 2 || deltaY === 2) {
        resultX = tailX + 1;
        resultY = tailY + 1;
      }
      break;
    default:
      break;
  }

  return [resultX, resultY];
};

const solution = (ropeLength: number) => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  const moves = input.split("\n").flatMap((line) => {
    const [direction, delta] = line.split(" ");
    switch (direction) {
      case "U":
        return Array.from({ length: Number(delta) }).map((_) => [-1, 0]);
      case "D":
        return Array.from({ length: Number(delta) }).map((_) => [1, 0]);
      case "L":
        return Array.from({ length: Number(delta) }).map((_) => [0, -1]);
      case "R":
        return Array.from({ length: Number(delta) }).map((_) => [0, 1]);
      default:
        return [];
    }
  });

  const visited: Record<string, number> = { "0 0": 1 };
  const rope = Array.from({ length: ropeLength }).map(
    (_) => [0, 0] as [number, number]
  );

  for (let index = 0; index < moves.length; index++) {
    const [moveX, moveY] = moves[index];

    let previous = rope[0];

    previous[0] += moveX;
    previous[1] += moveY;

    for (let i = 1; i < rope.length; i++) {
      const [newX, newY] = computePosition(rope[i - 1], rope[i]);

      rope[i][0] = newX;
      rope[i][1] = newY;
    }

    const [x, y] = rope[ropeLength - 1];

    visited[`${x} ${y}`] = (visited[`${x} ${y}`] || 0) + 1;
  }

  return Object.keys(visited).length;
};

export const problem1 = () => {
  return solution(2);
};

export const problem2 = () => {
  return solution(10);
};
