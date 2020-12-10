const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);
};

const getDifferencies = (input) =>
  input.reduce(
    (acc, num, index, array) => {
      const next = array[index + 1];
      acc.push(next ? next - num : 3);
      return acc;
    },
    [1]
  );

const countDifferencies = (differencies) =>
  differencies.reduce(
    (acc, diff) => {
      if (diff === 1) acc[0]++;
      if (diff === 3) acc[1]++;
      return acc;
    },
    [0, 0]
  );

const possibleCombinationSolution = {
  1: 1,
  2: 1,
  3: 2,
};
const possibleCombination = (n) => {
  const computedSolution = possibleCombinationSolution[n];
  console.log(possibleCombinationSolution);
  if (computedSolution) return computedSolution;
  const newSolution =
    possibleCombination(n - 1) +
    possibleCombination(n - 2) +
    possibleCombination(n - 3);
  possibleCombinationSolution[n] = newSolution;
  return newSolution;
};

const firstPart = async () => {
  const input = await getInput();
  const differencies = getDifferencies(input);
  const [oneDiff, threeDiff] = countDifferencies(differencies);
  console.log("first part:", oneDiff * threeDiff);
};

firstPart();

const secondPart = async () => {
  const input = await getInput();
  const combinations = [1, ...input].reduce((acc, num, index, array) => {
    if (index === 0) {
      acc.push(1);
    } else if (index === 1) {
      acc.push(num - array[index - 1] <= 3 ? acc[index - 1] : 0);
    } else if (index === 2) {
      acc.push(
        (num - array[index - 1] <= 3 ? acc[index - 1] : 0) +
          (num - array[index - 2] <= 3 ? acc[index - 2] : 0)
      );
    } else {
      acc.push(
        (num - array[index - 1] <= 3 ? acc[index - 1] : 0) +
          (num - array[index - 2] <= 3 ? acc[index - 2] : 0) +
          (num - array[index - 3] <= 3 ? acc[index - 3] : 0)
      );
    }
    return acc;
  }, []);
  console.log("second part:", combinations[combinations.length - 1]);
};

secondPart();
