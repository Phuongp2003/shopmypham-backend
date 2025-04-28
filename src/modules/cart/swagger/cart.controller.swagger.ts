import { SwaggerBuilder } from '@/config/swagger-builder';

export const cartSwagger = new SwaggerBuilder()
    .addTag('Cart', 'Cart management endpoints')
    .addSecurityScheme('bearerAuth', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    })
    .addPath('/cart', {
        get: {
            summary: 'Get user cart',
            tags: ['Cart'],
            description: 'Get the current user\'s shopping cart',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Cart retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    userId: { type: 'string' },
                                    details: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string' },
                                                cosmeticId: { type: 'string' },
                                                quantity: { type: 'number' },
                                                price: { type: 'number' },
                                                cosmetic: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'string' },
                                                        name: { type: 'string' },
                                                        description: { type: 'string' },
                                                        price: { type: 'number' },
                                                        stock: { type: 'number' }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' }
            }
        },
        post: {
            summary: 'Create new cart',
            tags: ['Cart'],
            description: 'Create a new shopping cart for the current user',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['items'],
                            properties: {
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['cosmeticId', 'quantity'],
                                        properties: {
                                            cosmeticId: { type: 'string' },
                                            quantity: { type: 'number', minimum: 1 }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Cart created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Cart'
                            }
                        }
                    }
                },
                400: { $ref: '#/components/responses/BadRequestError' },
                401: { $ref: '#/components/responses/UnauthorizedError' }
            }
        },
        put: {
            summary: 'Update cart',
            tags: ['Cart'],
            description: 'Update the current user\'s shopping cart',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['items'],
                            properties: {
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['cosmeticId', 'quantity'],
                                        properties: {
                                            cosmeticId: { type: 'string' },
                                            quantity: { type: 'number', minimum: 1 }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Cart updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Cart'
                            }
                        }
                    }
                },
                400: { $ref: '#/components/responses/BadRequestError' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' }
            }
        },
        delete: {
            summary: 'Clear cart',
            tags: ['Cart'],
            description: 'Clear all items from the current user\'s shopping cart',
            security: [{ bearerAuth: [] }],
            responses: {
                204: {
                    description: 'Cart cleared successfully'
                },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' }
            }
        }
    })
    .addPath('/cart/summary', {
        get: {
            summary: 'Get cart summary',
            tags: ['Cart'],
            description: 'Get a summary of the current user\'s shopping cart',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Cart summary retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    totalItems: { type: 'number' },
                                    totalPrice: { type: 'number' },
                                    items: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                cosmeticId: { type: 'string' },
                                                name: { type: 'string' },
                                                quantity: { type: 'number' },
                                                price: { type: 'number' },
                                                total: { type: 'number' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' }
            }
        }
    })
    .addSchema('Cart', {
        type: 'object',
        properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            details: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        cosmeticId: { type: 'string' },
                        quantity: { type: 'number' },
                        price: { type: 'number' },
                        cosmetic: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                description: { type: 'string' },
                                price: { type: 'number' },
                                stock: { type: 'number' }
                            }
                        }
                    }
                }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
        }
    })
    .build();
