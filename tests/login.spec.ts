import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login – Baseline (POM)', () => {

  test('LOGIN_01 - Load trang Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(page).toHaveURL(/sign-in/i);
  });

  test('LOGIN_02 - Login thất bại khi để trống username & password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    // UI-only assert: không redirect
    await expect(page).toHaveURL(/sign-in/i);
    await expect(
            page.locator('#taiKhoan-helper-text')
            ).toContainText('Đây là trường bắt buộc');
    await expect(
            page.locator('#matKhau-helper-text')
            ).toContainText('Đây là trường bắt buộc');        
  });

  test('LOGIN_03 - Login thất bại với username không tồn tại', async ({ page }) => {
    const loginPage = new LoginPage(page);
    

    await loginPage.goto();
    await loginPage.login('user_khong_ton_tai', '123456');

    await expect(page).toHaveURL(/sign-in/i);    
    await expect(loginPage.loginErrorAlert).toContainText('Tài khoản hoặc mật khẩu không đúng!');
  });

  test('LOGIN_04 - Login thất bại với password sai', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tam01', 'pass-sai');

    await expect(page).toHaveURL(/sign-in/i);    
    await expect(loginPage.loginErrorAlert).toContainText('Tài khoản hoặc mật khẩu không đúng!');
  });  

  test('LOGIN_ - Điều hướng sang trang Đăng ký', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.registerLink.click();

    await expect(page).toHaveURL(/sign-up/i);
  });

  test('LOGIN_06 - Đăng nhập thành công', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tam_01', '123456');

    // 1️⃣ Redirect khỏi trang login
    await expect(page).not.toHaveURL(/sign-in/i);
    // 2️⃣ Đăng nhập thành công
    await expect(
              page.getByRole('link', { name: /đăng xuất/i })
              ).toBeVisible();
          });

});
