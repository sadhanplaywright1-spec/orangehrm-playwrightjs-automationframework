const { test, expect } = require('@playwright/test');
const ApiLogger = require('../../src/utils/ApiLogger');
const EmployeeApi = require('../../src/api/EmployeeApi');
const ApiRetry = require('../../src/utils/ApiRetryUtil');
test('@api @regression Verify Employee POST', async ({}, testInfo) => {
const api = new EmployeeApi(); 
const payload = {
name: 'Sadhan',
job: 'QA Lead'
};
const startTime = Date.now();
const response = await ApiRetry.execute(async () => {
return await api.deleteEmployee('https://reqres.in/api/users/2');
});
await ApiLogger.log(
testInfo,
'DELETE',
'/users/2',
payload,
response,
startTime
);
expect(response.status()).toBe(204);
});