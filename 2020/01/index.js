const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map(Number);
};

const getHashmap = (input) =>
  input.reduce((acc, n) => {
    acc[n] = true;
    return acc;
  }, {});

const findPairToTarget = (target, input, hashmap) => {
  const number = input.find((n) => hashmap[target - n]);

  return [number, target - number];
};

const findTrippleToTarget = (target, input, hashmapWithPair) => {
  const number = input.find((n) => hashmapWithPair[target - n]);
  return hashmapWithPair[target - number].concat(number);
};

const firstPart = async () => {
  const target = 2020;
  const input = await getInput();

  const hashmap = getHashmap(input);
  const [a, b] = findPairToTarget(target, input, hashmap);

  console.log("first part:", a * b);
};

firstPart();

const secondPart = async () => {
  const target = 2020;
  const input = await getInput();

  const hashmap = getHashmap(input);
  const hashmapWithPair = input.reduce((acc, n) => {
    const partialTarget = target - n;
    const pair = findPairToTarget(partialTarget, input, hashmap);
    if (pair[0]) {
      acc[partialTarget] = pair;
    }
    return acc;
  }, {});

  const [a, b, c] = findTrippleToTarget(target, input, hashmapWithPair);

  console.log("second part:", a * b * c);
};

secondPart();
