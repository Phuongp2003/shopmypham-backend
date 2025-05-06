import { SwaggerBuilder } from "@/config/swagger-builder";

export const orderSwagger = new SwaggerBuilder()
  .addTag("Orders", "Order management endpoints")
  .addSecurityScheme("bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  })
  .addPath("/orders", {
    post: {
      summary: "Create a new order",
      tags: ["Orders"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["shippingAddress", "details"],
              properties: {
                shippingAddress: {
                  type: "string",
                  description: "Shipping address for the order",
                },
                note: {
                  type: "string",
                  description: "Optional note for the order",
                },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["cosmeticId", "quantity", "price"],
                    properties: {
                      cosmeticId: {
                        type: "string",
                        description: "ID of the cosmetic product",
                      },
                      quantity: {
                        type: "integer",
                        description: "Quantity of the product",
                      },
                      price: {
                        type: "number",
                        description: "Price of the product",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Order created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        400: {
          description: "Invalid input or insufficient stock",
        },
        401: {
          description: "Unauthorized",
        },
      },
    },
    get: {
      summary: "Get list of orders",
      tags: ["Orders"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "status",
          in: "query",
          schema: {
            type: "string",
            enum: [
              "PENDING",
              "PROCESSING",
              "SHIPPED",
              "DELIVERED",
              "CANCELLED",
            ],
          },
          description: "Filter by order status",
        },
        {
          name: "page",
          in: "query",
          schema: {
            type: "integer",
            default: 1,
          },
          description: "Page number",
        },
        {
          name: "limit",
          in: "query",
          schema: {
            type: "integer",
            default: 10,
          },
          description: "Items per page",
        },
        {
          name: "sortBy",
          in: "query",
          schema: {
            type: "string",
            default: "createdAt",
          },
          description: "Field to sort by",
        },
        {
          name: "sortOrder",
          in: "query",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
            default: "desc",
          },
          description: "Sort order",
        },
      ],
      responses: {
        200: {
          description: "List of orders",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Order",
                    },
                  },
                  meta: {
                    type: "object",
                    properties: {
                      total: {
                        type: "integer",
                      },
                      page: {
                        type: "integer",
                      },
                      limit: {
                        type: "integer",
                      },
                      totalPages: {
                        type: "integer",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
        },
      },
    },
  })
  .addPath("/orders/{id}", {
    get: {
      summary: "Get order by ID",
      tags: ["Orders"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "Order ID",
        },
      ],
      responses: {
        200: {
          description: "Order details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
        },
        403: {
          description: "Forbidden",
        },
        404: {
          description: "Order not found",
        },
      },
    },
  })
  .addPath("/orders/{id}/status", {
    patch: {
      summary: "Update order status",
      tags: ["Orders"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "Order ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["status"],
              properties: {
                status: {
                  type: "string",
                  enum: [
                    "PENDING",
                    "PROCESSING",
                    "SHIPPED",
                    "DELIVERED",
                    "CANCELLED",
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Order status updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
        },
        403: {
          description: "Forbidden",
        },
        404: {
          description: "Order not found",
        },
      },
    },
  })
  .addPath("/orders/{id}/cancel", {
    post: {
      summary: "Cancel order",
      tags: ["Orders"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "Order ID",
        },
      ],
      responses: {
        200: {
          description: "Order cancelled",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        400: {
          description: "Order cannot be cancelled",
        },
        401: {
          description: "Unauthorized",
        },
        403: {
          description: "Forbidden",
        },
        404: {
          description: "Order not found",
        },
      },
    },
  })
  .addSchema("Order", {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      userId: {
        type: "string",
      },
      status: {
        type: "string",
        enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      },
      shippingAddress: {
        type: "string",
      },
      note: {
        type: "string",
      },
      details: {
        type: "array",
        items: {
          $ref: "#/components/schemas/OrderDetail",
        },
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  })
  .addSchema("OrderDetail", {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      orderId: {
        type: "string",
      },
      cosmeticId: {
        type: "string",
      },
      quantity: {
        type: "integer",
      },
      price: {
        type: "number",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  })
  .build();
