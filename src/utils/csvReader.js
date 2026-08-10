const fs = require('fs');
const { parse } = require('csv-parse/sync');

function readCsv(path) {
  const content = fs.readFileSync(path, 'utf8');
  return parse(content, { columns: true, skip_empty_lines: true });
}

module.exports = { readCsv };
