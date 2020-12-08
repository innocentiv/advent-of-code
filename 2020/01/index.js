const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map(Number);
};

const firstPart = async () => {
  const target = 2020;
  const input = await getInput();

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[i] + input[j] === target) {
        console.log("first part:", input[i] * input[j]);
        return;
      }
    }
  }
};

firstPart();

const secondPart = async () => {
  const target = 2020;
  const input = await getInput();

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let z = 0; z < input.length; z++) {
        if (input[i] + input[j] + input[z] === target) {
          console.log("second part:", input[i] * input[j] * input[z]);
          return;
        }
      }
    }
  }
};

secondPart();
