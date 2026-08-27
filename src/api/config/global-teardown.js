const fs = require('fs');
const path = require('path');
async function globalTeardown() {
console.log('================================================');
console.log('Playwright Execution Completed');
console.log('================================================');
try {
const allureResultsDir = path.join(
process.cwd(),
'allure-results'
);
if (!fs.existsSync(allureResultsDir)) {
fs.mkdirSync(allureResultsDir, {
recursive: true
});
}
const summary = `
Execution Status=Completed
Execution Date=${new Date().toISOString()}
Node Version=${process.version}
`;
fs.writeFileSync(
path.join(
allureResultsDir,
'execution-summary.properties'
),
summary.trim()
);
console.log(
'✅ Allure execution summary generated successfully'
);
} catch (error) {
console.error(
'❌ Error while generating execution summary:',
error
);
}
console.log('================================================');
console.log('Framework Cleanup Finished');
console.log('================================================');
}
module.exports = globalTeardown;