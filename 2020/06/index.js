const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n\n");
};

const firstPart = async () => {
  const input = await getInput();
  const union = input.map((l) => [...new Set(l.replace(/\n/g, "").split(""))]);
  const count = union.reduce((c, l) => c + l.length, 0);

  console.log("first part:", count);
};

firstPart();

const secondPart = async () => {
  const input = await getInput();
  const intersection = input.map((l) =>
    l.split("\n").reduce((acc, u) => {
      const answer = u.split("");
      if (!acc) return answer;
      return acc.filter((x) => answer.includes(x));
    }, null)
  );
  const count = intersection.reduce((c, l) => c + l.length, 0);
  console.log("second part:", count);
};

secondPart();
