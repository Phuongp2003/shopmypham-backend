import { SwaggerBuilder } from "@/config/swagger-builder";
import { CosmeticType } from "@prisma/client";

export const cosmeticSwagger = new SwaggerBuilder()
  .addTag("Cosmetics", "Cosmetic management endpoints")
  .addPath("/cosmetics", {
    get: {
      tags: ["Cosmetics"],
      summary: "Get all cosmetics",
      description: "Retrieve a list of cosmetics with optional filtering, sorting, and pagination",
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
          schema: { type: "string", enum: ["SKINCARE", "MAKEUP", "HAIRCARE", "FRAGRANCE"] },
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
          name: "color",
          in: "query",
          description: "Filter by color",
          schema: { type: "string" },
        },
        {
          name: "sortBy",
          in: "query",
          description: "Field to sort by",
          schema: { type: "string", enum: ["basePrice", "name", "createdAt"] },
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
      description: "Create a new cosmetic with variants (requires manager or admin role)",
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
        "400": {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
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
      },
    },
  })
  .addPath("/cosmetics/{id}", {
    get: {
      tags: ["Cosmetics"],
      summary: "Get cosmetic by ID",
      description: "Retrieve a cosmetic by its ID with all variants",
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
          description: "Cosmetic details with variants",
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
        "400": {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
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
    delete: {
      tags: ["Cosmetics"],
      summary: "Delete cosmetic",
      description: "Delete a cosmetic and all its variants (requires manager or admin role)",
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
  .addPath("/cosmetics/{id}/variants", {
    post: {
      tags: ["Cosmetics"],
      summary: "Add variant to cosmetic",
      description: "Add a new variant to an existing cosmetic (requires manager or admin role)",
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
              $ref: "#/components/schemas/CosmeticVariantInput",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Variant added successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CosmeticVariant",
              },
            },
          },
        },
        "400": {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
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
  .addPath("/cosmetics/variants/{variantId}", {
    put: {
      tags: ["Cosmetics"],
      summary: "Update variant",
      description: "Update a cosmetic variant (requires manager or admin role)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "variantId",
          in: "path",
          required: true,
          description: "Variant ID",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CosmeticVariantInput",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Variant updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CosmeticVariant",
              },
            },
          },
        },
        "400": {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
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
          description: "Variant not found",
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
      summary: "Delete variant",
      description: "Delete a cosmetic variant (requires manager or admin role)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "variantId",
          in: "path",
          required: true,
          description: "Variant ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        "204": {
          description: "Variant deleted successfully",
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
          description: "Variant not found",
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
  .addSchema("Error", {
    type: "object",
    properties: {
      statusCode: { type: "integer" },
      message: { type: "string" },
      error: { type: "string" },
    },
  })

  // Update the Cosmetic schema to include distributor information
.addSchema("Cosmetic", {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    type: { type: "string", enum: ["SKINCARE", "MAKEUP", "HAIRCARE", "FRAGRANCE"] },
    price: { type: "number" },  // Changed from basePrice to price to match your service
    description: { type: "string" },
    stock: { type: "integer" },  // Added stock field
    distributorId: { type: "string" },  // Added distributorId
    distributor: {  // Added distributor object
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
      }
    },
    specifications: {
      type: "array",  // Changed from object to array to match your service
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          specKey: { type: "string" },
          specValue: { type: "string" },
        }
      }
    },
    variants: {
      type: "array",
      items: {
        $ref: "#/components/schemas/CosmeticVariant",
      },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
})

// Update CosmeticCreateInput to include required distributorId
.addSchema("CosmeticCreateInput", {
  type: "object",
  required: ["name", "type", "price", "stock", "distributorId"],  // Added distributorId to required
  properties: {
    name: { type: "string", minLength: 1, maxLength: 255 },
    type: { type: "string", enum: ["SKINCARE", "MAKEUP", "HAIRCARE", "FRAGRANCE"] },
    price: { type: "number", minimum: 0 },  // Changed from basePrice to price
    stock: { type: "integer", minimum: 0 },  // Added stock
    description: { type: "string" },
    distributorId: { type: "string" },  // Added distributorId
    specifications: {
      type: "array",  // Changed from object to array
      items: {
        type: "object",
        properties: {
          key: { type: "string" },  // Changed to match your service's input
          value: { type: "string" },
        }
      }
    },
    variants: {
      type: "array",
      minItems: 1,
      items: {
        $ref: "#/components/schemas/CosmeticVariantInput",
      },
    },
  },
})

// Update CosmeticUpdateInput to include distributorId
.addSchema("CosmeticUpdateInput", {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 255 },
    type: { type: "string", enum: ["SKINCARE", "MAKEUP", "HAIRCARE", "FRAGRANCE"] },
    price: { type: "number", minimum: 0 },  // Changed from basePrice to price
    stock: { type: "integer", minimum: 0 },  // Added stock
    description: { type: "string" },
    distributorId: { type: "string" },  // Added distributorId
    specifications: {
      type: "array",  // Changed from object to array
      items: {
        type: "object",
        properties: {
          key: { type: "string" },  // Changed to match your service's input
          value: { type: "string" },
        }
      }
    },
  },
})

// Update CosmeticVariant to match your service's structure
.addSchema("CosmeticVariant", {
  type: "object",
  properties: {
    id: { type: "string" },
    sku: { type: "string" },
    price: { type: "number" },
    stock: { type: "integer" },
    inStock: { type: "boolean" },  // Added inStock
    displayName: { type: "string" },  // Added displayName
    options: {  // Changed from attributes to options to match your service
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          optionKey: { type: "string" },
          optionValue: { type: "string" },
        }
      }
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
})

// Update CosmeticVariantInput to match your service's input
.addSchema("CosmeticVariantInput", {
  type: "object",
  required: ["sku", "price", "stock", "options"],  // Added options to required
  properties: {
    sku: { type: "string" },
    price: { type: "number", minimum: 0 },
    stock: { type: "integer", minimum: 0 },
    options: {  // Changed from attributes to options
      type: "array",
      items: {
        type: "object",
        properties: {
          key: { type: "string" },
          value: { type: "string" },
        },
        required: ["key", "value"]
      }
    },
  },
})
  .build();