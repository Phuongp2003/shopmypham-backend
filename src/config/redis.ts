import { createClient, RedisClientType } from 'redis';
import { logger } from '../common/logger/logger.factory';

declare global {
	var redis: RedisClientType | undefined;
	var redisAvailable: boolean;
}

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const url = REDIS_PASSWORD
	? `redis://:${encodeURIComponent(REDIS_PASSWORD)}@${REDIS_HOST}:${REDIS_PORT}`
	: `redis://${REDIS_HOST}:${REDIS_PORT}`;

const MAX_REDIS_RETRIES = process.env.NODE_ENV === 'development' ? 0 : 5;
let redisRetryCount = 0;

// Helper: reconnect strategy
function getReconnectStrategy() {
	return (retries: number) => {
		redisRetryCount = retries;
		if (retries > MAX_REDIS_RETRIES) {
			logger.error(
				`Redis: exceeded max retries (${MAX_REDIS_RETRIES}), will not reconnect.`,
				{ service: 'Redis' }
			);
			return new Error('Retry attempts exhausted');
		}
		// Exponential backoff: 1000ms, 2000ms, 4000ms, ...
		return Math.min(1000 * 2 ** retries, 10000);
	};
}

// Helper: setup event handlers
function setupRedisEventHandlers(client: RedisClientType) {
	client.on('error', (err: Error) => {
		logger.error(
			'Redis connection error',
			process.env.NODE_ENV === 'development' ? err : '',
			{ service: 'Redis' }
		);
	});

	client.on('connect', () => {
		logger.info('Redis connected successfully', { service: 'Redis' });
	});
}

// Helper: create redis client
function createRedisClient(): RedisClientType {
	const client = createClient({
		url,
		socket: {
			reconnectStrategy: getReconnectStrategy(),
		},
	});
	setupRedisEventHandlers(client);
	return client;
}

// Đảm bảo luôn dùng global.redis nếu đã có, không tạo mới client (cả production lẫn dev)
if (!global.redis) {
	global.redis = createRedisClient();
}

const redis = global.redis;

// Initialize Redis connection
const initializeRedis = async (): Promise<boolean> => {
	try {
		if (!redis.isOpen) {
			await redis.connect();
			logger.info('Global Redis instance initialized', {
				service: 'Redis',
			});
		}
		global.redisAvailable = true;
		return true;
	} catch (error) {
		logger.error('Failed to initialize global Redis instance:', error, {
			service: 'Redis',
		});
		global.redisAvailable = false;
		return false;
	}
};

// Disconnect Redis
const disconnectRedis = async (): Promise<void> => {
	if (redis.isOpen) {
		await redis.quit();
		logger.info('Redis disconnected', { service: 'Redis' });
	}
};

export { redis, initializeRedis, disconnectRedis };
