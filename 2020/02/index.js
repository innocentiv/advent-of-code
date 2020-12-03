const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input
    .split("\n")
    .map((l) => l.replace(":", "").replace("-", " ").split(" "));
};

const firstPart = async () => {
  const input = await getInput();

  const valid = input.filter(([min, max, value, password]) => {
    const count = password.split(value).length - 1;
    return count >= min && count <= max;
  });

  console.log("first part:", valid.length);
};

firstPart();

const secondPart = async () => {
  const input = await getInput();

  const valid = input.filter(([min, max, value, password]) => {
    return (password[min - 1] === value) !== (password[max - 1] === value);
  });

  console.log("second part:", valid.length);
};

secondPart();
