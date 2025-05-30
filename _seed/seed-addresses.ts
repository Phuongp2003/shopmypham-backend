import { prisma } from '../src/config/prisma';

export async function seedAddresses(users: any[]) {
  const addressMap: Record<string, string> = {};
  for (const user of users) {
    const address = await prisma.address.create({
      data: {
        userId: user.id,
        recipientName: user.name,
        phone: '0123456789',
        addressLine: '123 Đường ABC, Quận 1, TP.HCM',
        district: 'Quận 1',
        city: 'Hồ Chí Minh',
        isDefault: true,
      },
    });
    addressMap[user.id] = address.id;
  }
  console.log(`✅ Seeded addresses for ${users.length} users`);
  return addressMap;
} 
