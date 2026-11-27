const { readCsv, writeJson } = require("./utils");

const matches = readCsv("matches.csv");

const result = {};
for (const m of matches) {
  result[m.season] = (result[m.season] || 0) + 1;
}

writeJson("matchesPerYear.json", result); 
console.log(result);