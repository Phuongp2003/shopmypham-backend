# Shop Mỹ Phẩm Backend

> [Repo GitHub: Frontend](https://github.com/Phuongp2003/shopmypham-web)

Backend Node.js + TypeScript cho hệ thống e-commerce mỹ phẩm. Hỗ trợ xác thực JWT, Google OAuth, quản lý sản phẩm, đơn hàng, giỏ hàng, người dùng, thanh toán MOMO, cache Redis, Prisma ORM, và tài liệu API tự động.

## Tính năng chính
- Đăng ký/đăng nhập (JWT, Google OAuth)
- Quản lý sản phẩm (Cosmetic, Option, Variant, Badge, Review, Shipping...)
- Đơn hàng, giỏ hàng, thanh toán MOMO
- Quản lý người dùng, địa chỉ
- API RESTful, tài liệu Swagger
- Caching với Redis
- Quản lý session, refresh token
- Rate limiting, bảo mật cơ bản

## Yêu cầu hệ thống
- Node.js >= 18
- MySQL >= 8
- Redis >= 6 (tùy chọn)

## Cài đặt nhanh
```bash
# Clone repo
$ git clone https://github.com/Phuongp2003/shopmypham-backend.git
$ cd shopmypham-backend

# Cài dependencies
$ npm install

# Tạo file .env từ .env.example và chỉnh sửa thông tin kết nối
$ cp .env.example .env

# Khởi tạo database
$ npm run prisma:generate
$ npm run prisma:migrate

# Chạy server (dev)
$ npm run dev
# Truy cập: http://localhost:3000
# Swagger: http://localhost:3000/docs
```

## Scripts package.json
- `dev`: Chạy server ở chế độ phát triển (hot reload, typescript)
- `start`: Chạy server ở chế độ production (node dist/index.js)
- `build`: Biên dịch TypeScript sang JavaScript (ra thư mục dist)
- `prisma:generate`: Sinh Prisma Client từ schema
- `prisma:migrate`: Chạy migration cho database (dev mode)
- `prisma:studio`: Giao diện quản lý database (Prisma Studio)
- `prisma:seed`: Seed dữ liệu mẫu vào database
- `test`: Chạy toàn bộ test với Jest
- `test:watch`: Chạy test ở chế độ watch (tự động khi thay đổi file)
- `test:coverage`: Báo cáo coverage cho test
- `test:ci`: Chạy test ở chế độ CI (báo cáo coverage)
- `format`: Định dạng code với Prettier

## Sử dụng API
- Tài liệu chi tiết: [docs/README.md](./docs/README.md)
- Swagger UI: http://localhost:3000/docs
- Đăng ký/đăng nhập: `/auth/register`, `/auth/login`, `/auth/google`
- Làm mới token: `/auth/refresh-token`
- Đăng xuất: `/auth/logout`
- Quản lý sản phẩm: `/cosmetics`, `/cosmetics/:id`, ...
- Đơn hàng: `/orders`, `/orders/:id`
- Giỏ hàng: `/cart`
- Thanh toán MOMO: `/payment/momo`

## Google OAuth
- Đăng nhập Google: Truy cập `/auth/google` trên backend
- Sau khi xác thực thành công, frontend sẽ nhận được token qua callback
- Cấu hình biến môi trường Google OAuth trong `.env`

## Tham khảo thêm
- [Tài liệu chi tiết, hướng dẫn, design patterns, cấu trúc, ...](./docs/README.md)
- [API mẫu, response mẫu, best practices](./docs/api-docs.md)
- [Hướng dẫn Google OAuth](./docs/oauth-implementation.md)

---
> Mọi thắc mắc/cải tiến vui lòng tạo issue hoặc PR tại repo chính. 
