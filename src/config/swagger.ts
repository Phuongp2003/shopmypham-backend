import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { logger } from '../common/logger/logger.factory';
import { SwaggerBuilder } from './swagger-builder';
import { CosmeticController } from '../modules/cosmetic/cosmetic.controller';
import fs from 'fs';
import path from 'path';
import { CartController } from "@/modules/cart/cart.controller";

// Tự động lấy toàn bộ file *.types.ts và *.dto.ts trong src/modules
const modulesDir = path.join(__dirname, '../modules');
function getAllSchemaFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of list) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(getAllSchemaFiles(filePath));
        } else if (
            file.name.endsWith('.types.ts') ||
            file.name.endsWith('.dto.ts')
        ) {
            results.push(filePath);
        }
    }
    return results;
}
const schemaFiles = getAllSchemaFiles(modulesDir);

const swaggerBuilder = new SwaggerBuilder()
  .addSchemasFromComments(schemaFiles)
  .addTag("Health", "Health check endpoints")
  .addSecurityScheme("bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description:
      'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
  })
  .addPath("/healthz", {
    get: {
      tags: ["Health"],
      summary: "Health check",
      description: "Check if the API is running",
      responses: {
        "200": {
          description: "API is healthy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["ok"],
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  .addControllersFromAnnotations([
    CosmeticController,
    CartController
    // ... các controller khác
  ]);

const swaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'Backend API',
        version: '1.0.0',
        description: 'API documentation for the backend service',
        contact: {
            name: 'API Support',
            email: 'support@example.com',
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    servers: [
        {
            url: process.env.API_URL || 'http://localhost:3000',
            description: 'Development server',
        },
        {
            url: 'https://api.example.com',
            description: 'Production server',
        },
    ],
    ...swaggerBuilder.build(),
};

export const swaggerConfig = (app: Express) => {
    try {
        // Serve Swagger UI
        app.use('/docs', swaggerUi.serve);

        // Setup Swagger UI
        app.get(
            '/docs',
            swaggerUi.setup(swaggerOptions, {
                explorer: true,
                customCss: '.swagger-ui .topbar { display: none }',
                customSiteTitle: 'Backend API Documentation',
                swaggerOptions: {
                    persistAuthorization: true,
                    displayRequestDuration: true,
                    filter: true,
                },
            }),
        );

        app.get('/docs-json', (req: Request, res: Response) => {
            res.json(swaggerOptions);
        });

        // Health check endpoint
        app.get('/healthz', (req: Request, res: Response) => {
            res.json({ status: 'ok' });
        });

        logger.info('Swagger UI is available at /docs', { service: 'Swagger' });
    } catch (error) {
        logger.error('Failed to initialize Swagger:', error, {
            service: 'Swagger',
        });
        throw error;
    }
};
