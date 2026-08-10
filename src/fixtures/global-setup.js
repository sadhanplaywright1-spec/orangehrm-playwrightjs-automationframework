const { request } = require('@playwright/test');
const fs = require('fs');

module.exports = async () => {
  const apiBaseUrl = process.env.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com';
  const token = process.env.API_TOKEN;

  if (!token) {
    return;
  }

  const ctx = await request.newContext({
    baseURL: apiBaseUrl,
    extraHTTPHeaders: { Authorization: `Bearer ${token}` },
  });

  const res = await ctx.post('/api/test-data/users', {
    data: { role: 'test', label: `test-${Date.now()}` },
  });

  const user = await res.json();
  fs.writeFileSync('.teststate.json', JSON.stringify({ sharedUserId: user.id }));
  await ctx.dispose();
};
