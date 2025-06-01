# Coding Standards

## 1. Mục đích và phạm vi
- Đảm bảo code nhất quán, dễ đọc, dễ bảo trì, dễ review
- Áp dụng cho toàn bộ backend Node.js + TypeScript

## 2. Quy tắc đặt tên
- Biến: camelCase (ví dụ: userId, accessToken)
- Hàm: camelCase, tên động từ rõ nghĩa (getUser, createOrder)
- Class: PascalCase (UserService, AuthController)
- File: kebab-case (user.service.ts, auth.controller.ts)
- Module/thư mục: kebab-case (user, auth, cosmetic)

## 3. Quy tắc style code
- Indent: 2 spaces (theo .prettierrc)
- Dùng single quote cho string
- Không để trailing space, dòng thừa
- Dùng linter (eslint) và prettier để format tự động
- Không commit code khi còn lỗi linter

## 4. Quy tắc comment, docblock, swagger annotation
- Viết comment rõ ràng cho các hàm phức tạp, logic đặc biệt
- Dùng block comment chuẩn cho swagger annotation (theo technical memory-bank)
- Mỗi type/interface export phải có block comment swagger phía trên
- Đặt docblock ngay trên export type/class/interface

## 5. Quy tắc review code, pull request
- Mỗi PR phải có mô tả rõ ràng, link tới issue (nếu có)
- Không merge khi còn lỗi linter/test
- Reviewer kiểm tra logic, style, security, performance
- Ưu tiên review các file thay đổi nhiều logic nghiệp vụ

## 6. Checklist coding standards
- [ ] Đặt tên đúng quy tắc
- [ ] Không lỗi linter, prettier
- [ ] Có comment cho logic phức tạp
- [ ] Có swagger annotation cho type/export
- [ ] Không commit code thừa, debug, log tạm
- [ ] Đã test lại tính năng trước khi PR

## 7. Công cụ hỗ trợ
- eslint, prettier: kiểm tra và format code tự động
- husky: chặn commit/push khi còn lỗi linter/test
- VSCode extension: ESLint, Prettier

---
> Xem thêm file .prettierrc, .eslintrc, technical memory-bank để đồng bộ quy tắc. 
