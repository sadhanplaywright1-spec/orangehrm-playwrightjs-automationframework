const { test } = require('@playwright/test');
const LoginPage = require('../../src/pages/LoginPage');
const { readCsv } = require('../../src/utils/csvReader');
const { readXlsx } = require('../../src/utils/excelReader');

const csvRows = readCsv('data/login-data.csv');
const excelRows = readXlsx('data/employees.xlsx');

const rows = [
  ...csvRows
    .filter(row => row.username && row.password)
    .map(row => ({
      username: String(row.username).trim(),
      password: String(row.password).trim(),
      expectedResult: String(row.expectedResult || 'success').trim().toLowerCase(),
      expectedMessage: row.expectedMessage ? String(row.expectedMessage).trim() : '',
      source: 'login-data.csv',
    })),
  ...excelRows
    .filter(row => row.username && row.password)
    .map(row => ({
      username: String(row.username).trim(),
      password: String(row.password).trim(),
      expectedResult: String(row.expectedResult || 'success').trim().toLowerCase(),
      expectedMessage: row.expectedMessage ? String(row.expectedMessage).trim() : '',
      source: 'employees.xlsx',
    })),
];

if (!rows.length) {
  throw new Error('No login credentials found in data/login-data.csv or data/employees.xlsx');
}

test.describe('Login data-driven scenarios', () => {
  for (const [index, row] of rows.entries()) {
    test(`${row.expectedResult === 'success' ? 'successful login' : 'failed login'} using ${row.username} from ${row.source || 'dataset'} #${index + 1}`, async ({ page }) => {
      const lp = new LoginPage(page);

      await lp.goto();
      await lp.login(row.username, row.password, { shouldSucceed: row.expectedResult === 'success' });

      if (row.expectedResult === 'success') {
        await lp.expectLoggedIn();
      } else {
        await lp.expectInvalidCredentialsError(row.expectedMessage || 'Invalid credentials');
      }
    });
  }
});
