import { prisma } from '../src/config/prisma';

export async function seedDistributors() {
  const distributorId = "distributor-1";
  const existingDistributor = await prisma.cosmeticDistributor.findUnique({
    where: { id: distributorId }
  });

  if (!existingDistributor) {
    await prisma.cosmeticDistributor.create({
      data: {
        id: distributorId,
        name: "Nhà phân phối mẫu",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        phone: "0123456789",
        email: "distributor@example.com"
      }
    });
    console.log('✅ Created sample distributor');
  } else {
    console.log('ℹ️  Sample distributor already exists');
  }
} 
