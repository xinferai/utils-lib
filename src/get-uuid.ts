// src/get-uuid.ts

import { v4 } from 'uuid';

/**
 * UUIDCache - A non-blocking UUID cache
 *
 * Reduced latency for UUID generation
 *
 */
class UUIDCache {

  private cacheSize: number;
  private lowWaterMark: number;
  private cache: string[];
  private isGenerating: boolean;

  /** 
   * @param {number} cacheSize - The maximum number of UUIDs to cache
   * @param {number} lowWaterMark - The minimum number of UUIDs to keep in the cache
   */
  constructor(cacheSize: number = 1000, lowWaterMark: number = Math.floor(cacheSize * 0.2)) {
    this.cacheSize = cacheSize;
    this.lowWaterMark = lowWaterMark;
    this.cache = [];  
    this.isGenerating = false;

    // Initial fill
    this.fillCache();
  }

  public getUUID(): string {
    // If cache is getting low, trigger background refill
    if (this.cache.length <= this.lowWaterMark) {
        this.fillCache();
    }
    // Pop a UUID from the cache or generate a new one
    return this.cache.pop() || v4();
  }

  // For testing/monitoring
  public getCacheSize() {
    return this.cache.length;
  }

  private fillCache() {
    if (this.isGenerating) return;
    this.isGenerating = true;

    const generateBatch = () => {
        const batchSize = 100;
        let generated = 0;

        while (generated < batchSize && this.cache.length < this.cacheSize) {
            this.cache.push(v4());  // push to array
            generated++;
        }

        if (this.cache.length < this.cacheSize) {
            setImmediate(generateBatch);
        } else {
            this.isGenerating = false;
        }
    };

    setImmediate(generateBatch);
  }
}

const uuidCache = new UUIDCache();

/**
 * getUUID - Get a UUID from the cache or generate a new one
 *
 * @returns {string} - A UUID
 */
export const getUUID = (): string => {
  return uuidCache.getUUID();
};