# Playwright Login Test Project

Dự án này chứa các test cases tự động cho trang login của ứng dụng Yagi.

## Cài đặt

Project đã được cài đặt sẵn với:
- Playwright Test Framework
- TypeScript
- Test data và selectors được tổ chức riêng biệt

## Cấu trúc dự án

```
├── tests/
│   ├── login.spec.ts          # Test cases cho trang login
│   └── test-data/
│       └── login-data.ts      # Data và selectors cho login tests
├── playwright.config.ts       # Cấu hình Playwright
└── package.json
```

## Test Cases

### 1. Kiểm tra tải trang login
- Xác minh trang có thể tải thành công
- Kiểm tra các element của form login hiển thị

### 2. Kiểm tra đăng nhập với thông tin không hợp lệ
- Test với email/password sai
- Xác minh thông báo lỗi hiển thị

### 3. Kiểm tra đăng nhập thành công
- Test với thông tin đăng nhập hợp lệ
- Xác minh chuyển hướng sau khi đăng nhập

### 4. Kiểm tra validation form trống
- Test submit form trống
- Xác minh validation messages

### 5. Kiểm tra link "Quên mật khẩu"
- Xác minh link forgot password tồn tại

## Chạy Tests

```bash
# Chạy tất cả tests
npx playwright test

# Chạy chỉ login tests
npx playwright test login

# Chạy với UI mode
npx playwright test --ui

# Chạy với debug mode
npx playwright test --debug

# Chạy trên specific browser
npx playwright test --project=chromium
```

## Cấu hình Test Data

Cập nhật thông tin đăng nhập trong file `tests/test-data/login-data.ts`:

```typescript
export const LOGIN_DATA = {
  VALID_USER: {
    email: 'your-test-email@example.com',
    password: 'your-test-password'
  }
};
```

## URL Test

Tests được cấu hình để chạy trên: `https://yagi-local.haldata.net/customer/account/login`

## Báo cáo

Sau khi chạy tests, xem báo cáo tại:
```bash
npx playwright show-report
```

## Lưu ý

- Cập nhật thông tin đăng nhập test trong file `login-data.ts` trước khi chạy tests
- Đảm bảo môi trường test có thể truy cập được URL trên
- Tests được thiết kế linh hoạt với multiple selectors để phù hợp với các cấu trúc HTML khác nhau # Playwright-
