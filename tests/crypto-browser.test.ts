import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';
import * as cryptoBrowser from '../src/crypto-browser';

declare global {
  interface Window {
    browserUtils: any;
  }
}

describe('browser', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ 
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
      ] 
    });
    
    page = await browser.newPage();
    await page.goto('https://www.xinfer.ai');

    // Create a self-contained version of the crypto functions
    const browserCode = `
      let passphrase = 'default passphrase';
      let cryptoKey = null;
      
      ${cryptoBrowser.str2ab.toString()}
      ${cryptoBrowser.ab2str.toString()}
      ${cryptoBrowser.generateKey.toString()}
      ${cryptoBrowser.setPassphrase.toString()}
      ${cryptoBrowser.getPassphrase.toString()}
      ${cryptoBrowser.encryptString.toString()}
      ${cryptoBrowser.decryptString.toString()}
      
      window.browserUtils = {
        setPassphrase,
        getPassphrase,
        encryptString,
        decryptString
      };
    `;

    await page.evaluate(browserCode);
  }, 10000);

  afterAll(async () => {
    if (page) await page.close();
    if (browser) await browser.close();
  });

  test('should encrypt and decrypt a string correctly', async () => {
    const originalText = 'Hello, world!';

    const encryptedText = await page.evaluate(async (text) => {
      return await window.browserUtils.encryptString(text);
    }, originalText);

    const decryptedText = await page.evaluate(async (encrypted) => {
      return await window.browserUtils.decryptString(encrypted);
    }, encryptedText);

    expect(decryptedText).toBe(originalText);
  });

  test('should set and get the passphrase', async () => {
    const newPassphrase = 'my new passphrase';

    await page.evaluate((passphrase) => {
      window.browserUtils.setPassphrase(passphrase);
    }, newPassphrase);

    const passphrase = await page.evaluate(() => {
      return window.browserUtils.getPassphrase();
    });

    expect(passphrase).toBe(newPassphrase);
  });
});