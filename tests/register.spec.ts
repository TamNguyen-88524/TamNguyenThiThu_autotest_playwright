import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { newUser, duplicateUsername, notconfirmpassword, invalidEmailUser } from '../test-data/users';

test.describe('Register Baseline', () => {

  test('REGISTER_01 - Load trang Register', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await expect(page).toHaveURL(/sign-up/i);
  });  

  test('REGISTER_02 - Đăng ký không thành công: trùng tài khoản', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      duplicateUsername.username,
      duplicateUsername.password,
      duplicateUsername.confirmpassword,
      duplicateUsername.name,
      duplicateUsername.email);
      
    await registerPage.submitEmpty();     
  });
 
  test('REGISTER_03 - Đăng ký không thành công: xác nhận không đúng mật khẩu ', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      notconfirmpassword.username,
      notconfirmpassword.password,
      notconfirmpassword.confirmpassword,
      notconfirmpassword.name,
      notconfirmpassword.email);
      
    await registerPage.submitEmpty();
    await expect(
        page.locator('#confirmPassWord-helper-text')
        ).toContainText('Mật khẩu không khớp !');

  });

  test('REGISTER_04 - Đăng ký không thành công: email không đúng', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      invalidEmailUser.username,
      invalidEmailUser.password,
      invalidEmailUser.confirmpassword,
      invalidEmailUser.name,
      invalidEmailUser.email);
      
    await registerPage.submitEmpty();
    await expect(
        page.locator('#email-helper-text')
        ).toContainText('Email không đúng định dạng !');
         
  });

   test('REGISTER_05 - Trường thông tin bắt buộc nhập: Tài khoản', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      '',
      newUser.password,
      newUser.confirmpassword,
      newUser.name,
      newUser.email);
      
    await registerPage.submitEmpty();
    await expect(page.locator('#taiKhoan-helper-text'))
                .toContainText('Đây là trường bắt buộc !');;
  });

  test('REGISTER_06 - Trường thông tin bắt buộc nhập: Mật khẩu', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      newUser.username,
      '',
      newUser.confirmpassword,
      newUser.name,
      newUser.email);
      
    await registerPage.submitEmpty();
   await expect(
        page.locator('#matKhau-helper-text')
        ).toContainText('Đây là trường bắt buộc !');
  });

  test('REGISTER_07 - Trường thông tin bắt buộc nhập: Xác nhận mật khẩu', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      newUser.username,
      newUser.password,
      '',
      newUser.name,
      newUser.email);
      
    await registerPage.submitEmpty();
    await expect(
        page.locator('#confirmPassWord-helper-text')
        ).toContainText('Đây là trường bắt buộc !');
            
  });
  test('REGISTER_08 - Trường thông tin bắt buộc nhập: Họ tên', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      newUser.username,
      newUser.password,
      newUser.confirmpassword,      
      '',
      newUser.email);
      
    await registerPage.submitEmpty();
    await expect(
        page.locator('#hoTen-helper-text')
        ).toContainText('Đây là trường bắt buộc !');
  });

  test('REGISTER_09 - Trường thông tin bắt buộc nhập: email', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      newUser.username,
      newUser.password,
      newUser.confirmpassword,   
      newUser.name,   
      '');
      
    await registerPage.submitEmpty();
    await expect(
        page.locator('#email-helper-text')
        ).toContainText('Đây là trường bắt buộc !');
  });

  test('REGISTER_10 - Email đã tồn tại', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    // await registerPage.register(
    //   newUser.username,
    //   newUser.password,
    //   newUser.confirmpassword,   
    //   newUser.name,   
    //   'tam01@gmail.com');

    await registerPage.register(
      'tam01',
      '123456',
      '123456',   
      'tam',   
      'tam01@gmail.com');
      
    await registerPage.submitEmpty();
    await registerPage.expectRegisterEmailErr('Email đã tồn tại!');
  });

  test('REGISTER_11 - Đăng ký thành công với dữ liệu hợp lệ', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      newUser.username,
      newUser.password,
      newUser.confirmpassword,
      newUser.name,
      newUser.email);
      
    await registerPage.submitEmpty();
    await registerPage.expectRegisterSuccess('text=Đăng ký thành công');
    
  });
});
