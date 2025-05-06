import { logger } from "../common/logger/logger.factory";
import { prisma } from "./prisma";
import { redis } from "./redis";

export const checkDatabaseHealth = async () => {
  const health = {
    prisma: false,
    redis: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // Check Prisma connection
    await prisma.$queryRaw`SELECT 1`;
    health.prisma = true;
    logger.info("Prisma connection is healthy");
  } catch (error) {
    logger.error("Prisma connection check failed:", error);
  }

  try {
    // Check Redis connection
    if (redis) {
      await redis.ping();
      health.redis = true;
      logger.info("Redis connection is healthy");
    } else {
      logger.warn("Redis client is not initialized");
    }
  } catch (error) {
    logger.error("Redis connection check failed:", error);
  }

  return health;
};

/**
 * Starts periodic health checks for database connections
 *
 * This function implements the Observer pattern to monitor database connections.
 * It periodically checks the health of Prisma and Redis connections and logs their status.
 *
 * @param {number} intervalMs - The interval in milliseconds between health checks.
 *                             If set to 0 or negative, only performs a one-time check.
 * @returns {Function} A cleanup function that clears the interval when called.
 *
 * @example
 * // Start health checks every 5 minutes
 * const cleanup = startHealthCheck(300000);
 *
 * // Later, when shutting down
 * cleanup();
 */
export const startHealthCheck = (intervalMs = 0) => {
  const check = async () => {
    const health = await checkDatabaseHealth();
    logger.info("Database health check:", health);
  };
  // Skip periodic checks if only one check is needed
  if (intervalMs <= 0) {
    logger.info("Health check configured for one-time execution only");
    return () => {
      logger.debug("No interval to clear for one-time health check");
    };
  }

  // Run initial check
  check();

  // Set up periodic checks
  const interval = setInterval(check, intervalMs);

  // Return cleanup function
  return () => {
    clearInterval(interval);
  };
};
