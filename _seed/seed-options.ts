import { prisma } from '../src/config/prisma';

const optionSampleData = [
  { optionKey: "Loại da", optionValue: "Da dầu", id: "option-1" },
  { optionKey: "Loại da", optionValue: "Da khô", id: "option-2" },
  { optionKey: "Loại da", optionValue: "Da hỗn hợp", id: "option-3" },
  { optionKey: "Mùi hương", optionValue: "Trà xanh", id: "option-4" },
  { optionKey: "Mùi hương", optionValue: "Hoa hồng", id: "option-5" },
  { optionKey: "Mùi hương", optionValue: "Dâu tây", id: "option-6" },
  { optionKey: "Chỉ số chống nắng", optionValue: "SPF 30", id: "option-7" },
  { optionKey: "Chỉ số chống nắng", optionValue: "SPF 50+", id: "option-8" },
  { optionKey: "Dạng sản phẩm", optionValue: "Tuýp", id: "option-9" },
  { optionKey: "Dạng sản phẩm", optionValue: "Xịt", id: "option-10" },
  { optionKey: "Loại da", optionValue: "Da nhạy cảm", id: "option-11" },
  { optionKey: "Loại da", optionValue: "Da thường", id: "option-12" },
  { optionKey: "Mùi hương", optionValue: "Bạc hà", id: "option-13" },
  { optionKey: "Mùi hương", optionValue: "Cam", id: "option-14" },
  { optionKey: "Chỉ số chống nắng", optionValue: "SPF 15", id: "option-15" },
  { optionKey: "Chỉ số chống nắng", optionValue: "SPF 100", id: "option-16" },
  { optionKey: "Dạng sản phẩm", optionValue: "Hũ", id: "option-17" },
  { optionKey: "Dạng sản phẩm", optionValue: "Lọ", id: "option-18" },
  { optionKey: "Thành phần", optionValue: "Vitamin C", id: "option-19" },
  { optionKey: "Thành phần", optionValue: "Niacinamide", id: "option-20" }
];

export async function seedOptions() {
  for (const option of optionSampleData) {
    await prisma.cosmeticOption.upsert({
      where: { id: option.id },
      update: {
        optionKey: option.optionKey,
        optionValue: option.optionValue
      },
      create: {
        id: option.id,
        optionKey: option.optionKey,
        optionValue: option.optionValue
      }
    });
  }
  console.log(`✅ Created/updated ${optionSampleData.length} options`);
} 
