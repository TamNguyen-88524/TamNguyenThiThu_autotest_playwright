import { expect, Locator, Page } from "@playwright/test";



export class DetailPage {
    readonly page: Page;
    readonly ContainCumRap: Locator;
    readonly btnPlay: Locator;
    readonly ifrVideo: Locator;
    readonly btnBuyticket: Locator;

    constructor(page: Page) {
       this.page = page;    
        this.ContainCumRap = this.page.locator('#cinemaList');
        this.btnPlay = this.page.getByRole('button', { name: 'video-button' });
        this.ifrVideo = this.page.locator('iframe').contentFrame().locator('video');
        this.btnBuyticket = page
                            .locator('#lichChieu')
                            .getByRole('link', { name: 'MUA VÉ' });

    }
    async hoverMovie() {
        const linkMovie = this.page.locator(`div[class*="MuiGrid-root"][class*="MuiGrid-item"][class*="MuiGrid-grid-xs-3"][class*="jss"] > div`);
        await linkMovie.hover();
    }

    async clickPlay() {
        await this.btnPlay.click();
    }

    async clickBuyticket() {
        await this.btnBuyticket.click();
    }

    getContainCumRap(): Locator {
        return this.ContainCumRap;
    }

    async verifyContainCumRapVisible() {
        await expect(this.ContainCumRap).toBeVisible();
    }

    getifrVideo(): Locator {
        return this.ifrVideo;
    }

    async clickRandomRap() {
        const rapButtons = this.page.locator('div.MuiTabs-root.MuiTabs-vertical button');
        const total = await rapButtons.count();
        const randomIndex = Math.floor(Math.random() * total);
        await rapButtons.nth(randomIndex).click();
    }

    async clickRandomLichchieu() {
        // Lấy danh sách tất cả nút lịch chiếu
        const lichchieuButtons = this.page.locator('div.MuiBox-root [class*="jss"] a[href*="/purchase"]');
        const totalLichchieu = await lichchieuButtons.count();
        if (totalLichchieu === 0)
            throw new Error('Không tìm thấy lịch chiếu nào');
        // Random chọn 1 lịch chiếu
        const randomIndex = Math.floor(Math.random() * totalLichchieu);
        const selected = lichchieuButtons.nth(randomIndex);
        await selected.scrollIntoViewIfNeeded();
        // Lấy tên phim
        const nameFilmLocator = this.page.locator(
            'div[class*="MuiGrid-root"][class*="MuiGrid-container"][class*="MuiGrid-spacing-xs-1"] > div > h1'
        );
        const nameText = (await nameFilmLocator.textContent())?.trim();
        console.log(`Tên phim: ${nameText}`);

        // Lấy tên rạp — tìm phần tử cha gần nhất có h3
        const namerap = this.page.locator(`div.MuiGrid-container:has(a[href*="/purchase"]) h3`);
        const rapText = (await namerap.nth(randomIndex).textContent())?.trim();
        console.log(`Tên rạp: ${rapText}`);

        // Lấy thời gian chiếu
        const lichText = (await selected.textContent())?.trim();
        console.log(`Lịch chiếu: ${lichText}`);

        // Click lịch chiếu
        await selected.click();

        return { rapText, nameText, lichText };
    }


}