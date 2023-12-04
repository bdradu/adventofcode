import fs, { cp } from "fs";
import path from "path";

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const result = input
    .split("\n")
    .map((line) => {
      const [_, cardDetailsColumn] = line.split(": ");
      const [cardWiningNumbers, cardNumbers] = cardDetailsColumn
        .split(" | ")
        .map((numbers) => numbers.split(" ").filter(Boolean).map(Number));

      const winningCount = cardNumbers.reduce((acc, curr) => {
        return acc + (cardWiningNumbers.includes(curr) ? 1 : 0);
      }, 0);

      return winningCount > 0 ? Math.pow(2, winningCount - 1) : winningCount;
    })
    .reduce((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const cards = input.split("\n").map((line) => {
    const [cardHeaderColumn, cardDetailsColumn] = line.split(": ");
    const cardId = Number(
      cardHeaderColumn.substring(cardHeaderColumn.lastIndexOf(" "))
    );
    const [cardWiningNumbers, cardNumbers] = cardDetailsColumn
      .split(" | ")
      .map((numbers) => numbers.split(" ").filter(Boolean).map(Number));

    const winningCount = cardNumbers.reduce((acc, curr) => {
      return acc + (cardWiningNumbers.includes(curr) ? 1 : 0);
    }, 0);

    return {
      min: cardId + 1,
      max: cardId + winningCount + 1,
    };
  });

  const result = Array.from({ length: cards.length }).map((_, i) => i + 1);

  let index = 0;
  while (index < result.length) {
    const card = cards[result[index] - 1];
    for (let i = card.min; i < card.max; i++) {
      result.push(i);
    }

    index++;
  }

  return result.length;
};
