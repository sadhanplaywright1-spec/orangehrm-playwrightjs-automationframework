const apiLocator = require('../../src/utils/ApiRetryUtil');
const { test, expect } = require('@playwright/test');
const EmployeeApi =require('../../src/api/EmployeeApi');
test('@api @regression Delete Employee',
async () => {
const api =
new EmployeeApi();
const response =
await api.deleteEmployee(
'https://reqres.in/api/users/2'
);
expect(
response.status()
).toBe(204);
});