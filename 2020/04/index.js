const fs = require("fs/promises");

const getInput = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  return input.split("\n\n").map((l) => {
    return Object.fromEntries(
      l
        .replace(/\n/g, " ")
        .split(" ")
        .map((v) => v.split(":"))
    );
  });
};

const isValidPassword = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
  return byr && iyr && eyr && hgt && hcl && ecl && pid;
};

const isStrictValidPassword = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
  const byrValid = byr && parseInt(byr) >= 1920 && parseInt(byr) <= 2002;
  const iyrValid = iyr && parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020;
  const eyrValid = eyr && parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030;
  const [, height, unit] = (hgt && hgt.match(/(\d+)(cm|in)/)) || [];
  const hgtValid =
    unit && unit === "cm"
      ? height >= 150 && height <= 193
      : height >= 59 && height <= 76;
  const hclValid = hcl && /^#[0-9a-f]{6}$/.test(hcl);
  const eclValid =
    ecl && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
  const pidValid = pid && /^\d{9}$/.test(pid);

  return (
    byrValid &&
    iyrValid &&
    eyrValid &&
    hgtValid &&
    hclValid &&
    eclValid &&
    pidValid
  );
};

const firstPart = async () => {
  const input = await getInput();
  const validPassport = input.filter(isValidPassword);
  console.log("first part:", validPassport.length);
};

firstPart();

const secondPart = async () => {
  const input = await getInput();
  const validPassport = input.filter(isStrictValidPassword);
  console.log("second part:", validPassport.length);
};

secondPart();
