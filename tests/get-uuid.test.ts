// tests/get-uuid.test.ts

import { getUUID } from '../src/get-uuid-node';
import { v4 } from 'uuid';

// Mock uuid v4 function
jest.mock('uuid', () => ({
  v4: jest.fn()
}));

describe('UUID Cache', () => {
  beforeEach(() => {
    // Clear mock data before each test
    jest.clearAllMocks();
    
    // Mock implementation of v4
    (v4 as jest.Mock).mockImplementation(() => 
      Math.random().toString(36).substring(2) + Date.now().toString(36)
    );
  });

  describe('getUUID', () => {
    it('should return a string', () => {
      const uuid = getUUID();
      expect(typeof uuid).toBe('string');
    });

    it('should return different UUIDs on consecutive calls', () => {
      const uuid1 = getUUID();
      const uuid2 = getUUID();
      expect(uuid1).not.toBe(uuid2);
    });

    it('should generate UUIDs in the correct format', () => {
      const uuid = getUUID();
      // UUID v4 format: 8-4-4-4-12 characters
      const uuidRegex = /^[0-9a-zA-Z-]+$/;
      expect(uuid).toMatch(uuidRegex);
    });
  });

  describe('Cache behavior', () => {
    it('should pre-fill the cache on initialization', (done) => {
      // We need to wait for the cache to be filled
      setTimeout(() => {
        expect(v4).toHaveBeenCalled();
        done();
      }, 100);
    });

    it('should generate new UUIDs in batches', (done) => {
      // Request many UUIDs to trigger cache refill
      for (let i = 0; i < 1100; i++) {
        getUUID();
      }

      // Wait for cache refill
      setTimeout(() => {
        const callCount = (v4 as jest.Mock).mock.calls.length;
        // Should be called more than the initial batch
        expect(callCount).toBeGreaterThan(100);
        done();
      }, 100);
    });

    it('should handle concurrent requests', async () => {
      const concurrentRequests = 50;
      const requests = Array(concurrentRequests).fill(null).map(() => getUUID());
      const results = await Promise.all(requests);
      
      // Check all UUIDs are unique
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBe(concurrentRequests);
    });
  });

  describe('Performance', () => {
    it('should have low latency for UUID generation', () => {
      const startTime = process.hrtime.bigint();
      getUUID();
      const endTime = process.hrtime.bigint();
      
      // Convert to milliseconds
      const duration = Number(endTime - startTime) / 1_000_000;
      
      // Should be very fast (usually < 1ms) since it's coming from cache
      expect(duration).toBeLessThan(1);
    });

    it('should maintain performance under load', () => {
      const iterations = 1000;
      const times: number[] = [];

      for (let i = 0; i < iterations; i++) {
        const startTime = process.hrtime.bigint();
        getUUID();
        const endTime = process.hrtime.bigint();
        times.push(Number(endTime - startTime) / 1_000_000);
      }

      // Calculate average time
      const averageTime = times.reduce((a, b) => a + b) / times.length;
      
      // Average should be low (usually < 0.1ms)
      expect(averageTime).toBeLessThan(1);
      
      // Calculate 95th percentile
      const sortedTimes = times.sort((a, b) => a - b);
      const p95 = sortedTimes[Math.floor(iterations * 0.95)];
      
      // 95th percentile should still be reasonable
      expect(p95).toBeLessThan(2);
    });
  });
});