import fs from 'fs';
import path from 'path';

type Robot = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

export const problem1 = () => {
  const { width, height, robots } = readInput();

  for (let index = 0; index < 100; index++) {
    for (const robot of robots) {
      moveRobot(robot, width, height);
    }
  }

  return computeSafetyFactor(robots, width, height);
};

export const problem2 = () => {
  const { width, height, robots } = readInput();
  const upperLimit = 10000;

  for (let index = 0; index < upperLimit; index++) {
    for (const robot of robots) {
      moveRobot(robot, width, height);
    }

    for (let row = 0; row < height; row++) {
      if (countAdjacentRobotsOnSameLine(robots, row, 10)) {
        printRobots(robots, width, height);
        return index + 1;
      }
    }
  }

  // Thought process:
  // - the base of the tree will have a straight line
  // - check the first 10k iterations ( seconds ) and look robots that are adjacent on the same line
  // - start with 10 ... lucky or not this did it :D

  return -1;
};

const readInput = () => {
  const width = 101; // 11;
  const height = 103; // 7;
  const robots = fs
    .readFileSync(path.join(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map((line, index) => {
      const [[x, y], [dx, dy]] = line.split(' ').map((pair) => pair.split('=')[1].split(',').map(Number));
      return {
        id: index,
        x,
        y,
        dx,
        dy,
      };
    });

  return {
    width,
    height,
    robots,
  };
};

const printRobots = (robots: Robot[], width: number, height: number) => {
  const map: number[][][] = Array.from({ length: height }).map((_) => Array.from({ length: width }).map((_) => []));
  for (const robot of robots) {
    map[robot.y][robot.x].push(robot.id);
  }

  console.log(
    map.map((line) => line.map((values) => (values.length === 0 ? '.' : values.length.toString())).join('')).join('\n')
  );
};

const moveRobot = (robot: Robot, width: number, height: number) => {
  robot.x = robot.x + robot.dx;
  if (robot.x < 0) {
    robot.x = width + robot.x;
  }
  if (robot.x >= width) {
    robot.x = robot.x - width;
  }

  robot.y = robot.y + robot.dy;
  if (robot.y < 0) {
    robot.y = height + robot.y;
  }
  if (robot.y >= height) {
    robot.y = robot.y - height;
  }
};

const computeSafetyFactor = (robots: Robot[], width: number, height: number) => {
  const quadrants = [
    countRobots(robots, 0, 0, Math.floor(width / 2) - 1, Math.floor(height / 2) - 1),
    countRobots(robots, 0, Math.ceil(width / 2), width, Math.floor(height / 2) - 1),
    countRobots(robots, Math.ceil(height / 2), 0, Math.floor(width / 2) - 1, height),
    countRobots(robots, Math.ceil(height / 2), Math.ceil(width / 2), width, height),
  ];

  return quadrants.reduce((x, y) => x * y, 1);
};

const countRobots = (robots: Robot[], top: number, left: number, width: number, height: number) => {
  return robots.filter((robot) => robot.x >= left && robot.x <= width && robot.y >= top && robot.y <= height).length;
};

const countAdjacentRobotsOnSameLine = (robots: Robot[], lineIndex: number, lineLength: number) => {
  const robotsOnLine = robots.filter((robot) => robot.y === lineIndex).map((robot) => robot.x);

  if (robotsOnLine.length < lineLength) {
    return false;
  }

  robotsOnLine.sort((a, b) => a - b);

  let index = 0;
  let length = 0;
  while (index < robotsOnLine.length - 1) {
    index++;
    if (robotsOnLine[index] - robotsOnLine[index - 1] !== 1) {
      length = 0;
    } else {
      length++;
    }

    if (length >= lineLength) {
      return true;
    }
  }

  return false;
};
