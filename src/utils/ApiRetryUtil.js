class ApiRetryUtil {
static async execute(apiCall, maxRetries = 3) {
let attempt = 0;
while (attempt < maxRetries) {
try {
return await apiCall();
} catch (error) {
attempt++;
if (attempt === maxRetries) {
throw error;
}
}
}
}
}
module.exports = ApiRetryUtil;