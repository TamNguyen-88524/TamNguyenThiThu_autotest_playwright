import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly registerLink: Locator;
  readonly loginErrorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#taiKhoan');
    this.passwordInput = page.locator('#matKhau');
    this.loginButton = page.getByRole('button', { name: /Đăng nhập/i });
    this.rememberMeCheckbox = page.getByRole('checkbox');
    this.registerLink = page.locator('form a[href="/sign-up"]');
    this.loginErrorAlert = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/sign-in');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }    
  
}
