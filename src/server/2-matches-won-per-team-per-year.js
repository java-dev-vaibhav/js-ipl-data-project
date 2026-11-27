const { readCsv, writeJson } = require("./utils");

const matches = readCsv("matches.csv");

const result = {};
for (const m of matches) {
  if (!m.winner) continue; // no result / tie
  result[m.season] ??= {};
  result[m.season][m.winner] = (result[m.season][m.winner] || 0) + 1;
}

writeJson("matchesWonPerTeamPerYear.json", result);