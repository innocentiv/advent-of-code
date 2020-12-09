const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map(Number);
};

const PREAMBLE_SIZE = 25;

const isNumberValid = (preamble, number) => {
  return preamble.some((num, index) => {
    const target = number - num;
    const rest = [...preamble.slice(0, index), ...preamble.slice(index + 1)];
    return rest.includes(target);
  });
};

const findFirstInvalid = (input) => {
  return input.slice(PREAMBLE_SIZE).find((num, index) => {
    const preamble = input.slice(index, index + PREAMBLE_SIZE);
    return !isNumberValid(preamble, num);
  });
};

const findValidRange = (input, target) => {
  let range;
  input.find((num, index) => {
    let acc = num;
    let pointer = index;
    while (acc < target) {
      pointer++;
      acc += input[pointer];
    }
    if (acc === target) {
      range = input.slice(index, pointer);
      return true;
    }
  });
  return range;
};

const firstPart = async () => {
  const input = await getInput();
  const firstInvalid = findFirstInvalid(input);
  console.log("first part:", findFirstInvalid(input));
  return firstInvalid;
};

const secondPart = async () => {
  const input = await getInput();
  const target = await firstPart();
  const range = findValidRange(input, target);
  console.log("second part:", Math.min(...range) + Math.max(...range));
};

secondPart();
