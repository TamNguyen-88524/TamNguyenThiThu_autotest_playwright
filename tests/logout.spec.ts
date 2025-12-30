import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

let page: Page;
let homePage: HomePage;

const validUser = {
  username: 'tam_01',
  password: '123456',
};

test.describe.serial('Verify Logout', () => {

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    homePage = new HomePage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('TCS_01: Logout thành công khi chọn Đồng ý', async () => {
    await homePage.clickLogout();
    await homePage.confirmLogout();

    await expect (page.locator('div a[href="/sign-up"]')).toBeVisible();
  });

});
