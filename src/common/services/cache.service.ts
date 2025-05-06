import { redis } from "@/config/redis";

import { logger } from "../logger/logger.factory";

export class CacheService {
  private static instance: CacheService;
  private readonly defaultTTL = 3600; // 1 hour in seconds

  private constructor() {}

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public generateKey(prefix: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = params[key];
          return acc;
        },
        {} as Record<string, any>,
      );

    return `${prefix}:${JSON.stringify(sortedParams)}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (!redis.isOpen) {
        await redis.connect();
        logger.info("Redis connected from CacheService", {
          service: "CacheService",
        });
      }

      const data = await redis.get(key);
      if (!data) return null;

      return JSON.parse(data) as T;
    } catch (error) {
      logger.error(`Error getting cache for key ${key}:`, error, {
        service: "CacheService",
      });
      return null;
    }
  }

  async set(
    key: string,
    value: any,
    ttl: number = this.defaultTTL,
  ): Promise<void> {
    try {
      if (!redis.isOpen) {
        await redis.connect();
        logger.info("Redis connected from CacheService", {
          service: "CacheService",
        });
      }

      const serializedValue = JSON.stringify(value);

      if (ttl) {
        await redis.setEx(key, ttl, serializedValue);
      } else {
        await redis.set(key, serializedValue);
      }
    } catch (error) {
      logger.error(`Error setting cache for key ${key}:`, error, {
        service: "CacheService",
      });
    }
  }

  async delete(key: string): Promise<void> {
    try {
      if (!redis.isOpen) {
        await redis.connect();
        logger.info("Redis connected from CacheService", {
          service: "CacheService",
        });
      }

      await redis.del(key);
    } catch (error) {
      logger.error(`Error deleting cache for key ${key}:`, error, {
        service: "CacheService",
      });
    }
  }

  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = this.defaultTTL,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    }

    const data = await fetchFn();
    await this.set(key, data, ttl);
    return data;
  }

  async clearByPrefix(prefix: string): Promise<void> {
    try {
      if (!redis.isOpen) {
        await redis.connect();
        logger.info("Redis connected from CacheService", {
          service: "CacheService",
        });
      }

      const keys = await redis.keys(`${prefix}:*`);
      if (keys.length > 0) {
        await redis.del(keys);
      }
    } catch (error) {
      logger.error("Cache clear by prefix error:", error, {
        service: "CacheService",
      });
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      if (!redis.isOpen) {
        await redis.connect();
        logger.info("Redis connected from CacheService", {
          service: "CacheService",
        });
      }

      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Error checking existence for key ${key}:`, error, {
        service: "CacheService",
      });
      return false;
    }
  }
}
