import fs from "fs";
import path from "path";

export const problem1 = () => {
  const { instructions, nodes } = parseInput();

  return calculateStepsFromStartingNode({
    startingNode: "AAA",
    endCondition: (node) => node === "ZZZ",
    nodes: nodes,
    instructions: instructions,
  });
};

export const problem2 = () => {
  const { instructions, nodes } = parseInput();

  let currentNodes = Object.keys(nodes).filter((key) => key.endsWith("A"));

  const steps = currentNodes.map((node) =>
    calculateStepsFromStartingNode({
      startingNode: node,
      endCondition: (node) => node.endsWith("Z"),
      nodes: nodes,
      instructions: instructions,
    })
  );

  return steps.reduce((acc, curr) => lcm(acc, curr), 1);
};

const calculateStepsFromStartingNode = ({
  startingNode,
  endCondition,
  nodes,
  instructions,
}: {
  startingNode: string;
  endCondition: (node: string) => boolean;
  nodes: Record<string, string[]>;
  instructions: string;
}) => {
  let step = 0;
  let currentNode = startingNode;

  while (true) {
    const instruction =
      instructions[step % instructions.length] === "L" ? 0 : 1;

    if (endCondition(currentNode)) {
      break;
    }

    currentNode = nodes[currentNode][instruction];

    step++;
  }

  return step;
};

const gcd = (a: number, b: number): number => {
  return !b ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

const parseInput = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  const [instructions, nodesDetails] = input.split("\n\n");
  const nodes = nodesDetails.split("\n").reduce((acc, curr) => {
    const [value, nodeListText] = curr
      .substring(0, curr.length - 1)
      .split(" = (");
    const nodes = nodeListText.split(", ");
    acc[value] = nodes;

    return acc;
  }, {} as Record<string, string[]>);

  return {
    instructions,
    nodes,
  };
};
