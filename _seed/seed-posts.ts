import { prisma } from '../src/config/prisma';

function randomImage(seed: string) {
  return `https://picsum.photos/seed/${seed}/800/400`;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const postSamples = [
  {
    title: 'Bí quyết chăm sóc da mùa hè: 5 bước không thể thiếu',
    description: 'Hướng dẫn chi tiết các bước chăm sóc da mùa hè giúp da luôn khỏe mạnh, tươi sáng.',
    content: `
      <h2>1. Làm sạch da đúng cách</h2>
      <p>Vào mùa hè, da tiết nhiều dầu và mồ hôi hơn. Hãy sử dụng sữa rửa mặt dịu nhẹ, rửa mặt 2 lần/ngày để loại bỏ bụi bẩn và bã nhờn.</p>
      <h2>2. Tẩy tế bào chết định kỳ</h2>
      <p>Tẩy tế bào chết 1-2 lần/tuần giúp da thông thoáng, hấp thu dưỡng chất tốt hơn.</p>
      <h2>3. Dưỡng ẩm nhẹ nhàng</h2>
      <p>Chọn kem dưỡng dạng gel hoặc lotion mỏng nhẹ, không gây bí da.</p>
      <h2>4. Chống nắng mỗi ngày</h2>
      <p>Đừng quên thoa kem chống nắng SPF 30+ trước khi ra ngoài 20 phút.</p>
      <h2>5. Bổ sung nước và vitamin</h2>
      <p>Uống đủ nước, ăn nhiều rau xanh, trái cây để da luôn căng mịn.</p>
      <img src="https://picsum.photos/seed/skincare1/800/400" alt="Chăm sóc da mùa hè"/>
    `,
    image: randomImage('skincare1'),
  },
  {
    title: 'Top 3 sản phẩm chống nắng hot nhất 2024',
    description: 'Review chi tiết 3 loại kem chống nắng được yêu thích nhất năm nay.',
    content: `
      <h2>1. Sunblock Aqua SPF50+</h2>
      <p>Kem chống nắng dạng gel, thấm nhanh, không nhờn rít. Phù hợp mọi loại da.</p>
      <img src="https://picsum.photos/seed/sunblock/800/400" alt="Sunblock Aqua"/>
      <h2>2. Daily UV Defense</h2>
      <p>Bảo vệ da tối ưu, bổ sung vitamin E giúp dưỡng ẩm.</p>
      <img src="https://picsum.photos/seed/uvdefense/800/400" alt="Daily UV Defense"/>
      <h2>3. Mineral Sunscreen</h2>
      <p>Thành phần khoáng chất tự nhiên, an toàn cho da nhạy cảm.</p>
      <img src="https://picsum.photos/seed/mineralsun/800/400" alt="Mineral Sunscreen"/>
    `,
    image: randomImage('sunblock'),
  },
  {
    title: 'Trang điểm tự nhiên cho nàng công sở',
    description: 'Bí quyết trang điểm nhẹ nhàng, tươi tắn phù hợp môi trường văn phòng.',
    content: `
      <h2>1. Lớp nền mỏng nhẹ</h2>
      <p>Sử dụng cushion hoặc foundation dạng lỏng, tán đều bằng mút ẩm.</p>
      <h2>2. Má hồng tự nhiên</h2>
      <p>Chọn màu hồng đào hoặc cam đất, tán nhẹ lên gò má.</p>
      <h2>3. Son môi tươi tắn</h2>
      <p>Ưu tiên son tint hoặc son dưỡng có màu, giúp môi mềm mịn cả ngày.</p>
      <img src="https://picsum.photos/seed/office-makeup/800/400" alt="Makeup công sở"/>
    `,
    image: randomImage('office-makeup'),
  },
  {
    title: 'Cách chọn mỹ phẩm phù hợp với từng loại da',
    description: 'Hướng dẫn nhận biết loại da và lựa chọn mỹ phẩm phù hợp.',
    content: `
      <h2>1. Da dầu</h2>
      <p>Chọn sản phẩm oil-free, kiềm dầu tốt, ưu tiên dạng gel.</p>
      <h2>2. Da khô</h2>
      <p>Ưu tiên kem dưỡng ẩm sâu, chứa hyaluronic acid hoặc ceramide.</p>
      <h2>3. Da nhạy cảm</h2>
      <p>Tránh sản phẩm chứa cồn, hương liệu. Ưu tiên thành phần tự nhiên.</p>
      <img src="https://picsum.photos/seed/skintypes/800/400" alt="Chọn mỹ phẩm theo loại da"/>
    `,
    image: randomImage('skintypes'),
  },
  {
    title: '5 thói quen giúp da luôn trẻ đẹp',
    description: 'Những thói quen đơn giản giúp bạn duy trì làn da khỏe mạnh, tươi trẻ.',
    content: `
      <ul>
        <li>Ngủ đủ giấc, tránh thức khuya</li>
        <li>Uống đủ 2 lít nước mỗi ngày</li>
        <li>Chăm sóc da đều đặn sáng-tối</li>
        <li>Ăn nhiều rau xanh, trái cây</li>
        <li>Luôn tẩy trang trước khi đi ngủ</li>
      </ul>
      <img src="https://picsum.photos/seed/beautyhabits/800/400" alt="Thói quen đẹp da"/>
    `,
    image: randomImage('beautyhabits'),
  },
];

export async function seedPosts(users: any[]) {
  for (let i = 0; i < postSamples.length; i++) {
    const user = users[i % users.length];
    const data = postSamples[i];
    const slug = slugify(data.title);
    const existing = await prisma.post.findFirst({ where: { slug } });
    if (existing) {
      await prisma.post.update({
        where: { id: existing.id },
        data: {
          title: data.title,
          description: data.description,
          content: data.content,
          image: data.image,
          published: true,
          authorId: user.id,
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.post.create({
        data: {
          title: data.title,
          description: data.description,
          content: data.content,
          image: data.image,
          slug,
          published: true,
          authorId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }
  console.log('✅ Seeded posts');
} 
