import { SwaggerBuilder } from "@/config/swagger-builder";

export const postSwagger = new SwaggerBuilder()
  .addTag("Posts", "Post management endpoints")
  .addPath("/posts", {
    get: {
      tags: ["Posts"],
      summary: "Get all posts",
      description:
        "Retrieve a list of posts with optional filtering, sorting, and pagination",
      parameters: [
        {
          name: "search",
          in: "query",
          description: "Search term for title or content",
          schema: { type: "string" },
        },
        {
          name: "sortBy",
          in: "query",
          description: "Field to sort by",
          schema: { type: "string", enum: ["createdAt", "title"] },
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
          name: "published",
          in: "query",
          description: "Filter by published status",
          schema: { type: "boolean" },
        },
      ],
      responses: {
        "200": {
          description: "List of posts",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  posts: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Post",
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
      tags: ["Posts"],
      summary: "Create a new post",
      description: "Create a new post (requires manager or admin role)",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostCreateInput",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Post created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
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
  .addPath("/posts/{id}", {
    get: {
      tags: ["Posts"],
      summary: "Get post by ID",
      description: "Retrieve a post by its ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Post ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": {
          description: "Post details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
            },
          },
        },
        "404": {
          description: "Post not found",
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
      tags: ["Posts"],
      summary: "Update post",
      description: "Update a post (requires manager or admin role)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Post ID",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostUpdateInput",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Post updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
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
          description: "Post not found",
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
      tags: ["Posts"],
      summary: "Delete post",
      description: "Delete a post (requires manager or admin role)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Post ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        "204": {
          description: "Post deleted successfully",
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
          description: "Post not found",
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
  .addSchema("Post", {
    type: "object",
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      content: { type: "string" },
      published: { type: "boolean" },
      author: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
        },
      },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  })
  .addSchema("PostCreateInput", {
    type: "object",
    required: ["title", "content"],
    properties: {
      title: { type: "string", minLength: 1, maxLength: 255 },
      content: { type: "string", minLength: 1 },
      published: { type: "boolean" },
    },
  })
  .addSchema("PostUpdateInput", {
    type: "object",
    properties: {
      title: { type: "string", minLength: 1, maxLength: 255 },
      content: { type: "string", minLength: 1 },
      published: { type: "boolean" },
    },
  })
  .build();
