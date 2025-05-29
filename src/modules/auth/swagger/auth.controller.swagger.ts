import { SwaggerBuilder } from '@/config/swagger-builder';

export const authSwagger = new SwaggerBuilder()
    .addTag('Auth', 'Authentication endpoints')
    .addSecurityScheme('bearerAuth', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    })
    .addPath('/auth/login', {
        post: {
            summary: 'Login user',
            tags: ['Auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password'],
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                },
                                password: {
                                    type: 'string',
                                    format: 'password',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Login successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    accessToken: {
                                        type: 'string',
                                    },
                                    refreshToken: {
                                        type: 'string',
                                    },
                                    user: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Invalid credentials',
                },
            },
        },
    })
    .addPath('/auth/register', {
        post: {
            summary: 'Register new user',
            tags: ['Auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password', 'name'],
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                },
                                password: {
                                    type: 'string',
                                    format: 'password',
                                },
                                name: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'User registered successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input',
                },
            },
        },
    })
    .addPath('/auth/refresh-token', {
        post: {
            summary: 'Refresh access token',
            tags: ['Auth'],
            responses: {
                200: {
                    description: 'Token refreshed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    accessToken: {
                                        type: 'string',
                                    },
                                    refreshToken: {
                                        type: 'string',
                                    },
                                    user: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Invalid refresh token',
                },
            },
        },
    })
    .addPath('/auth/logout', {
        post: {
            summary: 'Logout user',
            tags: ['Auth'],
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Logout successful',
                },
                401: {
                    description: 'Unauthorized',
                },
            },
        },
    })
    .addPath('/auth/google', {
        get: {
            summary: 'Authenticate using Google OAuth',
            tags: ['Auth'],
            description: 'Redirects to Google authentication page',
            responses: {
                302: {
                    description: 'Redirect to Google authentication',
                },
            },
        },
    })
    .addPath('/auth/google/callback', {
        get: {
            summary: 'Google OAuth callback',
            tags: ['Auth'],
            description: 'Callback endpoint for Google OAuth authentication',
            responses: {
                302: {
                    description:
                        'Redirect to frontend with authentication result',
                },
                401: {
                    description: 'Authentication failed',
                },
            },
        },
    })
    .addSchema('User', {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
            email: {
                type: 'string',
                format: 'email',
            },
            name: {
                type: 'string',
            },
            role: {
                type: 'string',
                enum: ['ADMIN', 'MANAGER', 'USER'],
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
            },
        },
    })
    .build();
