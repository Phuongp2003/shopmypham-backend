import { prisma } from '../src/config/prisma';
import bcrypt from 'bcrypt';
export async function seedAdmins() {
  // Admin mặc định đã có ở init-admin.ts: admin@phuongy.works
  const admins = [
    {
      email: 'admin2@phuongy.works',
      name: 'Admin Seed 2',
      password: await bcrypt.hash('Admin@123', 10), // Hashed password
      role: 'admin',
    },
  ];
  for (const admin of admins) {
    await prisma.user.upsert({
      where: { email: admin.email },
      update: { name: admin.name, role: 'admin' },
      create: {
        email: admin.email,
        name: admin.name,
        password: admin.password,
        role: 'admin',
        secretKey: 'admin-secret-key',
      },
    });
  }
  console.log('✅ Seeded additional admin(s)');
} 
