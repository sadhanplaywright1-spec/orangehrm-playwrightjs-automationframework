const { test } = require('@playwright/test');
const TokenManager =
require('../../src/api/TokenManager');
test.beforeAll(async () => {
const token =
process.env.API_TOKEN;
TokenManager.setToken(token);
});