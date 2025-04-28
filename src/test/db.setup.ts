import { PrismaClient } from '@prisma/client';
import { prisma } from '@/config/prisma';
import { execSync } from 'child_process';
import path from 'path';

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connection established');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}

async function dropDatabase(dbName: string) {
  const result = await prisma.$queryRaw<{ Database: string }[]>`SHOW DATABASES`;
  if (result && Array.isArray(result) && result.some(db => db.Database === dbName)) {
    console.log(`Database ${dbName} exists, dropping it...`);
    await prisma.$executeRawUnsafe(`DROP DATABASE ${dbName}`);
  } else {
    console.log(`Database ${dbName} does not exist, no need to drop.`);
  }
}

async function createDatabase(dbName: string) {
  console.log(`Creating database ${dbName}...`);
  await prisma.$executeRawUnsafe(`CREATE DATABASE ${dbName}`);
}

async function runMigrations() {
  console.log('Running Prisma migrations...');
  const testPrismaPath = path.join(process.cwd(), 'prisma', 'test.prisma');
  execSync(`npx prisma migrate deploy --schema=${testPrismaPath}`, {
    stdio: 'inherit',
  });
  console.log('Prisma migrations completed');

  // Kiểm tra xem bảng User có tồn tại không
  const users = await prisma.user.findMany();
  console.log(`Users in database after migration: ${JSON.stringify(users)}`);
}

async function seedDatabase() {
  console.log('Seeding database with sample data...');
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    },
  });
  console.log(`User created: ${JSON.stringify(user)}`);
}

async function checkDatabaseStatus() {
  const userCount = await prisma.user.count();
  console.log('Database status:');
  console.log(`- Users: ${userCount}`);
  if (userCount === 0) {
    console.error('No users found in the database. Exiting...');
    throw new Error('Database is empty');
  }
}

export async function setupDatabase() {
  const dbName = 'shopmyphamtest';
  try {
    await connectToDatabase();
    await dropDatabase(dbName);
    await createDatabase(dbName);
    await runMigrations();
    await seedDatabase();
    await checkDatabaseStatus();
    return true;
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
} 
