import fs from 'fs';
import path from 'path';
import { groupBy, mul, sum } from '../../utilities/array';

export const problem1 = () => {
  const garden = readInput();
  const regions = getGardenRegions(garden);
  let price = 0;
  for (const region of regions.values()) {
    const { area, perimeter } = getRegionDimensions(region);
    price += area * perimeter;
  }
  return price;
};

export const problem2 = () => {
  const garden = readInput();
  const regions = getGardenRegions(garden);

  let price = 0;

  for (const region of regions.values()) {
    const { area, sides } = getRegionDimensions(region);
    price += area * sides;
  }

  return price;
};

const readInput = () => {
  const garden = fs
    .readFileSync(path.join(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map((line) => line.split(''));

  return garden;
};

const findNeighbours = (plot: number[], map: string[][]) => {
  const [plotRow, plotCol] = plot;
  const neighbours = [];
  const neighboursDelta = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let index = 0; index < neighboursDelta.length; index++) {
    const row = plotRow + neighboursDelta[index][0];
    const col = plotCol + neighboursDelta[index][1];

    if (map[row]?.[col] === map[plotRow][plotCol]) {
      neighbours.push([row, col]);
    }
  }

  return neighbours;
};

const getRegion = (start: number[], map: string[][]) => {
  const region: number[][] = [];
  let currentPlot = start.slice();
  const neighboursToVisit: number[][] = [];

  while (currentPlot) {
    region.push(currentPlot.slice());

    const newNeighboursToVisit = findNeighbours(currentPlot, map).filter(
      (neighbouringPlot) =>
        region.findIndex((plot) => plot[0] === neighbouringPlot[0] && plot[1] === neighbouringPlot[1]) < 0 &&
        neighboursToVisit.findIndex((plot) => plot[0] === neighbouringPlot[0] && plot[1] === neighbouringPlot[1]) < 0
    );

    neighboursToVisit.push(...newNeighboursToVisit);

    currentPlot = neighboursToVisit.pop()!;
  }

  return region;
};

const getGardenRegions = (garden: string[][]) => {
  const regions: number[][][] = [];
  const visitedPlots = Array.from({ length: garden.length }).map((_) =>
    Array.from({ length: garden[0].length }).map((_) => '')
  );

  for (let row = 0; row < garden.length; row++) {
    for (let col = 0; col < garden.length; col++) {
      if (visitedPlots[row][col]) {
        continue;
      }

      const region = getRegion([row, col], garden);

      regions.push(region);
      for (let index = 0; index < region.length; index++) {
        const plot = region[index];
        visitedPlots[plot[0]][plot[1]] = garden[plot[0]][plot[1]];
      }
    }
  }

  return regions;
};

const getRegionDimensions = (region: number[][]) => {
  const neighbours = [
    { delta: [-1, 0], side: '-' },
    { delta: [1, 0], side: '-' },
    { delta: [0, -1], side: '|' },
    { delta: [0, 1], side: '|' },
  ];

  let perimeter = 0;
  const horizontalSides = [];
  const verticalSides = [];

  for (let index = 0; index < region.length; index++) {
    for (const neighbour of neighbours) {
      const neighbourRow = region[index][0] + neighbour.delta[0];
      const neighbourCol = region[index][1] + neighbour.delta[1];

      const isNeighbourFromDifferentRegion =
        region.findIndex((plot) => plot[0] === neighbourRow && plot[1] === neighbourCol) < 0;

      if (isNeighbourFromDifferentRegion) {
        perimeter++;

        if (neighbour.side === '-') {
          horizontalSides.push({
            direction: neighbour.delta[0] === -1 ? 'U' : 'D',
            row: region[index][0],
            col: region[index][1],
          });
        } else {
          verticalSides.push({
            direction: neighbour.delta[1] === -1 ? 'L' : 'R',
            row: region[index][0],
            col: region[index][1],
          });
        }
      }
    }
  }

  const horizontalSideGroups = groupBy(horizontalSides, 'direction').map((directionGroup) => {
    const sideRows = [...new Set(directionGroup.items.map((item) => item.row))];
    return sum(
      sideRows.map((sideRow) => {
        const sideRowItems = directionGroup.items.filter((item) => item.row === sideRow);
        const groupCount = countGroups(sideRowItems.map((item) => item.col));
        return groupCount;
      })
    );
  });

  const verticalSideGroups = groupBy(verticalSides, 'direction').map((directionGroup) => {
    const sideCols = [...new Set(directionGroup.items.map((item) => item.col))];
    return sum(
      sideCols.map((sideCol) => {
        const sideColItems = directionGroup.items.filter((item) => item.col === sideCol);
        const groupCount = countGroups(sideColItems.map((item) => item.row));
        return groupCount;
      })
    );
  });

  return {
    area: region.length,
    perimeter,
    sides: sum(horizontalSideGroups) + sum(verticalSideGroups),
  };
};

const countGroups = (items: number[]) => {
  let count = 1;
  let sortedItems = items.slice();
  sortedItems.sort((a, b) => b - a);

  for (let index = 0; index < items.length - 1; index++) {
    if (sortedItems[index] - sortedItems[index + 1] > 1) {
      count++;
    }
  }

  return count;
};
