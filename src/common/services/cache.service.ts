import { redis } from '@/config/redis';
import { logger } from '../logger/logger.factory';

declare global {
    var redisAvailable: boolean;
}

export class CacheService {
    private static readonly defaultTTL = 30; // 30 seconds

    public static generateKey(
        prefix: string,
        params: Record<string, any>,
    ): string {
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

    /**
     * Tạo cache key theo format: <objectName>-<property1>_<value1>-<property2>_<value2>-...
     * Các property sẽ được sort theo alphabet để đảm bảo key nhất quán
     * Ví dụ: cosmetic-limit_8-page_1-sort_id_desc
     */
    public static generateKeyV2(
        objectName: string,
        properties: Record<string, any>,
    ): string {
        const sortedKeys = Object.keys(properties).sort();
        const propsString = sortedKeys
            .map((key) => `${key}_${properties[key]}`)
            .join('-');
        return `${objectName}-${propsString}`;
    }

    static async get<T>(key: string): Promise<T | null> {
        if (!global.redisAvailable) return null;
        try {
            if (!redis.isOpen) {
                await redis.connect();
                logger.info('Redis connected from CacheService', {
                    service: 'CacheService',
                });
            }
            const data = await redis.get(key);
            if (!data) return null;
            return JSON.parse(data) as T;
        } catch (error) {
            logger.error(`Error getting cache for key ${key}:`, error, {
                service: 'CacheService',
            });
            global.redisAvailable = false;
            return null;
        }
    }

    static async set(
        key: string,
        value: any,
        ttl: number = CacheService.defaultTTL,
    ): Promise<void> {
        if (!global.redisAvailable) return;
        try {
            if (!redis.isOpen) {
                await redis.connect();
                logger.info('Redis connected from CacheService', {
                    service: 'CacheService',
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
                service: 'CacheService',
            });
            global.redisAvailable = false;
        }
    }

    static async delete(key: string): Promise<void> {
        if (!global.redisAvailable) return;
        try {
            if (!redis.isOpen) {
                await redis.connect();
                logger.info('Redis connected from CacheService', {
                    service: 'CacheService',
                });
            }
            await redis.del(key);
        } catch (error) {
            logger.error(`Error deleting cache for key ${key}:`, error, {
                service: 'CacheService',
            });
            global.redisAvailable = false;
        }
    }

    static async getOrSet<T>(
        key: string,
        fetchFn: () => Promise<T>,
        ttl: number = CacheService.defaultTTL,
    ): Promise<T | null> {
        if (!global.redisAvailable) {
            try {
                return await fetchFn();
            } catch (error) {
                logger.error(`Error fetching data for key ${key}:`, error, {
                    service: 'CacheService',
                });
                return null;
            }
        }
        let cached;
        try {
            cached = await CacheService.get<T>(key);
        } catch (error) {
            logger.error(`Error fetching cache for key ${key}:`, error, {
                service: 'CacheService',
            });
            cached = null;
        }
        if (cached) {
            return cached;
        }
        let data;
        try {
            data = await fetchFn();
            await CacheService.set(key, data, ttl);
        } catch (error) {
            logger.error(
                `Error fetching or setting cache for key ${key}:`,
                error,
                { service: 'CacheService' },
            );
            return null;
        }
        return data;
    }

    static async clearByPrefix(prefix: string): Promise<void> {
        if (!global.redisAvailable) return;
        try {
            if (!redis.isOpen) {
                await redis.connect();
                logger.info('Redis connected from CacheService', {
                    service: 'CacheService',
                });
            }
            const keys = await redis.keys(`${prefix}:*`);
            if (keys.length > 0) {
                await redis.del(keys);
            }
        } catch (error) {
            logger.error('Cache clear by prefix error:', error, {
                service: 'CacheService',
            });
            global.redisAvailable = false;
        }
    }

    static async exists(key: string): Promise<boolean> {
        if (!global.redisAvailable) return false;
        try {
            if (!redis.isOpen) {
                await redis.connect();
                logger.info('Redis connected from CacheService', {
                    service: 'CacheService',
                });
            }
            const result = await redis.exists(key);
            return result === 1;
        } catch (error) {
            logger.error(`Error checking existence for key ${key}:`, error, {
                service: 'CacheService',
            });
            global.redisAvailable = false;
            return false;
        }
    }

    static async refreshCache(
        key: string,
        ttl: number = 30 * 60,
    ): Promise<void> {
        if (!global.redisAvailable) return;
        try {
            if (!redis.isOpen) {
                await redis.connect();
                logger.info('Redis connected from CacheService', {
                    service: 'CacheService',
                });
            }
            await redis.expire(key, ttl);
        } catch (error) {
            logger.error(`Error refreshing cache TTL for key ${key}:`, error, {
                service: 'CacheService',
            });
            global.redisAvailable = false;
        }
    }

    static async incr(key: string): Promise<number | null> {
        if (!global.redisAvailable) return null;
        try {
            if (!redis.isOpen) {
                await redis.connect();
                logger.info('Redis connected from CacheService', {
                    service: 'CacheService',
                });
            }
            const result = await redis.incr(key);
            return result;
        } catch (error) {
            logger.error(`Error incrementing cache for key ${key}:`, error, {
                service: 'CacheService',
            });
            global.redisAvailable = false;
            return null;
        }
    }
}
