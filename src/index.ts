import figlet from "figlet";
import { Command } from "commander";

const program = new Command();

console.log(figlet.textSync("Advent of Code"));

program
  .version("1.0.0")
  .description("Advent of Code problem solutions")
  .option("-y, --year  [value]", "The year the problem was shown")
  .option("-d, --day <value>", "The day the problem was shown")
  .option("-n, --no <value>", "The number of the problem ( 1 or 2 )")
  .parse(process.argv);

const options = program.opts();

import(`./${options.year}/day${options.day}`)
  .catch(() => console.log("\nProblem not found!\n"))
  .then((module) => {
    if (!module) {
      return;
    }

    const result1 = module.problem1();
    const result2 = module.problem2();
    console.log("Problem 1 results: ", result1);
    console.log("Problem 2 results: ", result2);
  });
