class ApiLogger {
static log(message) {
console.log(`[API LOG] ${message}`);
}
static info(message) {
console.log(`[INFO] ${message}`);
}
static error(message) {
console.error(`[ERROR] ${message}`);
}
}
module.exports = ApiLogger;