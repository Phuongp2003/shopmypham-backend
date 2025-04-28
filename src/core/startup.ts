import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { logger } from '../common/logger/logger.factory';
import { prisma } from '../config/prisma';
import { redis } from '../config/redis';
import { swaggerConfig } from '../config/swagger';
import { initAdminUser } from './init-admin';
import authRouter from '../modules/auth/auth.router';
import postRouter from '../modules/post/post.router';
import cosmeticRouter from '../modules/cosmetic/cosmetic.router';
import cartRouter from '../modules/cart/cart.router';
import userRouter from '../modules/user/user.router';
import { startHealthCheck } from '../config/db.health';

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

    // Basic middleware
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(morgan('combined'));

    // Initialize services
    await this.initializeServices();

    // Register routes
    this.registerRoutes();

    // Register error handler
    this.registerErrorHandler();

    // Start database health checks
    const cleanupHealthCheck = startHealthCheck();

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received. Shutting down gracefully...');
      cleanupHealthCheck();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received. Shutting down gracefully...');
      cleanupHealthCheck();
      process.exit(0);
    });

    logger.info('Application setup completed successfully');

    return this.app;
  }

  private static async initializeServices() {
    try {
      // Initialize Prisma
      await prisma.$connect();
      logger.info('Prisma connected successfully');

      // Initialize Redis (optional)
      if (redis) {
        await redis.connect();
        logger.info('Redis connected successfully');
      }

      // Initialize Swagger
      swaggerConfig(this.app);
      logger.info('Swagger initialized successfully');

      // Initialize admin user
      await initAdminUser();
    } catch (error) {
      logger.error('\nFailed to initialize services:', error);
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
    this.app.get('/healthz', (req, res) => {
      res.json({ status: 'ok' });
    });

    // Register module routes
    this.app.use('/auth', authRouter);
    this.app.use('/posts', postRouter);
    this.app.use('/cosmetics', cosmeticRouter);
    this.app.use('/cart', cartRouter);
    this.app.use('/users', userRouter);
  }

  private static registerErrorHandler() {
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.error('Unhandled error:', err);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err : undefined,
      });
    });
  }
} 
