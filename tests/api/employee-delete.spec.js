const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
const ApiLogger = require('../../src/utils/ApiLogger');
const ApiRetry = require('../../src/utils/ApiRetryUtil');
const env = require('../../src/utils/EnvironmentManager');
test('@api @regression Verify Employee DELETE',
async ({}, testInfo) => {
const api = new EmployeeApi();
const startTime = Date.now();
const response = await ApiRetry.execute(async () => {
return await api.deleteEmployee(
`${env.apiBaseUrl}/users/2`
);
});
await ApiLogger.log(
testInfo,
'DELETE',
'/users/2',
{},
response,
startTime
);
expect(response.status()).toBe(204);
});