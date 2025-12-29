import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://demo1.cybersoft.edu.vn',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  
  reporter: [['html', { open: 'never' }]],
});
