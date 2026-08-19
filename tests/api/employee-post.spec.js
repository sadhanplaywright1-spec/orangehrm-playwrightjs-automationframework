const apiLocator = require('../../src/utils/ApiRetryUtil');
const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
test('@api @regression Create Employee', async () => {
const api = new EmployeeApi();
const response = await api.createEmployee(
'https://reqres.in/api/users',
{
name: 'John',job: 'QA Engineer'}
);
console.log(await response.text());
expect(response.status()).toBe(201);
});