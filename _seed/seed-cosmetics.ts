import { prisma } from '../src/config/prisma';
import { CosmeticType } from '../src/modules/cosmetic/cosmetic.types';

// Helper function to generate placeholder images
const generateImageUrl = (width: number = 400, height: number = 400, seed?: string): string => {
  if (seed) {
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  }
  return `https://picsum.photos/${width}/${height}`;
};

// Cosmetic sample data (chỉ 3 mẫu, sẽ clone để đủ 20)
const cosmeticSampleData = [
  {
    name: "Sữa rửa mặt dịu nhẹ",
    description: "Làm sạch sâu, phù hợp da nhạy cảm.",
    price: 120000,
    stock: 100,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "cleanser"),
    usageInstructions: "<p>Bước 1: Làm ướt mặt với nước ấm</p><p>Bước 2: Lấy lượng vừa đủ sản phẩm, massage nhẹ nhàng</p><p>Bước 3: Rửa sạch với nước và thấm khô</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "150ml" },
      { key: "Thành phần", value: "Chiết xuất trà xanh" }
    ],
    benefits: [
      { benefitKey: "Làm sạch sâu", benefitValue: "Công thức đặc biệt giúp làm sạch sâu các tạp chất và bụi bẩn trong lỗ chân lông", orderIndex: 1 },
      { benefitKey: "Dịu nhẹ cho da", benefitValue: "Chiết xuất thiên nhiên giúp làm dịu da, phù hợp cho da nhạy cảm", orderIndex: 2 },
      { benefitKey: "Cân bằng độ ẩm", benefitValue: "Không làm khô da, duy trì độ ẩm tự nhiên của da", orderIndex: 3 }
    ],
    badges: [
      { badgeType: "QUALITY", title: "Chất lượng cao cấp", icon: "⭐", color: "gold", orderIndex: 1 },
      { badgeType: "MADE_IN", title: "Sản xuất tại Việt Nam", icon: "🇻🇳", color: "green", orderIndex: 2 }
    ],
    variants: [
      { name: "Dạng tuýp nhỏ", sku: "SRM-01", price: 120000, stock: 30, image: generateImageUrl(400, 400, "cleanser-tube-small"), optionIds: ["option-1", "option-2"] },
      { name: "Dạng tuýp lớn", sku: "SRM-02", price: 180000, stock: 40, image: generateImageUrl(400, 400, "cleanser-tube-large"), optionIds: ["option-3", "option-4"] },
      { name: "Dạng chai", sku: "SRM-03", price: 200000, stock: 30, image: generateImageUrl(400, 400, "cleanser-bottle"), optionIds: ["option-5", "option-6"] }
    ]
  },
  // ... (cắt bớt, bạn có thể thêm mẫu khác nếu muốn)
];

function generateMoreCosmetics(baseData: any[], targetCount = 20): any[] {
  const cosmetics = [...baseData];
  let idx = 1;
  while (cosmetics.length < targetCount) {
    const base = baseData[idx % baseData.length];
    const newCosmetic = {
      ...base,
      name: `${base.name} (Demo ${cosmetics.length + 1})`,
      price: base.price + (idx * 10000),
      stock: base.stock + idx * 5,
      image: generateImageUrl(500, 500, `cosmetic-demo-${cosmetics.length + 1}`),
      variants: base.variants.map((v: any, vIdx: number) => ({
        ...v,
        name: `${v.name} (Demo ${cosmetics.length + 1}-${vIdx + 1})`,
        sku: `${v.sku}-D${cosmetics.length + 1}`,
        price: v.price + vIdx * 5000,
        stock: v.stock + vIdx * 2,
        image: generateImageUrl(400, 400, `variant-demo-${cosmetics.length + 1}-${vIdx + 1}`),
        optionIds: v.optionIds.slice(0, 2 + ((vIdx + idx) % 2)),
      })),
    };
    cosmetics.push(newCosmetic);
    idx++;
  }
  return cosmetics;
}

export async function seedCosmetics() {
  const cosmeticData20 = generateMoreCosmetics(cosmeticSampleData, 20);
  const allCreatedVariants: any[] = [];
  for (const cosmetic of cosmeticData20) {
    const existingCosmetic = await prisma.cosmetic.findFirst({ where: { name: cosmetic.name } });
    if (existingCosmetic) {
      console.log(`ℹ️  Cosmetic "${cosmetic.name}" already exists, skipping...`);
      continue;
    }
    await prisma.$transaction(async (tx) => {
      const createdCosmetic = await tx.cosmetic.create({
        data: {
          name: cosmetic.name,
          description: cosmetic.description,
          price: cosmetic.price,
          stock: cosmetic.stock,
          type: cosmetic.type,
          distributorId: cosmetic.distributorId,
          image: cosmetic.image,
          usageInstructions: cosmetic.usageInstructions,
          shippingPolicyId: cosmetic.shippingPolicyId,
        },
      });
      // Create variants
      if (cosmetic.variants?.length > 0) {
        for (const variant of cosmetic.variants) {
          const createdVariant = await tx.cosmeticVariant.create({
            data: {
              cosmeticId: createdCosmetic.id,
              name: variant.name,
              sku: variant.sku,
              price: variant.price,
              stock: variant.stock,
              image: variant.image,
              CosmeticOption: {
                connect: variant.optionIds.map((id: string) => ({ id }))
              }
            },
          });
          allCreatedVariants.push(createdVariant);
        }
      }
    });
    console.log(`✅ Created enhanced cosmetic "${cosmetic.name}" with variants`);
  }
  return { allVariants: allCreatedVariants };
} 
