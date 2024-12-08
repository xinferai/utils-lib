// src/file-to-base64.ts

const fs = require('fs').promises;

/**
 * Convert a file to a Base64 string,
 * It works only in Node.js environment.
 * @param filePath file path to the file
 * @param skipBytes number of bytes to skip
 * @returns Base64 string
 */
export async function fileToBase64(filePath: string, skipBytes: number = 0) : Promise<string> {
  const fileBuffer = await fs.readFile(filePath);
  if (skipBytes > 0) {
    return Buffer.from(new Uint8Array(fileBuffer).slice(skipBytes)).toString('base64');
  } else {
    return fileBuffer.toString('base64');
  }
}