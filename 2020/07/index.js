const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n");
};

class Node {
  constructor(input) {
    const [value, depsString] = input
      .replace(/ bags?\.?/g, "")
      .split(" contain ");
    const deps = depsString.split(", ").reduce((acc, dep) => {
      const [, quantity, value] = dep.match(/^(\d+) (.*$)/) || [];
      if (!quantity) return acc;
      acc[value] = +quantity;
      return acc;
    }, {});

    this.value = value;
    this.deps = deps;
  }
}

const getNodeContaining = (nodes, value) => {
  const directDeps = nodes.filter((n) => value in n.deps);
  const indirectDeps = directDeps.map((d) => getNodeContaining(nodes, d.value));
  return [...new Set([...directDeps, ...indirectDeps.flat()])];
};

const countBagsInside = (nodes, value, countedList = []) => {
  const node = nodes.find((n) => n.value === value);
  if (countedList.includes(nodes)) return Infinity;
  countedList.push(node);
  const count = Object.keys(node.deps).reduce((acc, depValue) => {
    return (
      acc +
      node.deps[depValue] +
      node.deps[depValue] * countBagsInside(nodes, depValue, countedList)
    );
  }, 0);
  return count;
};

const firstPart = async () => {
  const input = await getInput();
  const nodes = input.map((l) => new Node(l));
  const validNodes = getNodeContaining(nodes, "shiny gold");
  console.log("first part:", validNodes.length);
};

firstPart();

const secondPart = async () => {
  const input = await getInput();
  const nodes = input.map((l) => new Node(l));
  const bagCount = countBagsInside(nodes, "shiny gold");
  console.log("second part:", bagCount);
};

secondPart();
