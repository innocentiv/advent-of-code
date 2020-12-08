const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map(Number);
};

const findCoupleToTarget = (input, target) => {
  const number = input.find((num) => input.includes(target - num));
  return [number, target - number];
};

const firstPart = async () => {
  const target = 2020;
  const input = await getInput();
  const [a, b] = findCoupleToTarget(input, target);
  console.log("first part:", a * b);
};

firstPart();

const secondPart = async () => {
  const target = 2020;
  const input = await getInput();
  console.time("find");

  for (const a of input) {
    const [b, c] = findCoupleToTarget(input, target - a);
    if (b) {
      console.log("second part:", a * b * c);
      console.timeEnd("find");
      break;
    }
  }
};

secondPart();
