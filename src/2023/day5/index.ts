import fs from "fs";
import path from "path";

export const problem1 = () => {
  const { seeds, maps } = parseInput();

  const result = Math.min.apply(
    null,
    seeds.map((seed) => maps.reduce((acc, curr) => curr.convert(acc), seed))
  );

  return result;
};

export const problem2 = () => {
  console.time("Problem 2 - Naive run")
  const result = problem2_Naive();
  console.timeEnd("Problem 2 - Naive run")
  return result;
};

// TODO: Come up with a better solution as this takes a LOONG (~8 min on my machine) time to run.
const problem2_Naive = () => {
  const { seeds, maps } = parseInput();
  const seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push({ start: seeds[i], size: seeds[i + 1] });
  }

  let min = -1;
  for (const range of seedRanges) {
    console.log(`Range ${range.start} - ${range.start + range.size}`);
    for (let value = range.start; value < range.start + range.size; value++) {
      const location = maps.reduce((acc, curr) => curr.convert(acc), value);
      if (min === -1 || location < min) {
        min = location;
      }
    }
  }

  return min;
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const [seedsInput, ...mapsInput] = input.split("\n\n");

  const [_, seedNumbersText] = seedsInput.split(": ");
  const seeds = seedNumbersText.split(" ").map(Number);
  const maps = mapsInput.map((mapInput) => {
    const [mapDataHeader, ...mapDataText] = mapInput.split("\n");
    const [mapName] = mapDataHeader.split(" ");
    const mapData = mapDataText.map((mapDataLine) =>
      mapDataLine.split(" ").map(Number)
    );

    mapData.sort((a, b) => a[1] - b[1]);

    const convert = (value: number) => {
      for (const range of mapData) {
        const min = range[1];
        const max = range[1] + range[2] - 1;
        if (value >= min && value <= max) {
          return range[0] + value - min;
        }
      }

      return value;
    };

    return { name: mapName, convert };
  });

  return {
    seeds,
    maps,
  };
};
