const xlsx = require('xlsx');

function readXlsx(filePath, sheetName = null) {
  const wb = xlsx.readFile(filePath);
  const sheet = sheetName || wb.SheetNames[0];
  return xlsx.utils.sheet_to_json(wb.Sheets[sheet]);
}

module.exports = { readXlsx };
