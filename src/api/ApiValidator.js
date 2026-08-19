class ApiValidator {
static async validateResponse(response) {
if (response.status() === 401) {
const body =
await response.text();
throw new Error(
`401 Unauthorized\n${body}`
);
}
return true;
}
}
module.exports = ApiValidator;