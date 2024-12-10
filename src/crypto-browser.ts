// src/crypto-browser.ts

let passphrase = 'default passphrase';
let cryptoKey: CryptoKey | null = null;

/**
 * Set the passphrase
 * @param s 
 */
export function setPassphrase(s: string): void {
  passphrase = s;
}

/**
 * Get the passphrase
 * @returns passphrase
 */
export function getPassphrase(): string {
  return passphrase;
}

/**
 * Encrypt a string
 * @param str
 * @returns encrypted string
 */
export async function encryptString(str: string): Promise<string> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await generateKey();
  const encryptedContent = await window.crypto.subtle.encrypt(
      {
          name: 'AES-GCM',
          iv: iv
      },
      key,
      str2ab(str)
  );
  const combined = new Uint8Array(iv.length + encryptedContent.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedContent), iv.length);
  return btoa(String.fromCharCode.apply(null, Array.from(combined)));
}

/**
 * Decrypt an encrypted string
 * @param encryptedStr
 * @returns decrypted string
 */
export async function decryptString(encryptedStr: string): Promise<string> {
  const encryptedBytes = Uint8Array.from(atob(encryptedStr), c => c.charCodeAt(0));
  const iv = encryptedBytes.subarray(0, 12);
  const encryptedContent = encryptedBytes.subarray(12);
  const key = await generateKey();
  const decryptedContent = await window.crypto.subtle.decrypt(
      {
          name: 'AES-GCM',
          iv: iv
      },
      key,
      encryptedContent
  );
  return ab2str(decryptedContent);
}

// exported for testing
export function str2ab(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// exported for testing
export function ab2str(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

// exported for testing
export async function generateKey(): Promise<CryptoKey> {
  if (cryptoKey) {
      return cryptoKey;
  }
  const passphraseBytes = str2ab(passphrase);
  const hash = await window.crypto.subtle.digest('SHA-256', passphraseBytes);
  cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      hash,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
  );
  return cryptoKey;
}
