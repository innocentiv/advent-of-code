const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n").map((l) => {
    const instruction = l[0];
    const value = +l.substring(1);
    return [instruction, value];
  });
};

const DIRECTIONS = ["N", "E", "S", "W"];

const turn = (facing, angle) => {
  const current = DIRECTIONS.findIndex((d) => d === facing);
  const next = DIRECTIONS[(angle / 90 + current + 4) % 4];
  return next;
};

const rotateClockwise = (x0, y0, x1, y1) => {
  return [y1 - y0 + x0, -x1 + x0 + y0];
};

const rotateCounterClockwise = (x0, y0, x1, y1) => {
  return [-y1 + y0 + x0, +x1 - x0 + y0];
};

const rotate = (x0, y0, x1, y1, direction, times) => {
  return Array(times)
    .fill()
    .reduce(
      ([x, y]) =>
        direction === "R"
          ? rotateClockwise(x0, y0, x, y)
          : rotateCounterClockwise(x0, y0, x, y),
      [x1, y1]
    );
};

const move = (direction, length, x, y) => {
  switch (direction) {
    case "N":
      return [x, y + length];
    case "E":
      return [x + length, y];
    case "S":
      return [x, y - length];
    case "W":
      return [x - length, y];
  }
};

const forward = (x0, y0, x1, y1, times) => {
  return [(x1 - x0) * times + x0, (y1 - y0) * times + y0];
};

const navigate = (maneuvers, origin) => {
  return maneuvers.reduce(({ x, y, facing }, [instruction, value]) => {
    switch (instruction) {
      case "N":
      case "E":
      case "S":
      case "W": {
        const [x1, y1] = move(instruction, value, x, y);
        return { x: x1, y: y1, facing };
      }
      case "R": {
        const facing1 = turn(facing, value);
        return { x, y, facing: facing1 };
      }
      case "L": {
        const facing1 = turn(facing, -value);
        return { x, y, facing: facing1 };
      }
      case "F": {
        const [x1, y1] = move(facing, value, x, y);
        return { x: x1, y: y1, facing };
      }
    }
  }, origin);
};

const navigateWithWaypoint = (maneuvers, shipOrigin, waypointOrigin) => {
  return maneuvers.reduce(
    ([ship, waypoint], [instruction, value]) => {
      switch (instruction) {
        case "N":
        case "E":
        case "S":
        case "W": {
          const { x, y } = waypoint;
          const [x1, y1] = move(instruction, value, x, y);
          return [ship, { x: x1, y: y1 }];
        }
        case "R":
        case "L": {
          const { x: x0, y: y0 } = ship;
          const { x: x1, y: y1 } = waypoint;
          const [x, y] = rotate(x0, y0, x1, y1, instruction, value / 90);
          return [ship, { x, y }];
        }
        case "F": {
          const { x: x0, y: y0 } = ship;
          const { x: x1, y: y1 } = waypoint;
          const [x, y] = forward(x0, y0, x1, y1, value);
          return [
            { x, y },
            { x: x + x1 - x0, y: y + y1 - y0 },
          ];
        }
      }
    },
    [shipOrigin, waypointOrigin]
  );
};

const firstPart = async () => {
  const maneuvers = await getInput();
  const { x, y } = navigate(maneuvers, { x: 0, y: 0, facing: "E" }, {});
  console.log("first part:", Math.abs(x) + Math.abs(y));
};

firstPart();

const secondPart = async () => {
  const maneuvers = await getInput();
  const [{ x, y }] = navigateWithWaypoint(
    maneuvers,
    { x: 0, y: 0 },
    { x: 10, y: 1 }
  );
  console.log("second part:", Math.abs(x) + Math.abs(y));
};

secondPart();
