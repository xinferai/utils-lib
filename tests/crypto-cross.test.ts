// tests/crypto-cross.test.ts:

import puppeteer from "puppeteer";
import type { Browser, Page } from 'puppeteer';
import * as cryptoBrowser from '../src/crypto-browser';
import { encryptString, decryptString, setPassphrase } from "../src/crypto-node";

declare global {
  interface Window {
    browserUtils: any;
  }
}

describe('Verify crossing between nodejs and browser encryption / decryption', () => {

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

    // Set passphrase in both Node.js and the browser environment
    const passphrase = 'test-passphrase';
    setPassphrase(passphrase);
    await page.evaluate((passphrase) => {
      window.browserUtils.setPassphrase(passphrase);
    }, passphrase);
  });

  afterAll(async () => {
    if (page) await page.close();
    if (browser) await browser.close();
  });

  it('should encrypt a string in the browser and decrypt in Node.js', async () => {
    const testString = 'Hello from the browser!';

    // Encrypt in browser using Puppeteer
    const encrypted = await page.evaluate(async (testString) => {
      return await window.browserUtils.encryptString(testString);
    }, testString);

    // Decrypt in Node.js
    const decrypted = await decryptString(encrypted);

    // Check if the decrypted value matches the original string
    expect(decrypted).toBe(testString);
  });

  it('should encrypt a string in Node.js and decrypt in the browser', async () => {
    const testString = 'Hello from Node.js!';

    // Encrypt in Node.js
    const encrypted = await encryptString(testString);

    // Decrypt in browser using Puppeteer
    const decrypted = await page.evaluate(async (encrypted) => {
      return await window.browserUtils.decryptString(encrypted);
    }, encrypted);

    // Check if the decrypted value matches the original string
    expect(decrypted).toBe(testString);
  });
});