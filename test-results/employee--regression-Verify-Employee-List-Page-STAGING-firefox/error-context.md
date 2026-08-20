# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employee.spec.js >> @regression Verify Employee List Page
- Location: tests\ui\employee.spec.js:7:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.waitFor: Target page, context or browser has been closed
```

# Test source

```ts
  1  | class RetryLocator {
  2  | static async click(locator, retries = 3) {
  3  | for (let i = 1; i <= retries; i++) {
  4  | try {
> 5  | await locator.waitFor({
     |               ^ Error: locator.waitFor: Target page, context or browser has been closed
  6  | state: 'visible',
  7  | timeout: 5000
  8  | });
  9  | await locator.click();
  10 | return;
  11 | } catch (error) {
  12 | console.log(`Retry ${i}/${retries}`);
  13 | if (i === retries) {
  14 | throw error;
  15 | }
  16 | }
  17 | }
  18 | }
  19 | static async fill(locator, value, retries = 3) {
  20 | for (let i = 1; i <= retries; i++) {
  21 | try {
  22 | await locator.fill(value);
  23 | return;
  24 | } catch (error) {
  25 | if (i === retries) {
  26 | throw error;
  27 | }
  28 | }
  29 | }
  30 | }
  31 | }
  32 |  module.exports = RetryLocator;
```