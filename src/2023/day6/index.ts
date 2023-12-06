import fs from "fs";
import path from "path";

export const problem1 = () => {
  const races = parseInput();

  const result = races
    .map((race) => {
      const { time, distance: maxDistance } = race;

      const distances = [];
      for (let holdTime = 1; holdTime < time; holdTime++) {
        const currentDistance = (time - holdTime) * holdTime;
        if (currentDistance > maxDistance) {
          distances.push(currentDistance);
        }
      }

      return distances.length;
    })
    .reduce((x, y) => x * y, 1);

  return result;
};

export const problem2 = () => {
  const race = parseInput(true);
  const [{ time, distance: maxDistance }] = race;

  const distances = [];
  for (let holdTime = 1; holdTime < time; holdTime++) {
    const currentDistance = (time - holdTime) * holdTime;
    if (currentDistance > maxDistance) {
      distances.push(currentDistance);
    }
  }

  return distances.length;
};

const parseInput = (singleRace: boolean = false) => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  const [timeDetails, distanceDetails] = input.split("\n");
  const [_, time] = timeDetails.split(":");
  const [__, distance] = distanceDetails.split(":");

  if (singleRace) {
    return [
      {
        time: Number(time.replaceAll(" ", "")),
        distance: Number(distance.replaceAll(" ", "")),
      },
    ];
  }

  const raceTimes = time.split(" ").filter(Boolean).map(Number);
  const raceDistances = distance.split(" ").filter(Boolean).map(Number);

  return raceTimes.map((time, i) => ({
    time,
    distance: raceDistances[i],
  }));
};
