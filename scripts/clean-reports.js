const fs = require('fs');
const path = require('path');

const directoriesToClean = ['allure-results', 'allure-report', 'playwright-report'];

for (const dir of directoriesToClean) {
  const target = path.join(__dirname, '..', dir);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}
