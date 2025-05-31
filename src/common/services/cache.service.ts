import { redis } from '@/config/redis';
import { logger } from '../logger/logger.factory';

declare global {
    var redisAvailable: boolean;
}

/**
 * CacheService cung cấp các phương thức thao tác với Redis cache, bao gồm lưu, lấy, xoá, kiểm tra, và quản lý TTL, stack key.
 */
export class CacheService {
    private static readonly defaultTTL = 30; // 30 seconds

    /**
     * Tạo cache key theo định dạng: <prefix>:<params> (params được sort theo alphabet).
     * @param prefix Tiền tố cho key.
     * @param params Đối tượng tham số để tạo key.
     * @returns Chuỗi key đã được chuẩn hoá.
     */
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
     * Các property sẽ được sort theo alphabet để đảm bảo key nhất quán.
     * @param objectName Tên đối tượng chính.
     * @param properties Các thuộc tính để tạo key.
     * @returns Chuỗi key đã được chuẩn hoá.
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

    /**
     * Lấy giá trị cache theo key.
     * @param key Key của cache.
     * @returns Giá trị cache (hoặc null nếu không có).
     */
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

    /**
     * Lưu giá trị vào cache với TTL (thời gian sống) tuỳ chọn.
     * @param key Key của cache.
     * @param value Giá trị cần lưu.
     * @param ttl Thời gian sống của cache (giây), mặc định 30s.
     */
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

    /**
     * Xoá cache theo key.
     * @param key Key của cache cần xoá.
     */
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

    /**
     * Lấy cache nếu có, nếu không sẽ gọi fetchFn để lấy dữ liệu và lưu vào cache.
     * @param key Key của cache.
     * @param fetchFn Hàm lấy dữ liệu nếu cache không có.
     * @param ttl Thời gian sống của cache (giây), mặc định 30s.
     * @returns Giá trị cache hoặc dữ liệu lấy từ fetchFn.
     */
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

    /**
     * Xoá tất cả cache có prefix nhất định.
     * @param prefix Tiền tố của các key cần xoá.
     */
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

    /**
     * Kiểm tra sự tồn tại của một key trong cache.
     * @param key Key cần kiểm tra.
     * @returns true nếu tồn tại, false nếu không.
     */
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

    /**
     * Làm mới TTL (thời gian sống) của một key.
     * @param key Key cần làm mới TTL.
     * @param ttl Thời gian sống mới (giây), mặc định 30 phút.
     */
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

    /**
     * Tăng giá trị số nguyên của một key lên 1.
     * @param key Key cần tăng giá trị.
     * @returns Giá trị mới sau khi tăng, hoặc null nếu lỗi.
     */
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

    /**
     * Thêm một key vào stack (danh sách) với stackKey.
     * @param stackKey Key của stack (list trong Redis).
     * @param key Key cần thêm vào stack.
     */
    static async pushToStack(stackKey: string, key: string): Promise<void> {
        if (!global.redisAvailable) return;
        try {
            await redis.lPush(stackKey, key);
        } catch (error) {
            logger.error(`Error pushing to stack for key ${key}:`, error, {
                service: 'CacheService',
            });
            global.redisAvailable = false;
        }
    }

    /**
     * Duyệt toàn bộ stack, xoá tất cả các key trong stack, sau đó xoá luôn stackKey.
     * @param stackKey Key của stack (list trong Redis).
     */
    static async clearStack(stackKey: string): Promise<void> {
        if (!global.redisAvailable) return;
        try {
            const keys = await redis.lRange(stackKey, 0, -1);
            if (keys.length > 0) {
                await redis.del(keys);
            }
            await redis.del(stackKey);
        } catch (error) {
            logger.error(`Error clearing stack for key ${stackKey}:`, error, {
                service: 'CacheService',
            });
            global.redisAvailable = false;
        }
    }
}
