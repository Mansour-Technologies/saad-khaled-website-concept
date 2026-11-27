import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://localhost:4417/saad-khaled-website-concept/';
const exe = process.env.PW_CHROMIUM;

export default defineConfig({
  testDir: 'tests',
  timeout: 45_000,
  fullyParallel: true,
  workers: 4,
  reporter: [['list']],
  use: { baseURL, trace: 'off', locale: 'fr-FR', launchOptions: exe ? { executablePath: exe } : {} },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: 'node tools/serve.mjs', url: baseURL, reuseExistingServer: true, timeout: 20_000 },
});
