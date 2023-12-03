import fs from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  const totalCubeCount = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = input.split("\n").map((game) => {
    const [gameHeaderColumn, gameDetailsColumn] = game.split(": ");
    const gameId = Number(gameHeaderColumn.substring(5));
    const gameSets = gameDetailsColumn.split("; ").map((setText) => {
      let set = {
        red: 0,
        green: 0,
        blue: 0,
      };

      const cubeGroups = setText.split(", ");
      for (const cubeGroup of cubeGroups) {
        const [count, color] = cubeGroup.split(" ");
        set = {
          ...set,
          [color]: Number(count),
        };
      }

      return set;
    });

    return { id: gameId, sets: gameSets };
  });

  const result = games
    .map((game) => {
      let gameIsPossible = true;

      for (const set of game.sets) {
        if (
          set.red > totalCubeCount.red ||
          set.green > totalCubeCount.green ||
          set.blue > totalCubeCount.blue
        ) {
          gameIsPossible = false;
          break;
        }
      }

      return gameIsPossible ? game.id : 0;
    })
    .reduce((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const games = input.split("\n").map((game) => {
    const [gameHeaderColumn, gameDetailsColumn] = game.split(": ");
    const gameId = Number(gameHeaderColumn.substring(5));
    const gameSets = gameDetailsColumn.split("; ").map((setText) => {
      let set = {
        red: 0,
        green: 0,
        blue: 0,
      };

      const cubeGroups = setText.split(", ");
      for (const cubeGroup of cubeGroups) {
        const [count, color] = cubeGroup.split(" ");
        set = {
          ...set,
          [color]: Number(count),
        };
      }

      return set;
    });

    return { id: gameId, sets: gameSets };
  });

  const result = games
    .map((game) => {
      const minSet = game.sets.reduce(
        (acc, set) => {
          return {
            red: Math.max(acc.red, set.red || 0),
            green: Math.max(acc.green, set.green || 0),
            blue: Math.max(acc.blue, set.blue || 0),
          };
        },
        {
          red: 0,
          green: 0,
          blue: 0,
        }
      );

      const power =
        (minSet.red > 0 ? minSet.red : 1) *
        (minSet.green > 0 ? minSet.green : 1) *
        (minSet.blue > 0 ? minSet.blue : 1);

      return power;
    })
    .reduce((x, y) => x + y, 0);

  return result;
};
