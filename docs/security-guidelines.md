# Security Guidelines

## 1. Mục đích và phạm vi
- Đảm bảo hệ thống backend an toàn, bảo vệ dữ liệu người dùng
- Áp dụng cho toàn bộ API, database, cache, session

## 2. Quy tắc bảo mật API
- Sử dụng JWT cho xác thực, lưu refresh token ở HTTP-only cookie
- Đặt thời hạn access token ngắn (15 phút), refresh token (7 ngày)
- Bật CORS, chỉ cho phép domain tin cậy
- Áp dụng rate limiting (100 req/phút/IP, 10 req/phút cho auth)
- Không trả về lỗi chi tiết cho client (ẩn stacktrace, error nội bộ)

## 3. Input validation, XSS, CSRF, SQL injection
- Validate input với Zod/Joi cho mọi API
- Escape dữ liệu khi render ra FE (nếu có)
- Sử dụng helmet, csrf middleware nếu cần
- Không dùng query string trực tiếp cho DB (dùng Prisma ORM)

## 4. Quản lý secret, biến môi trường
- Không commit file .env, secret lên git
- Sử dụng biến môi trường cho JWT_SECRET, DB, Redis, MOMO, ...
- Đổi secret định kỳ, không dùng secret mặc định

## 5. Checklist bảo mật khi release
- [ ] Đã kiểm tra lỗ hổng XSS, CSRF, SQL injection
- [ ] Đã bật HTTPS, CORS, helmet
- [ ] Đã kiểm tra rate limiting, session
- [ ] Đã kiểm tra log, monitoring
- [ ] Đã đổi secret, không dùng mặc định
- [ ] Đã kiểm tra backup, restore

## 6. Gợi ý công cụ kiểm tra bảo mật
- npm audit, snyk: kiểm tra lỗ hổng package
- OWASP ZAP, Postman: kiểm thử API security
- helmet, csurf: middleware bảo vệ Express

---
> Xem thêm technical memory-bank, rule.md để đồng bộ quy tắc bảo mật. 
