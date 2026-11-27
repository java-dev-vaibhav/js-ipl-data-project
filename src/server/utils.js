const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const DATA_DIR = path.join(__dirname, "..", "data");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "output");

function readCsv(fileName) {
  const text = fs.readFileSync(path.join(DATA_DIR, fileName), "utf8");
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
  return data;
}

function writeJson(fileName, result) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), JSON.stringify(result, null, 2));
  console.log(`Written ${fileName}`);
}

module.exports = { readCsv, writeJson };