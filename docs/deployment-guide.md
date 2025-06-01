# Deployment Guide

## 1. Mục đích và phạm vi
- Đảm bảo hệ thống backend Node.js + TypeScript được triển khai an toàn, ổn định, dễ bảo trì
- Hỗ trợ deploy production, staging, local/dev

## 2. Chuẩn bị môi trường
- Cấu hình `.env` đầy đủ (DATABASE_URL, REDIS_HOST, JWT_SECRET, ...)
- Đảm bảo MySQL, Redis đã sẵn sàng
- Cài đặt Docker, Docker Compose (nếu dùng container)
- Chuẩn bị NGINX (nếu dùng reverse proxy)

## 3. Build, migrate, seed, start production
```bash
npm install
npm run build
npx prisma migrate deploy   # Apply migration production
npm run prisma:seed         # Seed dữ liệu mẫu (nếu cần)
NODE_ENV=production npm start
```

## 4. Deploy bằng Docker
- Sử dụng `Dockerfile` và `docker-compose.yml` có sẵn
```bash
docker-compose up -d --build
```
- Dockerfile build image Node.js, copy code, cài dependency, build, start
- docker-compose.yml cấu hình service backend, MySQL, Redis, NGINX (nếu cần)

## 5. Cấu hình NGINX reverse proxy
- File mẫu: `nginx.conf`
- Lắng nghe cổng 80, proxy_pass về backend:3000
- Có thể cấu hình SSL, gzip, cache, ...

## 6. Checklist khi deploy
- [ ] Đã set đúng biến môi trường `.env`
- [ ] Đã migrate DB, seed dữ liệu
- [ ] Đã kiểm tra log, health check `/healthz`
- [ ] Đã cấu hình backup DB định kỳ
- [ ] Đã cấu hình monitoring/logging (Prometheus, Grafana, Loki, ...)
- [ ] Đã kiểm tra bảo mật (JWT, cookie, CORS, ...)

## 7. Hướng dẫn rollback, backup, restore
- Backup DB định kỳ (mysqldump, auto-backup script)
- Khi cần rollback: restore DB từ bản backup, deploy lại image cũ
- Có thể dùng tag version cho image Docker để dễ rollback

## 8. Gợi ý monitoring/logging
- Sử dụng Prometheus + Grafana cho monitoring
- Sử dụng Loki, ELK, hoặc file log để lưu log
- Theo dõi log error, warning, performance

---
> Xem thêm file mẫu: Dockerfile, docker-compose.yml, nginx.conf trong repo. 
