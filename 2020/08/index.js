const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map((l) => {
    const [instruction, value] = l.split(" ");
    return [instruction, +value];
  });
};

const run = (program) => {
  let pointer = 0;
  let accumulator = 0;
  let hasLoop = false;
  const hasBeenExecuted = new Set();
  const jumps = [];

  while (pointer < program.length - 1) {
    const instruction = program[pointer];

    if (hasBeenExecuted.has(instruction)) {
      hasLoop = true;
      break;
    }
    hasBeenExecuted.add(instruction);

    const [command, value] = instruction;

    switch (command) {
      case "acc":
        accumulator += value;
        pointer++;
        break;
      case "jmp":
        jumps.unshift(pointer);
        pointer += value;
        break;
      case "nop":
        jumps.unshift(pointer);
        pointer++;
        break;
    }
  }

  return [accumulator, hasLoop, jumps];
};

const toggleCommand = (program, pointer) => {
  program[pointer][0] = program[pointer][0] === "jmp" ? "nop" : "jmp";
};

const firstPart = async () => {
  const program = await getInput();
  console.log("first part:", run(program)[0]);
};

firstPart();

const secondPart = async () => {
  const program = await getInput();
  const jumps = run(program)[2];

  for (pointer of jumps) {
    if (program[pointer][0] === "acc") {
      continue;
    }

    toggleCommand(program, pointer);
    const [accumulator, hasLoop] = run(program);
    toggleCommand(program, pointer);

    if (hasLoop) {
      continue;
    } else {
      console.log("second part:", accumulator);
      break;
    }
  }
};

secondPart();
