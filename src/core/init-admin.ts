import { prisma } from '../config/prisma';
import { AuthService } from '../modules/auth/auth.service';
import { logger } from '../common/logger/logger.factory';

export async function initAdminUser() {
  try {
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: {
        email: 'admin@phuongy.works'
      }
    });

    if (!adminUser) {
      // Create admin user if not exists
      const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@123';
      await AuthService.register('admin@phuongy.works', adminPassword, 'admin', 'System Administrator');
      logger.info('Admin user created successfully');
    } else {
      logger.info('Admin user already exists');
    }
  } catch (error) {
    logger.error('Failed to initialize admin user:', error);
    throw error;
  }
} 
