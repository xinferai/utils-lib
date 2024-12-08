// src/get-pcm-header.ts

import { isInNode } from './is-in-node';
import type { AudioPcmParams } from './types.d';

/**
 * Creates a WAV PCM header with the given audio parameters.
 * It works in both Node.js and browser environments
 * @param size Size of the audio data in bytes
 * @param params Audio parameters for header generation
 * @returns Buffer in Node.js or Uint8Array in browser containing WAV header
 */
export function getPcmHeader(size: number, params: AudioPcmParams): Buffer | Uint8Array {
  
  const { sampleRate, bitsPerSample, channels } = params;

  const buffer = isInNode() ? 
    Buffer.alloc(44) : 
    new Uint8Array(44);

  // Helper function to write string to buffer
  const writeString = (str: string, offset: number) => {
    for (let i = 0; i < str.length; i++) {
      buffer[offset + i] = str.charCodeAt(i);
    }
  };

  // Helper function to write 32-bit little-endian
  const writeUInt32LE = (value: number, offset: number) => {
    buffer[offset] = value & 0xff;
    buffer[offset + 1] = (value >> 8) & 0xff;
    buffer[offset + 2] = (value >> 16) & 0xff;
    buffer[offset + 3] = (value >> 24) & 0xff;
  };

  // Helper function to write 16-bit little-endian
  const writeUInt16LE = (value: number, offset: number) => {
    buffer[offset] = value & 0xff;
    buffer[offset + 1] = (value >> 8) & 0xff;
  };

  // RIFF identifier 'RIFF'
  writeString('RIFF', 0);
  
  // file length minus RIFF header
  writeUInt32LE(36 + size, 4);
  
  // RIFF type 'WAVE'
  writeString('WAVE', 8);
  
  // format chunk identifier 'fmt '
  writeString('fmt ', 12);
  
  // format chunk length
  writeUInt32LE(16, 16);
  
  // sample format (raw)
  writeUInt16LE(1, 20);
  
  // channel count
  writeUInt16LE(channels, 22);
  
  // sample rate
  writeUInt32LE(sampleRate, 24);
  
  // byte rate (sample rate * block align)
  writeUInt32LE(sampleRate * channels * bitsPerSample / 8, 28);
  
  // block align (channel count * bytes per sample)
  writeUInt16LE(channels * bitsPerSample / 8, 32);
  
  // bits per sample
  writeUInt16LE(bitsPerSample, 34);
  
  // data chunk identifier 'data'
  writeString('data', 36);
  
  // data chunk length
  writeUInt32LE(size, 40);
  
  return buffer;
}