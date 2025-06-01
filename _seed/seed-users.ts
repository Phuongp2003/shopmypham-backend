import { prisma } from '../src/config/prisma';
import bcrypt from 'bcrypt';

export async function seedUsers() {
  const userNames = [
    'Nguyễn Văn A',
    'Nguyễn Văn B',
    'Nguyễn Văn C',
    'Nguyễn Văn D',
    'Nguyễn Văn E',
  ];
  const users = [];
  for (const name of userNames) {
    const email = name.toLowerCase().replace(/ /g, '') + '@example.com';
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, role: 'user' },
      create: {
        email,
        name,
        password: await bcrypt.hash('User@123', 10), // Hashed password
        role: 'user',
        secretKey: 'user-secret-key',
      },
    });
    users.push(user);
  }
  console.log(`✅ Created/updated ${users.length} sample users`);
  return users;
} 
