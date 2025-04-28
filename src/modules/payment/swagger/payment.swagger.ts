import { SwaggerBuilder } from '@/config/swagger-builder';

export const paymentSwagger = new SwaggerBuilder()
    .addTag('Payment', 'Payment endpoints')
    .addSecurityScheme('bearerAuth', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    })
    .addPath('/payment', {
        post: {
            summary: 'Create payment',
            tags: ['Payment'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['orderId', 'amount', 'paymentMethod'],
                            properties: {
                                orderId: {
                                    type: 'string'
                                },
                                amount: {
                                    type: 'number'
                                },
                                paymentMethod: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Payment created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string'
                                        },
                                        orderId: {
                                            type: 'string'
                                        },
                                        amount: {
                                            type: 'number'
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        paymentMethod: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    404: {
                        description: 'Order not found'
                    },
                    500: {
                        description: 'Internal server error'
                    }
                }
            }
        }
    })
    .addPath('/payment/momo', {
        post: {
            summary: 'Create MOMO payment',
            tags: ['Payment'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['orderId', 'amount'],
                            properties: {
                                orderId: {
                                    type: 'string'
                                },
                                amount: {
                                    type: 'number'
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'MOMO payment created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        requestId: {
                                            type: 'string'
                                        },
                                        payUrl: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: 'Failed to create MOMO payment'
                    }
                }
            }
        }
    })
    .addPath('/payment/momo/callback', {
        post: {
            summary: 'MOMO payment callback',
            tags: ['Payment'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                orderId: {
                                    type: 'string'
                                },
                                resultCode: {
                                    type: 'number'
                                },
                                transId: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Callback processed successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    404: {
                        description: 'Payment not found'
                    }
                }
            }
        }
    })
    .addPath('/payment/{id}', {
        get: {
            summary: 'Get payment by ID',
            tags: ['Payment'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Payment retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'string'
                                    },
                                    orderId: {
                                        type: 'string'
                                    },
                                    amount: {
                                        type: 'number'
                                    },
                                    status: {
                                        type: 'string'
                                    },
                                    paymentMethod: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Payment not found'
                }
            }
        }
    })
    .build();
