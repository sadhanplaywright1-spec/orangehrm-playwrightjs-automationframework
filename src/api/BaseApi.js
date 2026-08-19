const apiLocator = require('../../src/utils/ApiRetryUtil');
require('dotenv').config();
const { request } =
require('@playwright/test');
class BaseApi {
async createContext() {
return await request.newContext({
extraHTTPHeaders: {
'Content-Type':
'application/json',
'x-api-key':
process.env.REQRES_API_KEY
}
});
}
async get(url) {
const context =
await this.createContext();
return await context.get(url);
}
async post(url, payload) {
const context =
await this.createContext();
return await context.post(
url,
{
data: payload
}
);
}
async put(url, payload) {
const context =
await this.createContext();
return await context.put(
url,
{
data: payload
}
);
}
async patch(url, payload) {
const context =
await this.createContext();
return await context.patch(
url,
{
data: payload
}
);
}
async delete(url) {
const context =
await this.createContext();
return await context.delete(url);
}
}
module.exports = BaseApi;