import { Redis } from 'ioredis';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { PrismaClient } from '@prisma/client';

import { setupDatabase } from './db.setup';
import { clearDatabase } from './utils';

// Mock Prisma Client
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => mockDeep<PrismaClient>()),
}));

// Mock Redis Client
jest.mock('ioredis', () => {
    return jest.fn().mockImplementation(() => mockDeep<Redis>());
});

// Global test variables
declare global {
    var prismaMock: DeepMockProxy<PrismaClient>;
    var redisMock: DeepMockProxy<Redis>;
}

// Setup before each test
beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Initialize global mocks
    global.prismaMock = mockDeep<PrismaClient>();
    global.redisMock = mockDeep<Redis>();
});

// Global setup
beforeAll(async () => {
    // Setup any global configurations here
    process.env.NODE_ENV = 'test';

    // Setup database
    await setupDatabase();
});

// Clean up after each test
afterEach(async () => {
    await clearDatabase();
});

// Global teardown
afterAll(async () => {
    // Clean up any global resources here
    jest.restoreAllMocks();
});
