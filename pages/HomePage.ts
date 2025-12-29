import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly movieCards: Locator;
  readonly logoutButton: Locator;
  readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;

    // Danh sách phim
    this.movieCards = page.locator('.MuiCard-root');

    // Tên user (Tam Tam)
    this.userName = page.getByText(/Tam Tam/i);

    // Đăng xuất
    this.logoutButton = page.getByText('Đăng xuất');
  }

  async verifyOnHomePage() {
    await expect(this.page).toHaveURL(/\/$/);
  }

  async verifyMovieListVisible() {
    await expect(this.movieCards.first()).toBeVisible();
  }

  async verifyUserNameVisible() {
    await expect(this.userName).toBeVisible();
  }

  async verifyLogoutVisible() {
    await expect(this.logoutButton).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
