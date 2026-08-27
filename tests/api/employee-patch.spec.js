const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
const ApiLogger = require('../../src/utils/ApiLogger');
const ApiRetry = require('../../src/utils/ApiRetryUtil');
const env = require('../../src/utils/EnvironmentManager');
const PayloadBuilder = require('../../src/api/PayloadBuilder');
test('@api @regression Verify Employee PATCH',
async ({}, testInfo) => {
const api = new EmployeeApi();
const payload =
PayloadBuilder.patchEmployee();
const startTime = Date.now();
const response = await ApiRetry.execute(async () => {
return await api.patchEmployee(
`${env.apiBaseUrl}/users/2`,
payload
);
});
await ApiLogger.log(
testInfo,
'PATCH',
'/users/2',
payload,
response,
startTime
);
expect(response.status()).toBe(200);
});