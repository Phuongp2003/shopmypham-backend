import { SwaggerBuilder } from "@/config/swagger-builder";
import { CosmeticType } from "@prisma/client";

export const cosmeticSwagger = new SwaggerBuilder()
  .addTag("Cosmetics", "Cosmetic management endpoints")
  .addPath("/cosmetics", {
    get: {
      tags: ["Cosmetics"],
      summary: "Get all cosmetics",
      description:
        "Retrieve a list of cosmetics with optional filtering, sorting, and pagination",
      parameters: [
        {
          name: "search",
          in: "query",
          description: "Search term for name or description",
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter by cosmetic type",
          schema: { type: "string", enum: Object.values(CosmeticType) },
        },
        {
          name: "minPrice",
          in: "query",
          description: "Minimum price",
          schema: { type: "number", minimum: 0 },
        },
        {
          name: "maxPrice",
          in: "query",
          description: "Maximum price",
          schema: { type: "number", minimum: 0 },
        },
        {
          name: "sortBy",
          in: "query",
          description: "Field to sort by",
          schema: { type: "string", enum: ["price", "name", "createdAt"] },
        },
        {
          name: "sortOrder",
          in: "query",
          description: "Sort order",
          schema: { type: "string", enum: ["asc", "desc"] },
        },
        {
          name: "page",
          in: "query",
          description: "Page number",
          schema: { type: "integer", minimum: 1 },
        },
        {
          name: "limit",
          in: "query",
          description: "Number of items per page",
          schema: { type: "integer", minimum: 1 },
        },
        {
          name: "inStock",
          in: "query",
          description: "Filter by stock availability",
          schema: { type: "boolean" },
        },
      ],
      responses: {
        "200": {
          description: "List of cosmetics",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  cosmetics: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Cosmetic",
                    },
                  },
                  total: {
                    type: "integer",
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Cosmetics"],
      summary: "Create a new cosmetic",
      description: "Create a new cosmetic (requires manager or admin role)",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CosmeticCreateInput",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Cosmetic created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cosmetic",
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        "403": {
          description: "Forbidden",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        "404": {
          description: "Distributor or Style not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  })
  .addPath("/cosmetics/{id}", {
    get: {
      tags: ["Cosmetics"],
      summary: "Get cosmetic by ID",
      description: "Retrieve a cosmetic by its ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Cosmetic ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": {
          description: "Cosmetic details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cosmetic",
              },
            },
          },
        },
        "404": {
          description: "Cosmetic not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Cosmetics"],
      summary: "Update cosmetic",
      description: "Update a cosmetic (requires manager or admin role)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Cosmetic ID",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CosmeticUpdateInput",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Cosmetic updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cosmetic",
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        "403": {
          description: "Forbidden",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        "404": {
          description: "Cosmetic, Distributor or Style not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Cosmetics"],
      summary: "Delete cosmetic",
      description: "Delete a cosmetic (requires manager or admin role)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Cosmetic ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        "204": {
          description: "Cosmetic deleted successfully",
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        "403": {
          description: "Forbidden",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        "404": {
          description: "Cosmetic not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  })
  .addSchema("Cosmetic", {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      stock: { type: "integer" },
      type: { type: "string", enum: Object.values(CosmeticType) },
      distributorId: { type: "string" },
      styleId: { type: "string" },
      inStock: { type: "boolean" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  })
  .addSchema("CosmeticCreateInput", {
    type: "object",
    required: ["name", "price", "stock", "type", "distributorId", "styleId"],
    properties: {
      name: { type: "string", minLength: 1, maxLength: 255 },
      description: { type: "string" },
      price: { type: "number", minimum: 0 },
      stock: { type: "integer", minimum: 0 },
      type: { type: "string", enum: Object.values(CosmeticType) },
      distributorId: { type: "string" },
      styleId: { type: "string" },
    },
  })
  .addSchema("CosmeticUpdateInput", {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1, maxLength: 255 },
      description: { type: "string" },
      price: { type: "number", minimum: 0 },
      stock: { type: "integer", minimum: 0 },
      type: { type: "string", enum: Object.values(CosmeticType) },
      distributorId: { type: "string" },
      styleId: { type: "string" },
    },
  })
  .build();
