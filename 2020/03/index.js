const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map((l) => l.split(""));
};

const countTree = (input, dx, dy) => {
  const rows = input.length;
  const cols = input[0].length;
  let countTree = 0;

  for (let i = 0; i * dy < rows; i++) {
    const x = (i * dx) % cols;
    const y = i * dy;
    if (input[y][x] === "#") {
      countTree++;
    }
  }

  return countTree;
};

const firstPart = async () => {
  const input = await getInput();
  console.log("first part:", countTree(input, 3, 1));
};

firstPart();

const secondPart = async () => {
  const input = await getInput();
  const a = countTree(input, 1, 1);
  const b = countTree(input, 3, 1);
  const c = countTree(input, 5, 1);
  const d = countTree(input, 7, 1);
  const e = countTree(input, 1, 2);
  console.log("second part:", a * b * c * d * e);
};

secondPart();
