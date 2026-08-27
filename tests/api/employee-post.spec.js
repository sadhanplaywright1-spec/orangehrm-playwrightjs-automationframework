const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
const ApiLogger = require('../../src/utils/ApiLogger');
const ApiRetry = require('../../src/utils/ApiRetryUtil');
const env = require('../../src/utils/EnvironmentManager');
const TestDataLoader = require('../../src/api/TestDataLoader');
const PayloadBuilder = require('../../src/api/PayloadBuilder');
test('@api @smoke Verify Employee POST',
async ({}, testInfo) => {
const api = new EmployeeApi();
const employeeData =
TestDataLoader.getEmployeeData(
testInfo.project.name
);
const payload =
PayloadBuilder.employee(employeeData);
const startTime = Date.now();
const response = await ApiRetry.execute(async () => {
return await api.createEmployee(
`${env.apiBaseUrl}/users`,
payload
);
});
await ApiLogger.log(
testInfo,
'POST',
'/users',
payload,
response,
startTime
);
expect(response.status()).toBe(201);
});