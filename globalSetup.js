const fs = require('fs');
async function globalSetup() {
console.log('Starting Test Execution...');
if (!fs.existsSync('allure-results')) {
fs.mkdirSync('allure-results', { recursive: true });
}
fs.writeFileSync(
'allure-results/environment.properties',
`Framework=Playwright
Execution=Parallel
Report=Allure`
);
}
module.exports = globalSetup;