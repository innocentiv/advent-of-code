const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map((l) => {
    const [instruction, value] = l.split(" ");
    return [instruction, +value];
  });
};

const run = (program, onJump) => {
  let pointer = 0;
  let accumulator = 0;
  let hasLoop = false;
  const hasBeenExecuted = new Set();

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
        onJump && onJump(pointer);
        pointer += value;
        break;
      case "nop":
        onJump && onJump(pointer);
        pointer++;
        break;
    }
  }

  return [accumulator, hasLoop];
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
  const jumps = [];
  run(program, (pointer) => jumps.unshift(pointer));

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
