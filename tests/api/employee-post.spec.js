const { test, expect } = require('@playwright/test');
const ApiLogger = require('../../src/utils/ApiLogger');
const EmployeeApi = require('../../src/api/EmployeeApi');
const ApiRetry = require('../../src/utils/ApiRetryUtil');
test('@api @regression Verify Employee POST', async ({}, testInfo) => {
const api = new EmployeeApi();
const payload = {
name: 'Sadhan',
job: 'QA Engineer'
};
const startTime = Date.now();
const response = await ApiRetry.execute(async () => {  
return await api.createEmployee(
'https://reqres.in/api/users/2',payload);
}
);
console.log(await response.text());
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