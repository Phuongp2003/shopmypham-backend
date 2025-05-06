import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { logger } from "../common/logger/logger.factory";
import { authSwagger } from "../modules/auth/swagger/auth.controller.swagger";
import { cartSwagger } from "../modules/cart/swagger/cart.controller.swagger";
import { cosmeticSwagger } from "../modules/cosmetic/swagger/cosmetic.swagger";
import { orderSwagger } from "../modules/order/swagger/order.controller.swagger";
import { paymentSwagger } from "../modules/payment/swagger/payment.swagger";
import {postSwagger} from "../modules/post/swagger/post.swagger";
import { userSwagger } from "../modules/user/swagger/user.swagger";
import { SwaggerBuilder } from "./swagger-builder";

const swaggerBuilder = new SwaggerBuilder()
  .addTag("Health", "Health check endpoints")
  .addTag("Auth", "Authentication endpoints")
  .addTag("Orders", "Order management endpoints")
  .addTag("Cart", "Shopping cart management endpoints")
  .addTag("Users", "User management endpoints")
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
  });

// Merge auth, order, cart, and user swagger docs
const swaggerOptions = {
  openapi: "3.1.0",
  info: {
    title: "Backend API",
    version: "1.0.0",
    description: "API documentation for the backend service",
    contact: {
      name: "API Support",
      email: "support@example.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: process.env.API_URL || "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://api.example.com",
      description: "Production server",
    },
  ],
  ...swaggerBuilder.build(),
  paths: {
    ...swaggerBuilder.build().paths,
    ...authSwagger.paths,
    ...orderSwagger.paths,
    ...cartSwagger.paths,
    ...userSwagger.paths,
    ...cosmeticSwagger.paths,
    ...paymentSwagger.paths,
    ...postSwagger.paths,
  },
  components: {
    ...swaggerBuilder.build().components,
    ...(authSwagger.components || {}),
    ...(orderSwagger.components || {}),
    ...(cartSwagger.components || {}),
    ...(userSwagger.components || {}),
    ...(cosmeticSwagger.components || {}),
    ...(paymentSwagger.components || {}),
  },
};

export const swaggerConfig = (app: Express) => {
  try {
    // Serve Swagger UI
    app.use("/docs", swaggerUi.serve);

    // Setup Swagger UI
    app.get(
      "/docs",
      swaggerUi.setup(swaggerOptions, {
        explorer: true,
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Backend API Documentation",
        swaggerOptions: {
          persistAuthorization: true,
          displayRequestDuration: true,
          filter: true,
        },
      }),
    );

    app.get("/docs-json", (req: Request, res: Response) => {
      res.json(swaggerOptions);
    });

    // Health check endpoint
    app.get("/healthz", (req: Request, res: Response) => {
      res.json({ status: "ok" });
    });

    logger.info("Swagger UI is available at /docs", { service: "Swagger" });
  } catch (error) {
    logger.error("Failed to initialize Swagger:", error, { service: "Swagger" });
    throw error;
  }
};
