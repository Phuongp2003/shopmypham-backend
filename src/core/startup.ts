import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { logger } from "../common/logger/logger.factory";
import { startHealthCheck } from "../config/db.health";
import { prisma } from "../config/prisma";
import { redis, initializeRedis, disconnectRedis } from "../config/redis";
import { swaggerConfig } from "../config/swagger";
import authRouter from "../modules/auth/auth.router";
import cartRouter from "../modules/cart/cart.router";
import cosmeticRouter from "../modules/cosmetic/cosmetic.router";
import postRouter from "../modules/post/post.router";
import userRouter from "../modules/user/user.router";
import orderRouter from "../modules/order/order.router";
import { initAdminUser } from "./init-admin";

/**
 * AppInitializer class handles the initialization and configuration of the Express application.
 * It sets up middleware, services, routes, and error handling.
 */
export class AppInitializer {
  private static app: Express;

  /**
   * Initializes the Express application with all necessary configurations.
   * @returns {Promise<Express>} The configured Express application
   */
  static async initialize(): Promise<Express> {
    this.app = express();

    // Setup middleware
    await this.setupMiddleware();

    // Initialize services
    await this.initializeServices();

    // Register routes
    this.registerRoutes();

    // Register error handler
    this.registerErrorHandler();

    // Start database health checks
    const cleanupHealthCheck = startHealthCheck();

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      logger.info("SIGTERM received. Shutting down gracefully...", {service: "Startup"});
      cleanupHealthCheck();
      // Disconnect from Redis
      await disconnectRedis();
      // Disconnect from Prisma
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on("SIGINT", async () => {
      logger.info("SIGINT received. Shutting down gracefully...", {service: "Startup"});
      cleanupHealthCheck();
      // Disconnect from Redis
      await disconnectRedis();
      // Disconnect from Prisma
      await prisma.$disconnect();
      process.exit(0);
    });

    logger.info("Application setup completed successfully", {service: "Startup"});

    return this.app;
  }

  private static async setupMiddleware() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(morgan("combined"));
  }

  private static async initializeServices() {
    try {
      // Initialize Prisma
      await prisma.$connect();
      logger.info("Prisma connected successfully", {service: "Startup"});

      // Initialize Redis (ensuring it's only initialized once)
      await initializeRedis();
      if (global.redis) {
        logger.info("Redis connected successfully", {service: "Startup"});
      } else {
        logger.warn("Redis client could not be initialized", {service: "Startup"});
      }

      // Initialize Swagger
      swaggerConfig(this.app);
      logger.info("Swagger initialized successfully", {service: "Startup"});

      // Initialize admin user
      await initAdminUser();
    } catch (error) {
      logger.error("\nFailed to initialize services:", error, {service: "Startup"});
      throw error;
    }
  }

  /**
   * Registers all application routes.
   * This includes:
   * - Health check endpoint
   * - Authentication routes (/auth)
   * - Post management routes (/posts)
   * - Cosmetic management routes (/cosmetics)
   * - Cart management routes (/cart)
   * - User management routes (/users)
   */
  private static registerRoutes() {
    // Health check endpoint
    this.app.get("/healthz", (req, res) => {
      res.json({ status: "ok" });
    });

    // Register module routes
    this.app.use("/auth", authRouter);
    this.app.use("/posts", postRouter);
    this.app.use("/cosmetics", cosmeticRouter);
    this.app.use("/cart", cartRouter);
    this.app.use("/users", userRouter);
    this.app.use("/orders", orderRouter);
  }

  private static registerErrorHandler() {
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        logger.error("Unhandled error:", err, {service: "Startup"});

        if (err.details) {
          logger.error("Error details:", err.details, {service: "Startup"});
        }
        res.status(500).json({
          status: "error",
          message: "Internal server error",
          details: process.env.NODE_ENV === "development" ? err : undefined,
        });
      },
    );
  }
}
