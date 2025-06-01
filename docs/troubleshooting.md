# Troubleshooting Guide

## 1. Mục đích và phạm vi
- Hỗ trợ phát hiện, xác định và xử lý nhanh các sự cố thường gặp khi vận hành backend Node.js + TypeScript
- Áp dụng cho môi trường dev, staging, production

## 2. Các lỗi thường gặp
- **Database connection error**: Kiểm tra DATABASE_URL, trạng thái MySQL, quyền truy cập
- **Redis connection error**: Kiểm tra REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, trạng thái Redis
- **JWT/Token error**: Kiểm tra JWT_SECRET, thời hạn token, đồng bộ clock server
- **API 500 Internal Server Error**: Kiểm tra log, stacktrace, validate input
- **Migration error**: Kiểm tra version Prisma, trạng thái migration, rollback nếu cần
- **Cache không hoạt động**: Kiểm tra kết nối Redis, trạng thái global.redisAvailable
- **CORS error**: Kiểm tra cấu hình CORS, domain, header

## 3. Cách kiểm tra health, log, debug
- Truy cập `/healthz` để kiểm tra health API
- Kiểm tra log file trong thư mục `logs/` hoặc console
- Sử dụng lệnh `docker logs <container>` nếu chạy bằng Docker
- Dùng các tool như Postman, curl để test API
- Sử dụng debug mode (`NODE_ENV=development`)

## 4. Hướng dẫn giải quyết nhanh
- **DB lỗi**: Restart MySQL, kiểm tra quyền user, kiểm tra migration
- **Redis lỗi**: Restart Redis, kiểm tra password, port, log Redis
- **Token lỗi**: Kiểm tra lại JWT_SECRET, xóa cookie, refresh token
- **API lỗi 500**: Xem log chi tiết, kiểm tra input, validate schema
- **Migration lỗi**: Rollback migration, kiểm tra schema.prisma
- **Cache lỗi**: Đảm bảo Redis hoạt động, kiểm tra log CacheService
- **CORS lỗi**: Thêm domain vào whitelist, kiểm tra header

## 5. Checklist khi gặp sự cố production
- [ ] Đã kiểm tra log error, warning
- [ ] Đã kiểm tra healthz, status DB/Redis
- [ ] Đã kiểm tra version code, migration
- [ ] Đã kiểm tra cấu hình env
- [ ] Đã kiểm tra backup DB gần nhất
- [ ] Đã thông báo cho team nếu lỗi nghiêm trọng

## 6. Gợi ý công cụ debug/log
- Log file: `logs/error-*.log`, `logs/combined-*.log`
- Docker: `docker logs <container>`
- Monitoring: Prometheus, Grafana, Loki
- Debug API: Postman, curl

---
> Xem thêm các file log, health check, migration script để xác định nguyên nhân sự cố. 
