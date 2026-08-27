const XLSX = require('xlsx');

function readExcel(filePath, sheetName = null) {

    const workbook = XLSX.readFile(filePath);

    console.log('Available Excel sheets:', workbook.SheetNames);

    // If sheet name is supplied, use it
    // Otherwise use the first worksheet
    const selectedSheet =
        sheetName || workbook.SheetNames[0];

    if (!selectedSheet) {
        throw new Error(
            `No worksheets found in ${filePath}`
        );
    }

    const worksheet =
        workbook.Sheets[selectedSheet];

    if (!worksheet) {
        throw new Error(
            `Worksheet "${selectedSheet}" was not found in ${filePath}. ` +
            `Available sheets: ${workbook.SheetNames.join(', ')}`
        );
    }

    const data = XLSX.utils.sheet_to_json(
        worksheet,
        {
            defval: ''
        }
    );

    if (!data.length) {
        throw new Error(
            `No data found in worksheet "${selectedSheet}"`
        );
    }

    console.log(
        `Reading Excel worksheet: ${selectedSheet}`
    );
    console.log(
        `Number of test records: ${data.length}`
    );
    return data;
}
module.exports = {
     readExcel
};