# Testing Guide

## 1. Mục đích và phạm vi
- Đảm bảo chất lượng code, phát hiện lỗi sớm
- Kiểm tra logic nghiệp vụ, API, database, cache, bảo mật
- Hỗ trợ refactor, nâng cấp mà không lo phá vỡ tính năng cũ

## 2. Các loại test
- **Unit Test**: Kiểm tra logic từng hàm/service riêng lẻ (không phụ thuộc DB, network)
- **Integration Test**: Kiểm tra luồng nghiệp vụ có tương tác DB, cache, API thật
- **E2E Test**: Kiểm tra toàn bộ flow từ FE → BE → DB (thường dùng cho CI/CD hoặc manual)

## 3. Cấu trúc thư mục test
```
src/
  modules/
    auth/
      __tests__/
        auth.service.test.ts
    cosmetic/
      __tests__/
        cosmetic.service.test.ts
  test/
    utils.ts
    db.setup.ts
    env.setup.ts
    setup.ts
```
- Mỗi module nên có thư mục `__tests__` chứa các file test tương ứng
- Thư mục `test/` chứa các helper, setup, mock chung

## 4. Cách chạy test
```bash
npm test           # Chạy toàn bộ test
npm run test:watch # Chạy test khi thay đổi file
npm run test:coverage # Báo cáo coverage
```
- Có thể tích hợp với CI/CD (GitHub Actions, ...)

## 5. Best Practice khi viết test
- Đặt tên file: `*.test.ts` hoặc `__tests__/*.test.ts`
- Đặt tên test case rõ ràng, mô tả đúng hành vi
- Sử dụng mock/stub cho các dependency ngoài (DB, Redis, API)
- Đảm bảo test độc lập, không phụ thuộc trạng thái lẫn nhau
- Đảm bảo coverage cao cho các nhánh logic chính
- Cleanup dữ liệu test sau mỗi test (dùng clearDatabase, rollback transaction, ...)
- Ưu tiên test các case edge, lỗi, security

## 6. Liên kết tới module có test mẫu
- `src/modules/auth/__tests__/auth.service.test.ts`
- `src/modules/cosmetic/__tests__/cosmetic.service.test.ts`
- `src/test/utils.ts` (helper chung)

## 7. Checklist review test
- [ ] Đủ test cho các logic chính, branch quan trọng
- [ ] Đủ test cho các case lỗi, edge case
- [ ] Không để lại dữ liệu rác sau test
- [ ] Không phụ thuộc trạng thái test khác
- [ ] Đặt tên test rõ ràng, dễ hiểu
- [ ] Đảm bảo coverage tối thiểu 80% (hoặc theo quy định dự án)

## 8. Ghi chú đồng bộ type test
- Khi đồng bộ type/dto giữa backend và frontend, nên đồng bộ luôn các type test (nếu có)
- Đảm bảo các test không bị lỗi type khi cập nhật schema

---
> Xem thêm ví dụ test thực tế trong các module và thư mục `src/test/`. 
