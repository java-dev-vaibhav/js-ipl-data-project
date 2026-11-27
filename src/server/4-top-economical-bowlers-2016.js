const { readCsv, writeJson } = require("./utils");
const matches = readCsv("matches.csv");
const deliveries = readCsv("deliveries.csv");

const ids = new Set(matches.filter((m) => m.season === "2016").map((m) => m.id));

const stats = {};
for (const d of deliveries) {
  if (!ids.has(d.match_id)) continue;
  const s = (stats[d.bowler] ??= { runs: 0, balls: 0 });
  s.runs += Number(d.total_runs) - Number(d.bye_runs) - Number(d.legbye_runs);
  if (d.wide_runs === "0" && d.noball_runs === "0") s.balls++;
}

const result = Object.entries(stats)
  .map(([bowler, s]) => ({ bowler, economy: +(s.runs / (s.balls / 6)).toFixed(2) }))
  .sort((a, b) => a.economy - b.economy)
  .slice(0, 10);

console.log(result);
writeJson("topEconomicalBowlers2016.json", result);