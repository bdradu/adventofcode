import fs from "fs";
import path from "path";

export const problem1 = () => {
  const pairs = parseInput();
  const labels = "AKQJT98765432";

  const pairsWithMetadata = pairs.map(enhancePairWithMetadata);

  const rankedPairs = pairsWithMetadata.reduce((acc, curr) => {
    if (acc[curr.type]) {
      acc[curr.type].push(curr);
    } else {
      acc[curr.type] = [curr];
    }

    acc[curr.type].sort((a, b) => {
      const hand1 = a.hand;
      const hand2 = b.hand;

      for (let i = 0; i < hand1.length; i++) {
        if (labels.indexOf(hand1[i]) === labels.indexOf(hand2[i])) {
          continue;
        }

        return labels.indexOf(hand2[i]) - labels.indexOf(hand1[i]);
      }
      return 0;
    });

    return acc;
  }, {} as Record<string, any[]>);

  let rank = 1;
  const result = Object.keys(rankedPairs).reduce((acc, key) => {
    const pairs = rankedPairs[key];

    for (let i = 0; i < pairs.length; i++) {
      acc = acc + rank * pairs[i].bid;
      rank++;
    }

    return acc;
  }, 0);

  return result;
};

export const problem2 = () => {
  const pairs = parseInput();
  const labels = "AKQT98765432J";

  const pairsWithMetadata = pairs.map(enhancePairWithMetadataUsingJAsWildcard);

  const rankedPairs = pairsWithMetadata.reduce((acc, curr) => {
    if (acc[curr.type]) {
      acc[curr.type].push(curr);
    } else {
      acc[curr.type] = [curr];
    }

    acc[curr.type].sort((a, b) => {
      const hand1 = a.hand;
      const hand2 = b.hand;

      for (let i = 0; i < hand1.length; i++) {
        if (labels.indexOf(hand1[i]) === labels.indexOf(hand2[i])) {
          continue;
        }

        return labels.indexOf(hand2[i]) - labels.indexOf(hand1[i]);
      }
      return 0;
    });

    return acc;
  }, {} as Record<string, any[]>);

  let rank = 1;
  const result = Object.keys(rankedPairs).reduce((acc, key) => {
    const pairs = rankedPairs[key];

    for (let i = 0; i < pairs.length; i++) {
      acc = acc + rank * pairs[i].bid;
      rank++;
    }

    return acc;
  }, 0);

  return result;
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  return input.split("\n").map((line) => {
    const [hand, bid] = line.split(" ");
    return {
      hand,
      bid: Number(bid),
    };
  });
};

const enhancePairWithMetadata = ({
  hand,
  bid,
}: {
  hand: string;
  bid: number;
}) => {
  const labels = hand.split("");
  const labelCount: Record<string, number> = {};

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    labelCount[label] = (labelCount[label] || 0) + 1;
  }

  return {
    hand,
    labelCount,
    type: getTypeFromLabelCount(labelCount),
    bid,
  };
};

const enhancePairWithMetadataUsingJAsWildcard = ({
  hand,
  bid,
}: {
  hand: string;
  bid: number;
}) => {
  const labels = hand.split("");
  const labelCount: Record<string, number> = {};

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    labelCount[label] = (labelCount[label] || 0) + 1;
  }

  if (labelCount["J"] > 0 && labelCount["J"] < 5) {
    const candidateLabels = Object.entries(labelCount).filter(
      ([key]) => key !== "J"
    );

    let max = Math.max.apply(
      null,
      candidateLabels.map(([_, value]) => value)
    );

    for (let i = 0; i < candidateLabels.length; i++) {
      const [key, value] = candidateLabels[i];

      if (value === max) {
        labelCount[key] += labelCount["J"];
        break;
      }
    }

    delete labelCount["J"];
  }

  return {
    hand,
    labelCount,
    type: getTypeFromLabelCount(labelCount),
    bid,
  };
};

const getTypeFromLabelCount = (labelCount: Record<string, number>) => {
  const counts = Object.values(labelCount);

  //Five of a kind
  if (counts.includes(5)) {
    return 6;
  }

  //Four of a kind
  if (counts.includes(4)) {
    return 5;
  }

  // Full house
  if (counts.includes(3) && counts.includes(2)) {
    return 4;
  }

  //Three of a kind
  if (counts.includes(3)) {
    return 3;
  }

  // Two pair
  if (counts.indexOf(2) !== counts.lastIndexOf(2)) {
    return 2;
  }

  // One pair
  if (counts.includes(2)) {
    return 1;
  }

  // High card
  return 0;
};
