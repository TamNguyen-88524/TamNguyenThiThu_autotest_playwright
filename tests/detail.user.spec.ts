import { test, expect, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { BookingPage } from '../pages/BookingPage';
import { DetailPage } from '../pages/DetailPage';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let detailPage: DetailPage;
let bookingPage: BookingPage;
const validUser = {
  username: 'tam_01',
  password: '123456',
};
let selectedInfo: { rapText: string | undefined; nameText: string | undefined; lichText: string | undefined };

//test.describe('Detail User Future', () => {
test.describe.serial('Detail User Future', () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage(); 

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
    
    test.beforeEach(async () => {
        console.log('Trang Home - Đã đăng nhập')
        await homePage.hoverLink(); //Step 2: đi đến phim random trên danh sách phim
        await homePage.clickBuy(); //Step 3: Click Mua vé để chuyển đến detail        
        detailPage = new DetailPage(page);

    })

    test('Verify Play Movie', async () => {
        await detailPage.hoverMovie();//Step 2: hover video
        await detailPage.clickPlay(); //Step 3: Click video
        // step 3: check video play
        await expect(detailPage.getifrVideo()).toBeVisible();
    })

    test('Verify Click Mua Vé', async () => {
        await detailPage.clickBuyticket(); //Step 2: Click Mua vé
        // step 4: kiểm tra scroll to danh sách Cụm rạp và lịch chiếu
        //await expect(detailPage.getContainCumRap()).toBeInViewport();
    })

    test('Verify Chọn Rạp và lịch chiếu', async ()  => {
        await detailPage.clickBuyticket();  //Step 2: Click Mua vé
        await page.waitForTimeout(1000);
        await detailPage.clickRandomRap(); //Step 3: Click Random cụm Rạp tại danh sách
        await page.waitForTimeout(2000);
        selectedInfo = await detailPage.clickRandomLichchieu(); //Step 4: Click Random lịch chiếu của rạp
        bookingPage = new BookingPage(page);
        // step 6: kiểm tra hiển thị nút Đặt vé tại trang booking
        await bookingPage.verifyBooking();
        // Step 6: Verify trường tên phim,  tên rạp, thời gian trùng với lịch đặt
        const bookingInfo = await bookingPage.getBookingInfo();
        await expect(bookingInfo.name).toContain(selectedInfo.nameText);
        await expect(bookingInfo.cinema).toContain(selectedInfo.rapText);
        await expect(bookingInfo.time).toContain(selectedInfo.lichText);
    })
    
    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



