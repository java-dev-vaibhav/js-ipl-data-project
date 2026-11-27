const { readCsv, writeJson } = require("./utils");

const matches = readCsv("matches.csv");
const deliveries = readCsv("deliveries.csv");

const ids = new Set(matches.filter((m) => m.season === "2016").map((m) => m.id));

const result = {};
for (const d of deliveries) {
  if (!ids.has(d.match_id)) continue;
  result[d.bowling_team] = (result[d.bowling_team] || 0) + Number(d.extra_runs);
}

writeJson("extraRunsPerTeam2016.json", result);