// src/get-wave-buffer.ts

import { getPcmHeader } from './get-pcm-header';
import { getVoiceFrames } from './get-voice-frames';
import type { GetWaveBufferOptions } from './types';

/**
 * Get a WAV buffer from audio chunks.
 * It works in both Node.js and browser environments
 * @param param0 
 * @returns Uint8Array containing WAV data or undefined if no voice detected
 */
export function getWaveBuffer(
  {
    chunks,
    sampleRate,
    bitsPerSample = 16,
    channels = 1,
    minVoiceFrames = 0,
  }: GetWaveBufferOptions,
): Uint8Array | undefined {
  if (!chunks || !chunks.length || !sampleRate) {
    console.error('Missing required fields');
    return;
  }

  // Convert all chunks to Uint8Array
  const uint8Chunks = chunks.map(chunk => 
    chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk)
  );
  
  // Calculate total length
  const totalLength = uint8Chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  
  // Concatenate chunks
  const audioData = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of uint8Chunks) {
    audioData.set(chunk, offset);
    offset += chunk.length;
  }

  // voice detection
  if (minVoiceFrames && getVoiceFrames(audioData, sampleRate) < minVoiceFrames) {
    console.warn('No voice detected');
    return;
  }

  const header = getPcmHeader(audioData.length, { sampleRate, bitsPerSample, channels });
  
  // Combine header and audio data
  const result = new Uint8Array(header.length + audioData.length);
  result.set(header);
  result.set(audioData, header.length);
  
  return result;
}