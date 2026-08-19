const apiLocator = require('../../src/utils/ApiRetryUtil');
const { test, expect } =require('@playwright/test');
const EmployeeApi =
require('../../src/api/EmployeeApi');
test('@api @regression Patch Employee',
async () => {
const api =
new EmployeeApi();
const response =
await api.patchEmployee(
'https://reqres.in/api/users/2',
{
name: 'PatchedJohn'
}
);
expect(
response.status()
).toBe(200);
});