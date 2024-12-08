// src/is-pcm16.ts

/**
 * Check if the given MIME type is PCM 16-bit audio
 * @param mimeType mime type string
 * @returns true if PCM 16-bit audio, false otherwise
 */
export function isPcm16(mimeType: string) {

  const pcmMimeTypes = ['audio/l16', 'audio/wav', 'audio/x-wav', 'audio/x-pn-wav', 'audio/vnd.wave'];

  mimeType = mimeType.toLowerCase();
  for (const type of pcmMimeTypes) {
    if (mimeType.startsWith(type)) {
      return true;
    }
  }
  return false;
}