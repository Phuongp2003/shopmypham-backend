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
import { startHealthCheck } from '../config/db.health';

export class AppInitializer {
  private static app: Express;

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

  private static registerRoutes() {
    // Health check endpoint
    this.app.get('/healthz', (req, res) => {
      res.json({ status: 'ok' });
    });

    // Register auth routes
    this.app.use('/auth', authRouter);

    // TODO: Register other module routes
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
