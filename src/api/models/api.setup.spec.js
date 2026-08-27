const { test } = require('@playwright/test');
const TokenManager =require('../TokenManager');
test.beforeAll(async () => {
const token =
process.env.API_TOKEN;
TokenManager.setToken(token);
});
