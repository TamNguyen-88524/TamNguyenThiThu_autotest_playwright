import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
//import { validUser } from '../test-data/users';

test.describe('Home: After Login', () => {

  export const validUser = {
    username: 'tamntt',
    password: '123456'
  };

  test('HOME_01: Login thành công và hiển thị trang Home', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await homePage.verifyOnHomePage();
  });

  test('HOME_02: Hiển thị danh sách phim', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await homePage.verifyMovieListVisible();
  });

  test('HOME_03: Hiển thị tên user sau login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await homePage.verifyUserNameVisible();
  });

  test('HOME_04: Có nút Đăng xuất', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await homePage.verifyLogoutVisible();
  });

  test('HOME_05: Đăng xuất thành công', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await homePage.logout();
    await expect(page).toHaveURL(/sign-in/i);
  });

});
