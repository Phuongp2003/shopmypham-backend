import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';
import { logger } from '../common/logger/logger.factory';
import { authSwagger } from '../modules/auth/swagger/auth.controller.swagger';

const swaggerOptions = {
  openapi: '3.1.0',
  info: {
    title: 'Backend API',
    version: '1.0.0',
    description: 'API documentation for the backend service',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: process.env.API_URL || 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'https://api.example.com',
      description: 'Production server',
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
      }
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['error'],
            description: 'Error status'
          },
          message: {
            type: 'string',
            description: 'Error message'
          },
          details: {
            type: 'object',
            description: 'Additional error details',
            additionalProperties: true
          }
        },
        required: ['status', 'message']
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  tags: [
    {
      name: 'Health',
      description: 'Health check endpoints'
    },
    {
      name: 'Auth',
      description: 'Authentication endpoints'
    }
  ],
  paths: {
    '/healthz': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Check if the API is running',
        responses: {
          '200': {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['ok']
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    ...authSwagger.paths
  }
};

export const swaggerConfig = (app: Express) => {
  try {
    // Serve Swagger UI
    app.use('/docs', swaggerUi.serve);
    
    // Setup Swagger UI
    app.get('/docs', swaggerUi.setup(swaggerOptions, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: "Backend API Documentation",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true
      }
    }));

    // Health check endpoint
    app.get('/healthz', (req: Request, res: Response) => {
      res.json({ status: 'ok' });
    });

    logger.info('Swagger UI is available at /docs');
  } catch (error) {
    logger.error('Failed to initialize Swagger:', error);
  }
}; 
