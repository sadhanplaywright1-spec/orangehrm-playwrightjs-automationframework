const { test, expect } = require('@playwright/test');
const ApiLogger = require('../../src/utils/ApiLogger');
const EmployeeApi = require('../../src/api/EmployeeApi');
const ApiRetry = require('../../src/utils/ApiRetryUtil');
test('@api @regression Verify Employee POST', async ({}, testInfo) => {
const api = new EmployeeApi();
const payload = {
name: 'PatchedJohn',
job: 'leader'
};
const startTime = Date.now();
const response = await ApiRetry.execute(async () => {  
return await api.patchEmployee(
'https://reqres.in/api/users/2',payload);
}
);
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