// tests/is-pcm16.test.ts

import { isPcm16 } from '../src/is-pcm16';

describe('isPcm16', () => {
  it('should return true for valid PCM mime types', () => {
    const validMimeTypes = [
      'audio/wav',
      'audio/wave',
      'audio/x-wav',
      'audio/x-pn-wav',
      'audio/vnd.wave',
      'audio/wav;codecs=1',
      'audio/wave;codecs=1'
    ];

    validMimeTypes.forEach(mimeType => {
      expect(isPcm16(mimeType)).toBe(true);
    });
  });

  it('should return false for non-PCM mime types', () => {
    const invalidMimeTypes = [
      'audio/mp3',
      'audio/mpeg',
      'audio/ogg',
      'audio/webm',
      'audio/aac',
      'video/mp4',
      'application/octet-stream',
      '',
      'invalid',
      'audio/',
      'wav',
      'wave'
    ];

    invalidMimeTypes.forEach(mimeType => {
      expect(isPcm16(mimeType)).toBe(false);
    });
  });

  it('should handle case sensitivity', () => {
    expect(isPcm16('AUDIO/WAV')).toBe(true);
    expect(isPcm16('Audio/Wave')).toBe(true);
    expect(isPcm16('audio/WAV')).toBe(true);
  });

  it('should handle mime types with parameters', () => {
    const mimeTypesWithParams = [
      'audio/wav; charset=utf-8',
      'audio/wave;codecs=1;rate=44100',
      'audio/x-wav;channels=2'
    ];

    mimeTypesWithParams.forEach(mimeType => {
      expect(isPcm16(mimeType)).toBe(true);
    });
  });
});