const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input
    .split("\n")
    .map((l) => [l, l.slice(0, 7).split(""), l.slice(7, 10).split("")]);
};

const ROWS = [0, 127];
const COLS = [0, 7];

const partition = ([start, finish]) => {
  const length = Math.floor((finish - start) / 2);

  return [
    [start, start + length],
    [finish - length, finish],
  ];
};

const getTickets = (input) => {
  return input.map(([bording, rowsCode, colsCode]) => {
    const [row] = rowsCode.reduce((acc, code) => {
      const [front, back] = partition(acc);
      if (code === "F") return front;
      if (code === "B") return back;
      return acc;
    }, ROWS);

    const [col] = colsCode.reduce((acc, code) => {
      const [left, right] = partition(acc);
      if (code === "L") return left;
      if (code === "R") return right;
      return acc;
    }, COLS);

    const seatId = row * 8 + col;

    return {
      bording,
      row,
      col,
      seatId,
    };
  });
};

const firstPart = async () => {
  const input = await getInput();
  const tickets = getTickets(input);
  const seatIds = tickets.map((t) => t.seatId);
  console.log("first part:", Math.max.apply(null, seatIds));
};

firstPart();

const secondPart = async () => {
  const input = await getInput();
  const tickets = getTickets(input);
  const availableTickets = tickets.filter((t) => !ROWS.includes(t.row));
  const sortedSeatIds = availableTickets.map((t) => t.seatId).sort();

  let mySeatId;
  for (let i = 0; i < sortedSeatIds.length; i++) {
    if (sortedSeatIds[i + 1] - sortedSeatIds[i] === 2) {
      mySeatId = sortedSeatIds[i] + 1;
      break;
    }
  }

  console.log("second part:", mySeatId);
};

secondPart();
