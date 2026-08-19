const apiLocator = require('../../src/utils/ApiRetryUtil');
const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
const env =
require('../../src/utils/EnvironmentManager');
test('@api @smoke Verify Employee GET',
async () => {
const api =
new EmployeeApi();
const response =
await api.getEmployee(
`${env.apiBaseUrl}/users/2`
);
expect(
response.status()
).toBe(200);
});