import { test, expect, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { BookingPage } from '../pages/BookingPage';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let bookPage: BookingPage;

const validUser = {
  username: 'tam_01',
  password: '123456',
};

//let selectedInfo: { rapText: string | undefined; nameText: string | undefined; lichText: string | undefined };
test.describe('Booking User Future', () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage(); // ✅ FIX QUAN TRỌNG
    
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
    
        // Verify login thành công
        await expect(page).not.toHaveURL(/sign-in/i);
    
        homePage = new HomePage(page);
      });
    
      test.afterAll(async () => {
        if (!page.isClosed()) {
          await page.close();
        }
      });

    test('BOOKING_01: Verify Nhấn đặt vé khi chưa chọn ghế', async () => {
        console.log('Verify Nhấn đặt vé khi chưa chọn ghế');
        await bookingPage.clickBooking(); // Step 7: Click Đặt vé
        //VP: 'Bạn chưa chọn ghế' message display
        await expect(bookingPage.getlblChuaChonGheMsg()).toBeInViewport();
    })

    test('Verify Nhấn đặt 1 vé thành công', async ({ bookingPage }) => {
        console.log('Verify Nhấn đặt 1 vé thành công');
        const { seatText } = await bookingPage.selectRandomAvailableSeat(); // Step 7: chọn ghế
        console.log(`Đã chọn ghế: ${seatText}`);
        await bookingPage.clickBooking(); // Step 8: Click Đặt vé
        //VP: 'Đặt vé thành công' message display
        await expect(bookingPage.getlblthanhcongMsg()).toBeInViewport();
    })

    test('Verify Nhấn đặt nhiều vé thành công', async ({ bookingPage }) => {
        console.log('Verify Nhấn đặt nhiều vé thành công');
        const selectedSeats = await bookingPage.selectRandomSeats(2, 3);
        console.log(`Các ghế đã chọn: ${selectedSeats.join(', ')}`);
       // verify ghế hiển thị trong thông tin thanh toán
        const bookingInfo = await bookingPage.getBookingInfo();
        for (const seat of selectedSeats) {
            await expect(bookingInfo.seat).toContain(seat);
        }
        await bookingPage.clickBooking(); // Step 8: Click Đặt vé
        //VP: 'Đặt vé thành công' message display
        await expect(bookingPage.getlblthanhcongMsg()).toBeInViewport();
       

    })

    test('Verify lịch sử đặt vé', async ({ bookingPage, page }) => {
        console.log('Verify lịch sử đặt vé');
        const { seatText } = await bookingPage.selectRandomAvailableSeat(); // Step 7: chọn ghế
        console.log(`Đã chọn ghế: ${seatText}`);
        await bookingPage.clickBooking(); // Step 8: Click Đặt vé
        await page.waitForTimeout(1000);
        await bookingPage.clickDongY(); // Step 9: Click Đồng ý kiểm tra lịch sử đặt vé
        // Step 4: Verify trường cụm rạp, tên phim, giờ chiếu, số ghế
        const bookingInfo = await bookingPage.getBookingInfo();
        await expect(bookingInfo.name).toContain(selectedInfo.nameText);
        await expect(bookingInfo.cinema).toContain(selectedInfo.rapText);
        //await expect(bookingInfo.time).toContain(selectedInfo.lichText);
        await expect(bookingInfo.seat).toContain(seatText);

    })

    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



