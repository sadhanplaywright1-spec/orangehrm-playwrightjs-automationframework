const { test, expect, request, chromium } = require('@playwright/test');
const ApiClient = require('../../src/api/apiClient');
const Ajv = require('ajv');
const fs = require('fs');

const baseURL = process.env.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com';

async function loginAndGetContext() {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`${baseURL}/web/index.php/auth/login`);
    await page.locator("input[name='username']").fill(process.env.UI_USER || 'Admin');
    await page.locator("input[name='password']").fill(process.env.UI_PASS || 'admin123');
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/web/index.php/dashboard/index', { timeout: 20_000 });

    await page.context().storageState({ path: 'tmp-storage.json' });
    const ctx = await request.newContext({
      baseURL,
      storageState: 'tmp-storage.json',
    });
    return { ctx, browser };
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function getEmployeeWithRetry(api, employeeId, attempts = 5) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const response = await api.getEmployee(employeeId);
    if (response.status() === 200) {
      const body = await response.json();
      const employee = body.data || body;
      if (employee && (employee.empNumber || employee.id)) {
        return employee;
      }
    }

    if (attempt < attempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  throw new Error(`Employee ${employeeId} was not retrievable after ${attempts} attempts`);
}

test.describe('Employee API', () => {
  let api;
  let browser;

  test.beforeAll(async () => {
    const created = await loginAndGetContext();
    api = new ApiClient(created.ctx);
    browser = created.browser;
  });

  test.afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('create -> get employee and validate schema', async () => {
    const employeeId = String(Date.now() + Math.floor(Math.random() * 1000)).slice(-8);
    const payload = {
      firstName: 'Test',
      lastName: `Employee${Date.now()}`,
      middleName: '',
      employeeId,
    };

    const createRes = await api.createEmployee(payload);
    expect(createRes.status()).toBe(200);

    const body = await createRes.json();
    const employee = body.data || body;

    expect(employee).toBeTruthy();
    expect(employee.firstName).toBe(payload.firstName);
    expect(employee.lastName).toBe(payload.lastName);

    const empNumber = employee.empNumber || employee.id;
    const retrievedEmployee = await getEmployeeWithRetry(api, empNumber);
    expect(retrievedEmployee.firstName).toBe(payload.firstName);
    expect(retrievedEmployee.lastName).toBe(payload.lastName);

    const schemaPath = 'src/api/schemas/employee.schema.json';
    const schemaExists = fs.existsSync(schemaPath);
    if (schemaExists) {
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      expect(validate(retrievedEmployee), `API response should match schema: ${JSON.stringify(validate.errors)}`).toBe(true);
    }

    const deleteRes = await api.deleteEmployee(empNumber);
    expect([200, 204]).toContain(deleteRes.status());
  });
});