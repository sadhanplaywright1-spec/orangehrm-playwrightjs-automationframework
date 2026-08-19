const XLSX = require('xlsx');
class ExcelReader {
static readExcel(filePath) {
const workbook =
XLSX.readFile(filePath);
const sheetName =
workbook.SheetNames[0];
const worksheet =
workbook.Sheets[sheetName];
return XLSX.utils.sheet_to_json(
worksheet
);
}
}
module.exports = ExcelReader;