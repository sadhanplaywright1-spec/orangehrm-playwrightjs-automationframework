class RetryLocator {
static async click(locator, retries = 3) {
for (let i = 1; i <= retries; i++) {
try {
await locator.waitFor({
state: 'visible',
timeout: 5000
});
await locator.click();
return;
} catch (error) {
console.log(`Retry ${i}/${retries}`);
if (i === retries) {
throw error;
}
}
}
}
static async fill(locator, value, retries = 3) {
for (let i = 1; i <= retries; i++) {
try {
await locator.fill(value);
return;
} catch (error) {
if (i === retries) {
throw error;
}
}
}
}
}
 module.exports = RetryLocator;