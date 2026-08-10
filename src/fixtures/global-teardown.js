const { request } = require('@playwright/test');
const fs = require('fs');

module.exports = async () => {
  if (!fs.existsSync('.teststate.json')) {
    return;
  }

  const state = JSON.parse(fs.readFileSync('.teststate.json', 'utf8'));
  const apiBaseUrl = process.env.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com';
  const token = process.env.API_TOKEN;

  if (!token || !state.sharedUserId) {
    return;
  }

  const ctx = await request.newContext({
    baseURL: apiBaseUrl,
    extraHTTPHeaders: { Authorization: `Bearer ${token}` },
  });

  await ctx.delete(`/api/test-data/users/${state.sharedUserId}`);
  await ctx.dispose();
};
