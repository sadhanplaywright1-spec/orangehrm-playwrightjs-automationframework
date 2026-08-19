const { request } =require('@playwright/test');
const TokenManager =require('./TokenManager');
class ApiClient {
static getHeaders() {
return {
Authorization:
`Bearer ${TokenManager.getToken()}`,
'Content-Type':
'application/json'
};
}
static async get(url) {
const context =
await request.newContext();
return await context.get(
url,
{
headers:this.getHeaders()
}
);
}
static async post(url,payload) {
const context =
await request.newContext();
return await context.post(
url,
{
data:payload,
headers:this.getHeaders()
}
);
}
static async put(url,payload) {
const context =
await request.newContext();
return await context.put(
url,
{
data:payload,
headers:this.getHeaders()
}
);
}
static async patch(url,payload) {
const context =
await request.newContext();
return await context.patch(
url,
{
data:payload,
headers:this.getHeaders()
}
);
}
static async delete(url) {
const context =
await request.newContext();
return await context.delete(
url,
{
headers:this.getHeaders()
}
);
}
}
module.exports = ApiClient;