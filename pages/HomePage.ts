import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly movieCards: Locator;
  readonly logoutButton: Locator;
  readonly userName: Locator;
  readonly logoutPopup: Locator;
  readonly confirmLogoutButton: Locator;
  readonly cancelLogoutButton: Locator;
  readonly BtnLichChieu: Locator;
  readonly BtnCumRap: Locator;
  readonly BtnTinTuc: Locator;
  readonly BtnUngDung: Locator;
  readonly ContainLichChieu: Locator;
  readonly ContainTinTuc: Locator;
  readonly ContainUngDung: Locator;
  readonly ContainCumRap: Locator;
  readonly ifrVideo: Locator;   
  readonly btnPlay: Locator; 
  readonly btnBuy: Locator;

  constructor(page: Page) {
    this.page = page;

    // Danh sách phim
    this.movieCards = this.page.locator('select[name="cinema"]');   

    // Tên user (Tam Tam)
    this.userName = page.getByText(/Tam Tam/i);
    // Đăng xuất
    this.logoutButton = page.getByText('Đăng xuất');    
    this.logoutPopup = page.getByText('Bạn có muốn đăng xuất ?');
    this.confirmLogoutButton = page.getByRole('button', { name: 'Đồng ý' });
    this.cancelLogoutButton = page.getByRole('button', { name: 'Hủy' });
    //Menu click
    this.BtnLichChieu = this.page.locator('a').filter({ hasText: 'Lịch Chiếu' });
    this.BtnCumRap = this.page.locator('a').filter({ hasText: 'Cụm Rạp' });
    this.BtnTinTuc = this.page.locator('a').filter({ hasText: 'Tin Tức' });
    this.BtnUngDung = this.page.locator('a').filter({ hasText: 'Ứng Dụng' });
    //Details
    this.ContainLichChieu = this.page.locator('#lichChieu');
    this.ContainTinTuc = this.page.locator('//div[@id="tinTuc"]');
    this.ContainUngDung = this.page.locator('#ungDung');    
    this.ContainCumRap = this.page.locator('#cumRap');
    this.ifrVideo = this.page.locator('iframe').contentFrame().locator('video');
    this.btnPlay = this.page.getByRole('button', { name: 'video-button'}); 
    // this.btnBuy = this.page.getByRole('link', { name: 'MUA VÉ', exact: true }).first();
    this.btnBuy = this.page.locator('a[href^="/purchase/"]').first();
  }

  async verifyOnHomePage() {
    await expect(this.page).toHaveURL(/\/$/);
  }

  async getSelectCinema() {
        await this.movieCards.click();
    }


  async verifyUserNameVisible() {
    await expect(this.userName).toBeVisible();
  }

  async verifyLogoutVisible() {
    await expect(this.logoutButton).toBeVisible();
  }

  async clickLogout() {
    await this.logoutButton.click();
    await expect(this.logoutPopup).toBeVisible();
  }

  async confirmLogout() {
    await this.confirmLogoutButton.click();
  }

  async cancelLogout() {
    await this.cancelLogoutButton.click();
  }

  async navigateLichChieu() {
        await this.BtnLichChieu.click();
    }

  async navigateCumRap() {
        await this.BtnCumRap.click();
    }

    async navigateTinTuc() {
        await this.BtnTinTuc.click();
    }

    async navigateUngDung() {
        await this.BtnUngDung.click();
    }

  async clickMenu(menu: 'Lịch Chiếu' | 'Cụm Rạp' | 'Tin Tức' | 'Ứng Dụng') {
        switch (menu) {
            case 'Lịch Chiếu': this.navigateLichChieu(); break;
            case 'Cụm Rạp': this.navigateCumRap(); break;
            case 'Tin Tức': this.navigateTinTuc(); break;
            case 'Ứng Dụng': this.navigateUngDung(); break;
        }
    }

    async clickBuy() {
        await this.btnBuy.click();
    }

    //
    async clickPlay() {
        await this.btnPlay.click();
    }

    async hoverLink() {
        //const randomIndex = this.page.locator('#lichChieu');
        const linkMovie = this.page.locator(
            `//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]
            //div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-3"][2]`
        );
        await linkMovie.hover();
    }

    getifrVideo(): Locator {
        return this.ifrVideo;
    }
    async clickMovieAndPlay() {
        await this.hoverLink();
        await this.clickPlay();
    }

    getContainLichChieu(): Locator {
        return this.ContainLichChieu;
    }

    getContainCumRap(): Locator {
        return this.ContainCumRap;
    }

    getContainTinTuc(): Locator {
        return this.ContainTinTuc;
    }

    getContainUngDung(): Locator {
        return this.ContainUngDung;
    }

}
