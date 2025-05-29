import { SwaggerBuilder } from '@/config/swagger-builder';

export const userSwagger = new SwaggerBuilder()
    .addTag('Users', 'User management endpoints')
    .addPath('/users', {
        get: {
            tags: ['Users'],
            summary: 'Get all users',
            description: 'Get a list of all users (admin only)',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'List of users',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/User' },
                            },
                        },
                    },
                },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                403: { $ref: '#/components/responses/ForbiddenError' },
            },
        },
        post: {
            tags: ['Users'],
            summary: 'Create new user',
            description: 'Create a new user (admin only)',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/CreateUserDTO' },
                    },
                },
            },
            responses: {
                201: {
                    description: 'User created successfully',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' },
                        },
                    },
                },
                400: { $ref: '#/components/responses/BadRequestError' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                403: { $ref: '#/components/responses/ForbiddenError' },
            },
        },
    })
    .addPath('/users/me', {
        get: {
            tags: ['Users'],
            summary: 'Get current user info',
            description: 'Get info of the authenticated user',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Current user info',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' },
                        },
                    },
                },
                401: { $ref: '#/components/responses/UnauthorizedError' },
            },
        },
        put: {
            tags: ['Users'],
            summary: 'Update current user',
            description: 'Update info of the authenticated user',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UpdateUserDTO' },
                    },
                },
            },
            responses: {
                200: {
                    description: 'User updated successfully',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' },
                        },
                    },
                },
                400: { $ref: '#/components/responses/BadRequestError' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
            },
        },
        delete: {
            tags: ['Users'],
            summary: 'Delete current user',
            description: 'Delete the authenticated user',
            security: [{ bearerAuth: [] }],
            responses: {
                204: { description: 'User deleted successfully' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
            },
        },
    })
    .addPath('/users/{id}', {
        get: {
            tags: ['Users'],
            summary: 'Get user by ID',
            description: 'Get user details by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: {
                    description: 'User details',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' },
                        },
                    },
                },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' },
            },
        },
        put: {
            tags: ['Users'],
            summary: 'Update user',
            description: 'Update user details',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UpdateUserDTO' },
                    },
                },
            },
            responses: {
                200: {
                    description: 'User updated successfully',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' },
                        },
                    },
                },
                400: { $ref: '#/components/responses/BadRequestError' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' },
            },
        },
        delete: {
            tags: ['Users'],
            summary: 'Delete user',
            description: 'Delete a user (admin only)',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                204: { description: 'User deleted successfully' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                403: { $ref: '#/components/responses/ForbiddenError' },
                404: { $ref: '#/components/responses/NotFoundError' },
            },
        },
    })
    .addPath('/users/{userId}/addresses', {
        get: {
            tags: ['Users'],
            summary: 'Get user addresses',
            description: 'Get all addresses for a user',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'userId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: {
                    description: 'List of addresses',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/Address' },
                            },
                        },
                    },
                },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' },
            },
        },
    })
    .addPath('/users/addresses/{id}', {
        get: {
            tags: ['Users'],
            summary: 'Get address by ID',
            description: 'Get address details by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: {
                    description: 'Address details',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Address' },
                        },
                    },
                },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' },
            },
        },
        put: {
            tags: ['Users'],
            summary: 'Update address',
            description: 'Update address details',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/UpdateAddressDTO',
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Address updated successfully',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Address' },
                        },
                    },
                },
                400: { $ref: '#/components/responses/BadRequestError' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' },
            },
        },
        delete: {
            tags: ['Users'],
            summary: 'Delete address',
            description: 'Delete an address',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                204: { description: 'Address deleted successfully' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' },
            },
        },
    })
    .addPath('/users/addresses', {
        post: {
            tags: ['Users'],
            summary: 'Create address',
            description: 'Create a new address for a user',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CreateAddressDTO',
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Address created successfully',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Address' },
                        },
                    },
                },
                400: { $ref: '#/components/responses/BadRequestError' },
                401: { $ref: '#/components/responses/UnauthorizedError' },
                404: { $ref: '#/components/responses/NotFoundError' },
            },
        },
    })
    .addSchema('User', {
        type: 'object',
        properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            role: { type: 'string' },
            phone: { type: 'string', nullable: true },
            googleId: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
        },
    })
    .addSchema('CreateUserDTO', {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            name: { type: 'string' },
            role: { type: 'string' },
        },
    })
    .addSchema('UpdateUserDTO', {
        type: 'object',
        properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
        },
    })
    .addSchema('Address', {
        type: 'object',
        properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            postalCode: { type: 'string' },
            isDefault: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
        },
    })
    .addSchema('CreateAddressDTO', {
        type: 'object',
        required: [
            'userId',
            'street',
            'city',
            'state',
            'country',
            'postalCode',
        ],
        properties: {
            userId: { type: 'string' },
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            postalCode: { type: 'string' },
            isDefault: { type: 'boolean' },
        },
    })
    .addSchema('UpdateAddressDTO', {
        type: 'object',
        properties: {
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            postalCode: { type: 'string' },
            isDefault: { type: 'boolean' },
        },
    })
    .build();
