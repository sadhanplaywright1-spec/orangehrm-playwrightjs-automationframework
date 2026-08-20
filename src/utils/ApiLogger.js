class ApiLogger {
static async log(
testInfo,
method,
url,
payload,
response,
startTime
) {
await testInfo.attach(
'Request',
{
body: Buffer.from(JSON.stringify(payload, null, 2)),
contentType: 'application/json'
}
);
await testInfo.attach(
'Response',
{
body: Buffer.from(await response.text()),
contentType: 'application/json'
}
);
}
}
module.exports = ApiLogger;