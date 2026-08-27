# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> @regression Verify Employee List Page
- Location: tests\ui\login.spec.js:6:1

# Error details

```
Test timeout of 60000ms exceeded while setting up "page".
```

```
TypeError: Cannot read properties of null (reading 'on')
```

```
Error: browserContext.close: Protocol error (Browser.removeBrowserContext): can't access property "_maybeDontRestoreTabs", this._windows[aWindow.__SSi] is undefined
```