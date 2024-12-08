import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { map, antennaLocations } = readInput();
  const antinodes = new Set<string>();

  for (const antenna of antennaLocations.keys()) {
    const locations = antennaLocations.get(antenna)!;
    for (let first = 0; first < locations.length - 1; first++) {
      for (let second = first + 1; second < locations.length; second++) {
        const [x1, y1] = locations[first];
        const [x2, y2] = locations[second];

        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);

        const possibleAntinodes = [
          [Math.min(x1, x2) - deltaX, y1 < y2 ? Math.min(y1, y2) - deltaY : Math.max(y1, y2) + deltaY],
          [Math.max(x1, x2) + deltaX, y1 > y2 ? Math.min(y1, y2) - deltaY : Math.max(y1, y2) + deltaY],
        ];

        for (const antinode of possibleAntinodes) {
          if (map[antinode[0]]?.[antinode[1]]) {
            antinodes.add(antinode.join(','));
          }
        }
      }
    }
  }

  return antinodes.size;
};

export const problem2 = () => {
  const { map, antennaLocations } = readInput();
  const antinodes = new Set<string>();

  for (const antenna of antennaLocations.keys()) {
    const locations = antennaLocations.get(antenna)!;
    for (let first = 0; first < locations.length - 1; first++) {
      for (let second = first + 1; second < locations.length; second++) {
        const [x1, y1] = locations[first];
        const [x2, y2] = locations[second];

        let deltaX = Math.abs(x1 - x2);
        let deltaY = Math.abs(y1 - y2);

        let firstFrequency = 1;
        let secondFrequency = 1;
        while (true) {
          let hasFirstAntinode = false;
          let hasSecondAntinode = false;

          const firstAntinode = [
            Math.min(x1, x2) - deltaX * firstFrequency,
            y1 < y2 ? Math.min(y1, y2) - deltaY * firstFrequency : Math.max(y1, y2) + deltaY * firstFrequency,
          ];
          if (map[firstAntinode[0]]?.[firstAntinode[1]]) {
            hasFirstAntinode = true;
            antinodes.add(firstAntinode.join(','));
          }

          const secondAntinode = [
            Math.max(x1, x2) + deltaX * secondFrequency,
            y1 > y2 ? Math.min(y1, y2) - deltaY * secondFrequency : Math.max(y1, y2) + deltaY * secondFrequency,
          ];
          if (map[secondAntinode[0]]?.[secondAntinode[1]]) {
            hasSecondAntinode = true;
            antinodes.add(secondAntinode.join(','));
          }

          if (!hasFirstAntinode && !hasSecondAntinode) {
            break;
          }

          firstFrequency++;
          secondFrequency++;
        }
      }
    }
  }

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === '.') {
        continue;
      }

      const antennaAntinode = [row, col].join(',');
      antinodes.add(antennaAntinode);
    }
  }

  return antinodes.size;
};

const readInput = () => {
  const map = fs
    .readFileSync(path.join(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map((line) => line.split(''));

  const antennaLocations = new Map<string, number[][]>();
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      const cell = map[row][col];
      if (cell === '.') {
        continue;
      }

      const location = antennaLocations.get(cell);
      if (location) {
        location.push([row, col]);
      } else {
        antennaLocations.set(cell, [[row, col]]);
      }
    }
  }

  return {
    map,
    antennaLocations,
  };
};
