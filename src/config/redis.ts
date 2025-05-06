import { createClient, RedisClientType } from "redis";
import { logger } from "../common/logger/logger.factory";

declare global {
  var redis: RedisClientType | undefined;
}

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || "6379";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const url = REDIS_PASSWORD
  ? `redis://:${encodeURIComponent(REDIS_PASSWORD)}@${REDIS_HOST}:${REDIS_PORT}`
  : `redis://${REDIS_HOST}:${REDIS_PORT}`;

const redis = global.redis || createClient({ url });

// Set up event handlers only once
if (!global.redis) {
  redis.on("error", (err: Error) => {
    logger.error("Redis connection error:", err, { service: "Redis" });
  });

  redis.on("connect", () => {
    logger.info("Redis connected successfully", { service: "Redis" });
  });

  // In non-production environments, save to global to prevent multiple connections
  if (process.env.NODE_ENV !== "production") {
    global.redis = redis;
  }
}

// Initialize Redis connection
const initializeRedis = async () => {
  try {
    if (!redis.isOpen) {
      await redis.connect();
      logger.info("Global Redis instance initialized", { service: "Redis" });
    }
  } catch (error) {
    logger.error("Failed to initialize global Redis instance:", error, { service: "Redis" });
  }
  return redis;
};

// Disconnect Redis
const disconnectRedis = async (): Promise<void> => {
  if (redis.isOpen) {
    await redis.quit();
    logger.info("Redis disconnected", { service: "Redis" });
  }
};

export { redis, initializeRedis, disconnectRedis };
