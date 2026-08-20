# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> @regression Verify Employee List Page
- Location: tests\ui\login.spec.js:6:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('h6')
Expected: visible
Received: undefined

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('h6')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e6]:
    - generic [ref=e7]:
      - img "company-branding"
    - generic [ref=e8]:
      - heading "Login" [level=5] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e12]:
          - paragraph [ref=e13]: "Username : Admin"
          - paragraph [ref=e14]: "Password : admin123"
        - generic [ref=e15]:
          - generic [ref=e17]:
            - generic [ref=e18]:
              - generic [ref=e19]: 
              - generic [ref=e20]: Username
            - textbox "Username" [active] [ref=e22]: Admin
          - generic [ref=e24]:
            - generic [ref=e25]:
              - generic [ref=e26]: 
              - generic [ref=e27]: Password
            - textbox "Password" [ref=e29]
          - button "Login" [ref=e31] [cursor=pointer]
          - paragraph [ref=e33] [cursor=pointer]: Forgot your password?
      - generic [ref=e34]:
        - generic [ref=e35]:
          - link [ref=e36] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/orangehrm/mycompany/
          - link [ref=e39] [cursor=pointer]:
            - /url: https://www.facebook.com/OrangeHRM/
          - link [ref=e42] [cursor=pointer]:
            - /url: https://twitter.com/orangehrm?lang=en
          - link [ref=e45] [cursor=pointer]:
            - /url: https://www.youtube.com/c/OrangeHRMInc
        - generic [ref=e48]:
          - paragraph [ref=e49]: OrangeHRM OS 5.9
          - paragraph [ref=e50]:
            - text: © 2005 - 2026
            - link "OrangeHRM, Inc" [ref=e51] [cursor=pointer]:
              - /url: http://www.orangehrm.com
            - text: . All rights reserved.
  - generic [ref=e52]:
    - img "orangehrm-logo"
```

# Test source

```ts
  1  | const apiLocator = require('../../src/utils/RetryLocator');
  2  | const {test,expect} = require('../../src/fixtures/CustomFixtures');
  3  | const LoginPage =require('../../src/pages/LoginPage');
  4  | const DashboardPage =require('../../src/pages/DashboardPage');
  5  | const env =require('../../src/utils/EnvironmentManager');
  6  | test('@regression Verify Employee List Page', async ({ page }) =>{
  7  | await page.goto(env.baseURL);
  8  | const loginPage =new LoginPage(page);
  9  | await loginPage.login(env.username,env.password)
> 10 | await expect(page.locator('h6')).toBeVisible();
     |                                  ^ Error: expect(locator).toBeVisible() failed
  11 | const dashboardPage =new DashboardPage(page);
  12 | await expect(dashboardPage.dashboardHeader).toBeVisible();
  13 | });
```