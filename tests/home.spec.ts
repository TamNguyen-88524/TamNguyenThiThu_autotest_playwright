import { test, expect, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
const validUser = {
  username: 'tam_01',
  password: '123456',
};

test.describe.serial('Home: After Login (login 1 lần)', () => {

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


  test('HOME_01: Hiển thị danh sách phim', async () => {
    await homePage.getSelectCinema();
  });

  test('HOME_02: Hiển thị tên user Tam Tam', async () => {
    await homePage.verifyUserNameVisible();
  });

  test('HOME_03: Hiển thị nút Đăng xuất', async () => {
    await homePage.verifyLogoutVisible();
  });

  test('HOME_04: Verify Click Lịch chiếu', async () => {        
        // await page.waitForTimeout(3000);
        // await homePage.clickMenu('Lịch Chiếu'); //Step 2: Click Lịch chiếu
        // // step 3: check scroll to Lịch chiếu
        // await expect(homePage.getContainLichChieu()).toBeInViewport();
        await homePage.clickMenu('Lịch chiếu');
        const lichChieu = homePage.getContainLichChieu();

        await lichChieu.scrollIntoViewIfNeeded(); 
        await expect(lichChieu).toBeVisible();

  })

  test('HOME_05: Verify Click Cụm Rạp', async () => {        
        await page.waitForTimeout(5000);
        await homePage.clickMenu('Cụm Rạp'); //Step 2: Click Cụm Rạp
        // step 3: check scroll to Cụm Rạp
        await expect(homePage.getContainCumRap()).toBeInViewport();
  })

    test('HOME_06: Verify Click Tin Tức', async () => {
        await page.waitForTimeout(5000);
        await homePage.clickMenu('Tin Tức'); //Step 2: Click Tin Tức
        // step 3: check scroll to Tin Tức
        await expect(homePage.getContainTinTuc()).toBeInViewport();
    })

    test('HOME_07: Verify Click Ứng Dụng', async () => {
        await page.waitForTimeout(5000);
        await homePage.clickMenu('Ứng Dụng'); //Step 2: Click Ứng Dụng
        // step 3: check scroll to Ứng Dụng
        await expect(homePage.getContainUngDung()).toBeInViewport();
    })
    
    test('HOME_08: Verify Play Movie', async () => {
        console.log('Verify Play Movie');
        await homePage.clickMovieAndPlay(); //Step 2: Click random video
        // step 3: check video play
        await expect(homePage.getifrVideo()).toBeVisible();
    })

});
