import { execSync } from 'child_process';
import { join } from 'path';

// Get absolute path to test.prisma
const testPrismaPath = join(__dirname, '../../prisma/test.prisma');

// Run Prisma migrations for test database
try {
    execSync(`npx prisma migrate deploy --schema=${testPrismaPath}`, {
        stdio: 'inherit',
    });
    console.log('Test database migrations completed successfully');
} catch (error) {
    console.error('Failed to run test database migrations:', error);
    process.exit(1);
}
