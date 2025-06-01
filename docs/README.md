# Tài Liệu Dự Án

## Mục Lục

1. [Tổng Quan & Tính Năng](#tổng-quan--tính-năng)
   - Mô tả chung về dự án, các tính năng nổi bật, module chính
2. [Feature Overview & Module List](#feature-overview--module-list)
   - Danh sách module, chức năng từng module
3. [Design Patterns](./design-patterns.md)
   - Các pattern đã áp dụng và gợi ý mở rộng
4. [Cấu Trúc Dự Án](./project-structure.md)
   - Sơ đồ, giải thích cấu trúc thư mục, module
5. [Hướng Dẫn Cài Đặt](./setup-guide.md)
   - Cách setup môi trường, cài đặt, run local/dev
6. API Documentation - kiểm tra swagger tại `http://localhost:3000/docs` sau khi chạy local
   - Swagger, mô tả endpoint, response, error
7. [Triển Khai OAuth (Google)](./oauth-implementation.md)
   - Hướng dẫn tích hợp OAuth Google
8. [Testing Guide](./testing-guide.md)
   - Hướng dẫn viết test, cấu trúc test, best practice, coverage
9. [Deployment Guide](./deployment-guide.md)
   - Hướng dẫn build, deploy, Docker, NGINX, CI/CD
10. [Troubleshooting Guide](./troubleshooting.md)
    - Xử lý sự cố thường gặp, log, health, migration, cache
11. [Coding Standards](./coding-standards.md)
    - Quy tắc đặt tên, style code, comment, review, checklist
12. [Security Guidelines](./security-guidelines.md)
    - Quy tắc bảo mật API, input validation, secret, checklist
13. [Technical Pattern](./technical/utility-class-pattern.md)
    - Các pattern kỹ thuật đặc biệt, ví dụ: singleton cache, auto-detect param, ...

---

## Tổng Quan & Tính Năng
- Backend Node.js + TypeScript cho hệ thống e-commerce mỹ phẩm
- Module hóa: Auth (JWT, Google OAuth, OTP Recovery), Post, Cosmetic (Option, Variant, Badge, Benefit, Review, Shipping, Specification), Order, Cart, User (Address), Payment (MOMO)
- ORM: Prisma (MySQL), cache Redis, tài liệu API tự động (Swagger), Docker, NGINX, bảo mật, rate limiting
- Hỗ trợ auto-detect path param cho Swagger, singleton pattern cho cache, technical memory-bank
- Tích hợp thanh toán MoMo, luồng OTP khôi phục tài khoản, quản lý session, refresh token, rate limiting, logging, monitoring

## Feature Overview & Module List
- **Auth**: JWT, Google OAuth, refresh token, session, role-based, OTP recovery
- **Post**: CRUD, search, filter, pagination
- **Cosmetic**: CRUD, options, variants, badges, benefits, shipping, reviews, specification
- **Order**: CRUD, payment status, MOMO integration
- **Cart**: CRUD, checkout, mapping variant/option
- **User**: CRUD, profile, address (submodule)
- **Payment**: MOMO payment, status, callback

## Hướng dẫn sử dụng, chi tiết từng module và technical pattern xem tại các file tương ứng trong thư mục docs/.

---

## Xem thêm:
- [Design Patterns](./design-patterns.md)
- [Cấu Trúc Dự Án](./project-structure.md)
- [Hướng Dẫn Cài Đặt](./setup-guide.md)
- [API Documentation](./api-docs.md)
- [Triển Khai OAuth (Google)](./oauth-implementation.md)
- [Technical Patterns](./technical/utility-class-pattern.md)
- [Testing Guide](./testing-guide.md)
- [Deployment Guide](./deployment-guide.md)
- [Troubleshooting](./troubleshooting.md)
- [Coding Standards](./coding-standards.md)
- [Security Guidelines](./security-guidelines.md)

---
> Mọi thắc mắc/cải tiến vui lòng tạo issue hoặc PR tại repo chính. 

---
> Luôn cập nhật tài liệu khi có thay đổi codebase, schema, technical rule hoặc memory-bank. 
