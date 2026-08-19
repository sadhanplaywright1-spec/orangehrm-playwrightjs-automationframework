const apiLocator = require('../../src/utils/ApiRetryUtil');
const { test, expect } =
require('@playwright/test');
const EmployeeApi =
require('../../src/api/EmployeeApi');
test('@api @regression Update Employee',
async () => {
const api =
new EmployeeApi();
const response =
await api.updateEmployee(
'https://reqres.in/api/users/2',
{
name: 'UpdatedJohn',
job: 'Manager'
}
);
expect(
response.status()
).toBe(200);
});