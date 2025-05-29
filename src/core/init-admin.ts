import { logger } from "../common/logger/logger.factory";
import { prisma } from "../config/prisma";
import { AuthService } from "../modules/auth/auth.service";
import bcrypt from 'bcrypt'

export async function initAdminUser() {
  try {
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: {
        email: "admin@phuongy.works",
      },
    });

    if (!adminUser) {
      // Create admin user if not exists
      const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "Admin@123";
			const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await AuthService.register({
        email: "admin@phuongy.works",
        password: hashedPassword,
        name: "System Administrator",
        role: "admin",
      });
      logger.info("Admin user created successfully", { service: "InitAdmin" });
    } else {
      logger.info("Admin user already exists", { service: "InitAdmin" });
    }
  } catch (error) {
    logger.error("Failed to initialize admin user:", error, {
      service: "InitAdmin",
    });
    throw error;
  }
}
