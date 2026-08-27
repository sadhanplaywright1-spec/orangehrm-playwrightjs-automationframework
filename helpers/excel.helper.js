const XLSX = require('xlsx');
function readExcel(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const worksheet =
        workbook.Sheets[sheetName];
    if (!worksheet) {

        throw new Error(
            `Worksheet "${sheetName}" not found`
        );
    }
    return XLSX.utils.sheet_to_json(
        worksheet,
        {
            defval: ''
        }
    );
}
module.exports = {
    readExcel
};