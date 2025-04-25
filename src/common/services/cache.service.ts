import { redis } from '@/config/redis';
import { logger } from '../logger/logger.factory';

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
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as Record<string, any>);

    return `${prefix}:${JSON.stringify(sortedParams)}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (!redis) {
        logger.warn('Redis client not initialized');
        return null;
      }
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = this.defaultTTL): Promise<void> {
    try {
      if (!redis) {
        logger.warn('Redis client not initialized');
        return;
      }
      await redis.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (error) {
      logger.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      if (!redis) {
        logger.warn('Redis client not initialized');
        return;
      }
      await redis.del(key);
    } catch (error) {
      logger.error('Cache delete error:', error);
    }
  }

  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = this.defaultTTL
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
      if (!redis) {
        logger.warn('Redis client not initialized');
        return;
      }
      const keys = await redis.keys(`${prefix}:*`);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      logger.error('Cache clear by prefix error:', error);
    }
  }
} 
