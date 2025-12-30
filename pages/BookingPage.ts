import { expect, Locator, Page } from "@playwright/test";

export class BookingPage {
    readonly page: Page;
    readonly btnBooking: Locator;
    readonly lblNoLoginMsg: Locator;
    readonly btnYesLogon: Locator;
    readonly btnNoLogon: Locator;
    readonly lblChuaChonGheMsg: Locator;
    readonly lblthanhcongMsg: Locator;
    readonly btnDongY: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnBooking = this.page.getByRole('button', { name: 'ĐẶT VÉ' });
        this.lblNoLoginMsg = this.page.getByRole('heading', { name: 'Bạn chưa đăng nhập' });
        this.btnYesLogon = this.page.getByRole('button', { name: 'Đồng ý' });
        this.btnNoLogon = this.page.getByRole('button', { name: 'Không' });
        this.lblChuaChonGheMsg = this.page.getByRole('heading', { name: 'Bạn chưa chọn ghế' });
        this.lblthanhcongMsg = this.page.getByRole('heading', { name: 'Đặt vé thành công' });
        this.btnDongY = this.page.getByRole('button', { name: 'Đồng ý' });
    }

    getlblChuaChonGheMsg(): Locator {
        return this.lblChuaChonGheMsg;
    }

    getlblthanhcongMsg(): Locator {
        return this.lblthanhcongMsg;
    }

    getlblNoLoginMsg(): Locator {
        return this.lblNoLoginMsg;
    }

    async verifyBooking() {
        await expect(this.btnBooking).toBeVisible();
    }

    async clickBooking() {
        await this.btnBooking.click();
    }

    async clickYesLogon() {
        await this.btnYesLogon.click();
    }

    async clickNoLogon() {
        await this.btnNoLogon.click();
    }

    async clickDongY() {
        await this.btnDongY.click();
    }

    async getBookingInfo() {
        const name = (await this.page.locator("//h3[contains(text(),'Tên Phim')]/following-sibling::h3").textContent())?.trim();;
        const cinema = (await this.page.locator('//h3[contains(text(),"Cụm Rạp")]/following-sibling::h3').textContent())?.trim();
        const time = (await this.page.locator('//h3[contains(text(),"Ngày giờ chiếu")]/following-sibling::h3').textContent())?.trim();
        const seat = (await this.page.locator('//h3[contains(text(),"Chọn")]/following-sibling::h3').textContent())?.trim();
        console.log(`Tên phim: ${name} | Tên rạp: ${cinema} | Lịch chiếu: ${time}`);
        return { name, cinema, time, seat };
    }

    async selectRandomAvailableSeat() {
        // Đợi ghế hiển thị
        await this.page.waitForSelector('button.MuiButtonBase-root.MuiButton-root', { state: 'visible' });
        // Lấy danh sách ghế có thể chọn
        const availableSeats = this.page.locator(
            'button.MuiButtonBase-root.MuiButton-root:not([disabled]):not(.Mui-disabled)'
        );
        const total = await availableSeats.count();
        console.log(`Tổng ghế khả dụng: ${total}`);

        if (total === 0) throw new Error('Không tìm thấy ghế nào khả dụng');

        // Random ghế
        const randomIndex = Math.floor(Math.random() * total);
        const randomSeat = availableSeats.nth(randomIndex);
        const seatText = (await randomSeat.textContent())?.trim() || `(Ghế #${randomIndex})`;
        console.log(`Chọn random ghế: ${seatText}`);

        await randomSeat.click();
        return { seatText, randomIndex };
    }

    async selectRandomSeats(min = 2, max = 3) {
        // Đợi ghế load xong
        await this.page.waitForSelector('button.MuiButtonBase-root.MuiButton-root', { state: 'visible' });
        // Lấy danh sách ghế có thể chọn
        const availableSeats = this.page.locator(
            'button.MuiButtonBase-root.MuiButton-root:not([disabled]):not(.Mui-disabled)'
        );

        const total = await availableSeats.count();
        console.log(`Tổng ghế khả dụng: ${total}`);
        if (total === 0) throw new Error('Không có ghế khả dụng để chọn.');

        // Random số lượng ghế muốn chọn (2 hoặc 3)
        const seatCountToSelect = Math.floor(Math.random() * (max - min + 1)) + min;
        // tránh trùng ghế
        const selectedIndexes = new Set<number>();
        while (selectedIndexes.size < seatCountToSelect) {
            selectedIndexes.add(Math.floor(Math.random() * total));
        }
        // Lặp và click từng ghế
        const selectedSeats: string[] = [];
        for (const index of selectedIndexes) {
            const seat = availableSeats.nth(index);
            const seatText = (await seat.textContent())?.trim() || `Ghế #${index}`;
            await seat.scrollIntoViewIfNeeded();
            await seat.click();
            selectedSeats.push(seatText);
            console.log(`Chọn ghế: ${seatText}`);
            await this.page.waitForTimeout(300);
        }
        console.log(`Đã chọn ${selectedSeats.length} ghế: [${selectedSeats.join(', ')}]`);
        return selectedSeats;
    }


}