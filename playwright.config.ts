import { defineConfig } from '@playwright/test';

export default defineConfig({
   timeout: 180000, 
    expect: {
      timeout: 10000 
    },
  
  workers: 1,

  testDir: './tests',
  use: {
    baseURL: 'https://demo1.cybersoft.edu.vn',
    headless: false,
    viewport: { width: 1280, height: 800 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  
  reporter: [['html', { open: 'never' }]],
});
