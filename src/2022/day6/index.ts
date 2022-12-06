import fs from "fs";
import path from "path";

const solution = (messageLength = 4) => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
  let startOfPacket = messageLength;

  for (let i = 0; i < input.length - messageLength; i++) {
    if (
      [
        ...new Set(
          Array.from({ length: messageLength }).map((_, index) => input[i + index])
        ),
      ].length === messageLength
    ) {
      return startOfPacket;
    }

    startOfPacket++;
  }

  return 0;
};

export const problem1 = () => {
  return solution(4);
};

export const problem2 = () => {
  return solution(14);
};
