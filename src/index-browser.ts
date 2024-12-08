// src/index-browser.ts

//import { appendWavFile } from "./append-wav-file";
import { base64ToBinary } from "./base64-to-binary";
import { base64ToString } from "./base64-to-string";
import { snakeToCamel, camelToSnake, endsWithAtToDate } from "./convert-date-cases";
import { setPassphrase, getPassphrase, encryptString, decryptString } from "./crypto-browser";
import { deepClone } from "./deep-clone";
import { deepEqual } from "./deep-equal";
import { extractError } from "./extract-error";
//import { fileToBase64 } from "./file-to-base64";
import { getJsString } from "./get-js-string";
import { getPcmHeader } from "./get-pcm-header";
import { getVoiceFrames } from "./get-voice-frames";
import { getWaveBuffer } from "./get-wave-buffer";
import { isBase64 } from "./is-base64";
import { isInBrowser } from "./is-in-browser";
import { isInNode } from "./is-in-node";
import { isPcm16 } from "./is-pcm16";
import { isPlainObject } from "./is-plain-object";
import { isPlainValue } from "./is-plain-value";
import { isTextFile } from "./is-text-file";
import { parseDate } from "./parse-date";
import { passThrough } from "./pass-through";
import { pluralize } from "./pluralize";
import { readRaw } from "./read-raw";
import { sentenceCase } from "./sentence-case";
import { toHumanReadable } from "./to-human-readable";
import { utf8ToBase64 } from "./utf8-to-base64";

export type * from "./types";

export {
  //appendWavFile,
  base64ToBinary,
  base64ToString,
  snakeToCamel,
  camelToSnake,
  endsWithAtToDate,
  setPassphrase,
  getPassphrase,
  encryptString,
  decryptString,
  deepClone,
  deepEqual,
  extractError,
  //fileToBase64,
  getJsString,
  getPcmHeader,
  getVoiceFrames,
  getWaveBuffer,
  isBase64,
  isInBrowser,
  isInNode,
  isPcm16,
  isPlainObject,
  isPlainValue,
  isTextFile,
  parseDate,
  passThrough,
  pluralize,
  readRaw,
  sentenceCase,
  toHumanReadable,
  utf8ToBase64,
};

export default {
  //appendWavFile,
  base64ToBinary,
  base64ToString,
  snakeToCamel,
  camelToSnake,
  endsWithAtToDate,
  setPassphrase,
  getPassphrase,
  encryptString,
  decryptString,
  deepClone,
  deepEqual,
  extractError,
  //fileToBase64,
  getJsString,
  getPcmHeader,
  getVoiceFrames,
  getWaveBuffer,
  isBase64,
  isInBrowser,
  isInNode,
  isPcm16,
  isPlainObject,
  isPlainValue,
  isTextFile,
  parseDate,
  passThrough,
  pluralize,
  readRaw,
  sentenceCase,
  toHumanReadable,
  utf8ToBase64,
};


