import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  readonly taikhoanInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmpasswordInput: Locator;
  readonly nameInput: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;
  readonly emailMessageErr: Locator;

  constructor(page: Page) {
    this.page = page;

    this.taikhoanInput = page.locator('#taiKhoan');
    this.passwordInput = page.locator('#matKhau');
    this.confirmpasswordInput = page.locator('#confirmPassWord');
    this.nameInput = page.locator('#hoTen');
    this.emailInput = page.locator('#email');
    this.registerButton = page.getByRole('button', { name: /đăng ký/i });
    this.successMessage = page.locator('#swal2-title');
    this.emailMessageErr = page.locator('.MuiAlert-message');

  }

  async goto() {
    await this.page.goto('/sign-up');
  }

  async submitEmpty() {
    await this.registerButton.click();
  }

  async register(taikhoan: string, password: string, confirmpassword: string, name: string, email: string) {
    await this.nameInput.fill(taikhoan);
    await this.passwordInput.fill(password);
    await this.confirmpasswordInput.fill(confirmpassword);
    await this.emailInput.fill(name);
    await this.emailInput.fill(email);
  }

  async expectRegisterSuccess(expected: string) {
    
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(expected);
  }
  async expectRegisterEmailErr(expected: string) {    
    await expect(this.emailMessageErr).toContainText('Email đã tồn tại');
    
  }
}
