const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map((l) => l.split(""));
};

const getAdiacentIndexes = (index, seats, width) => {
  const up = index - width;
  const down = index + width;
  const isFirstCol = index % width === 0;
  const isLastCol = index % width === width - 1;
  const adiacentIdx = [
    isFirstCol ? -1 : up - 1,
    up,
    isLastCol ? -1 : up + 1,
    isFirstCol ? -1 : index - 1,
    isLastCol ? -1 : index + 1,
    isFirstCol ? -1 : down - 1,
    down,
    isLastCol ? -1 : down + 1,
  ].filter((el) => el >= 0 && el < seats.length);
  return adiacentIdx;
};

const getAdiacents = (index, seats, width) => {
  return getAdiacentIndexes(index, seats, width).map((i) => seats[i]);
};

const evolveSeats = (seats, width) => {
  let hasMutated = false;
  const newSeats = seats.map((seat, index) => {
    const adiacents = getAdiacents(index, seats, width);
    if (seat === "L" && !adiacents.some((s) => s === "#")) {
      hasMutated = true;
      return "#";
    }
    if (seat === "#" && adiacents.filter((s) => s === "#").length >= 4) {
      hasMutated = true;
      return "L";
    }
    return seat;
  });

  return [newSeats, hasMutated];
};

const firstPart = async () => {
  const input = await getInput();
  const width = input[0].length;
  const seats = input.flat();

  let hasMutated = true;
  let newSeats = seats;
  while (hasMutated) {
    [newSeats, hasMutated] = evolveSeats(newSeats, width);
  }
  const occupiedSeatsCount = newSeats.filter((s) => s === "#").length;

  console.log("first part:", occupiedSeatsCount);
};

firstPart();

const secondPart = async () => {
  const input = await getInput();
  console.log("second part:");
};

secondPart();
