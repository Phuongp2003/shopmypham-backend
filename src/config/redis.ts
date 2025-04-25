import Redis from 'ioredis';
import { logger } from '../common/logger/logger.factory';

declare global {
  var redis: Redis | null;
}

class RedisClient {
  private static instance: Redis | null = null;
  private static isConnecting: boolean = false;

  static async getInstance(): Promise<Redis | null> {
    if (this.instance) {
      return this.instance;
    }

    if (this.isConnecting) {
      logger.warn('Redis is already connecting, waiting for connection...');
      return new Promise((resolve) => {
        const checkConnection = () => {
          if (this.instance) {
            resolve(this.instance);
          } else {
            setTimeout(checkConnection, 100);
          }
        };
        checkConnection();
      });
    }

    this.isConnecting = true;
    try {
      const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
      const REDIS_PORT = process.env.REDIS_PORT || '6379';
      const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

      this.instance = new Redis({
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT),
        password: REDIS_PASSWORD,
        retryStrategy: (times: number) => {
          if (times > 10) {
            logger.error('Redis connection failed after 10 retries');
            return null;
          }
          return Math.min(times * 100, 3000);
        }
      });

      this.instance.on('error', (err: Error) => {
        logger.error('Redis connection error:', err);
        this.instance = null;
        this.isConnecting = false;
      });

      this.instance.on('connect', () => {
        logger.info('Redis connected successfully');
        this.isConnecting = false;
      });

      return this.instance;
    } catch (error) {
      this.isConnecting = false;
      logger.error('Failed to create Redis client:', error);
      return null;
    }
  }

  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.quit();
      this.instance = null;
    }
  }
}

// Initialize global Redis instance
if (!global.redis) {
  RedisClient.getInstance().then((instance) => {
    global.redis = instance;
  }).catch((error) => {
    logger.error('Failed to initialize global Redis instance:', error);
  });
}

export { redis }; 
