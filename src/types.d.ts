
export interface AudioPcmParams {
  sampleRate: number;
  channels: number;
  bitsPerSample: number;
}

export interface GetWaveBufferOptions {
  chunks: (Uint8Array | Buffer)[];
  sampleRate: number;
  bitsPerSample?: number;
  channels?: number;
  minVoiceFrames?: number;
}

export type PlainValue = null | undefined | number | string | boolean | Date;

export type PlainObject = { [key: string]: PlainValue | PlainObject } | (PlainValue | PlainObject)[];