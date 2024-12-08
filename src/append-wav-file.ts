// src/append-wav-file.ts

import fs from 'fs';
import { getPcmHeader } from './get-pcm-header';
import type { AudioPcmParams } from './types.d';

/**
 * Creates or append a WAV file with new audio data.
 * It works only in Node.js environment.
 * @param filepath Path to the WAV file
 * @param audioData Buffer containing the new audio data to append
 * @param params Audio parameters for header generation
 */
export function appendWavFile(filepath: string, audioData: Buffer, params: AudioPcmParams): void {
  
  const fileExists = fs.existsSync(filepath);
  let totalSize: number;

  if (!fileExists) {
      // For new file, total size is just the audio data size
      totalSize = audioData.length;
  } else {
      // For existing file, get current file size (excluding header) and add new audio data size
      const stats = fs.statSync(filepath);
      totalSize = stats.size - 44 + audioData.length; // Subtract header size (44 bytes)
  }

  // Generate new header with updated size
  const newHeader = getPcmHeader(totalSize, params);

  if (!fileExists) {
      // Create new file with header and audio data
      const writeStream = fs.createWriteStream(filepath);
      writeStream.write(newHeader);
      writeStream.write(audioData);
      writeStream.end();
  } else {
      // Update existing file
      const fd = fs.openSync(filepath, 'r+');
      
      // Update header
      fs.writeSync(fd, newHeader, 0, 44, 0);
      
      // Append new audio data
      fs.appendFileSync(filepath, audioData);
      
      // Close file descriptor
      fs.closeSync(fd);
  }
}