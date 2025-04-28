import { PrismaClient } from '@prisma/client';

// Database utilities
export const prisma = new PrismaClient();

export const clearDatabase = async () => {
  const tables = ['User', 'Post', 'Cosmetic', 'Order', 'Cart', 'Payment'];
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }
};

// Test data generators
export const createTestUser = async (data?: any) => {
  return await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'hashedPassword',
      name: 'Test User',
      role: 'USER',
      ...data,
    },
  });
};

export const createTestPost = async (data?: any) => {
  return await prisma.post.create({
    data: {
      title: 'Test Post',
      content: 'Test Content',
      authorId: 1,
      ...data,
    },
  });
};

export const createTestCosmetic = async (data?: any) => {
  return await prisma.cosmetic.create({
    data: {
      name: 'Test Cosmetic',
      price: 100,
      description: 'Test Description',
      ...data,
    },
  });
};

// Simple assertions
export const assertError = (error: any, status: number, message: string) => {
  if (!error || error.status !== status || error.message !== message) {
    throw new Error(`Expected error with status ${status} and message "${message}", but got ${JSON.stringify(error)}`);
  }
};

export const assertSuccess = (response: any, status: number) => {
  if (!response || response.status !== status) {
    throw new Error(`Expected success with status ${status}, but got ${JSON.stringify(response)}`);
  }
};

export const assertData = (data: any, expected: any) => {
  if (JSON.stringify(data) !== JSON.stringify(expected)) {
    throw new Error(`Expected data ${JSON.stringify(expected)}, but got ${JSON.stringify(data)}`);
  }
}; 
