import fs from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const result = input
    .split("\n")
    .map((line) => {
      let first = -1;
      let last = -1;

      for (let index = 0; index < line.length; index++) {
        const elementFromStart = line[index];
        const elementFromEnd = line[line.length - index - 1];
        if (elementFromStart >= "0" && elementFromStart <= "9" && first < 0) {
          first = +elementFromStart;
        }
        if (elementFromEnd >= "0" && elementFromEnd <= "9" && last < 0) {
          last = +elementFromEnd;
        }
      }

      return first * 10 + last;
    })
    .reduce((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  // We need to be able to have multiple partials matches.
  // For example we want to match the '3twone' word with '321'.
  // In order to do this we replace the initial spelled number with a 3-letter "word"
  // that has the the first and last letter of the initial word and in the middle the
  // digit the represents that number.
  const numberMap: Record<string, string> = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
  };

  const result = input
    .split("\n")
    .map((originalLine) => {
      let line = originalLine;

      for (const number of Object.keys(numberMap)) {
        line = line.replaceAll(number, numberMap[number]);
      }

      let first = -1;
      let last = -1;

      for (let index = 0; index < line.length; index++) {
        const elementFromStart = line[index];
        const elementFromEnd = line[line.length - index - 1];
        if (elementFromStart >= "0" && elementFromStart <= "9" && first < 0) {
          first = Number(elementFromStart);
        }
        if (elementFromEnd >= "0" && elementFromEnd <= "9" && last < 0) {
          last = Number(elementFromEnd);
        }
      }

      return first * 10 + last;
    })
    .reduce((x, y) => x + y, 0);

  return result;
};
