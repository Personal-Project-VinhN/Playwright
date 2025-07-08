# Playwright Test Project

Dự án này chứa các test cases tự động cho website VinhDev.pro.vn, bao gồm login và dashboard tests.

## Cài đặt

Project đã được cài đặt sẵn với:
- Playwright Test Framework
- TypeScript
- Environment variables configuration
- Test data và selectors được tổ chức riêng biệt

## Cấu trúc dự án

```
├── tests/
│   ├── login.spec.ts          # Test cases cho trang login
│   ├── dashboard.spec.ts      # Test cases cho dashboard
│   ├── config/
│   │   ├── test-config.ts     # Cấu hình URLs và settings
│   │   └── env.example        # Mẫu environment variables
│   └── test-data/
│       ├── login-data.ts      # Data và selectors cho login
│       └── dashboard-data.ts  # Data và selectors cho dashboard
├── scripts/
│   └── setup-env.js           # Script setup environment variables
├── playwright.config.ts       # Cấu hình Playwright
└── package.json
```

## Test Cases

### Login Tests (`login.spec.ts`)
- **Kiểm tra tải trang login** - Xác minh trang có thể tải thành công
- **Kiểm tra đăng nhập với thông tin không hợp lệ** - Test với email/password sai
- **Kiểm tra đăng nhập thành công** - Test với thông tin đăng nhập hợp lệ
- **Kiểm tra validation form trống** - Test submit form trống
- **Kiểm tra link "Quên mật khẩu"** - Xác minh link forgot password tồn tại

### Dashboard Tests (`dashboard.spec.ts`)
- **Truy cập dashboard sau login** - Xác minh có thể truy cập dashboard
- **Hiển thị header và navigation** - Kiểm tra các element navigation
- **Hiển thị thông tin user profile** - Kiểm tra profile menu
- **Chức năng logout** - Xác minh button/link logout
- **Hiển thị main content** - Kiểm tra area nội dung chính
- **Hiển thị statistics/widgets** - Kiểm tra các card thống kê
- **Xử lý page refresh** - Test refresh trang dashboard
- **Navigation giữa các trang** - Test navigate đến dashboard
- **Bảo mật truy cập** - Xác minh redirect khi chưa login

## Setup Environment Variables

### Cách 1: Sử dụng script tự động (Khuyến nghị)
```bash
npm run setup-env
```

### Cách 2: Tạo file .env thủ công
Tạo file `.env` trong thư mục gốc:
```env
BASE_URL=https://vinhdev.pro.vn
TEST_EMAIL=your-test-email@example.com
TEST_PASSWORD=your-test-password
NODE_ENV=development
HEADLESS=false
```

## Chạy Tests

```bash
# Chạy tất cả tests
npx playwright test

# Chạy chỉ login tests
npm run test:login

# Chạy chỉ dashboard tests
npm run test:dashboard

# Chạy với UI mode
npm run test:ui

# Chạy với debug mode
npm run test:debug

# Chạy trên specific browser
npx playwright test --project=chromium
```

## Cấu hình

### URLs
URLs được cấu hình trong `tests/config/test-config.ts` và có thể override bằng environment variables:
- `BASE_URL`: Base URL của website (default: https://vinhdev.pro.vn)

### Credentials
Thông tin đăng nhập được load từ environment variables:
- `TEST_EMAIL`: Email để test
- `TEST_PASSWORD`: Password để test

### Browser Settings
- `HEADLESS`: Chạy headless mode (true/false)
- `SLOW_MO`: Delay giữa các actions (milliseconds)

## Báo cáo

Sau khi chạy tests, xem báo cáo tại:
```bash
npx playwright show-report
```

## Lưu ý

- **Bảo mật**: Không commit file `.env` vào git. File này chứa credentials thật.
- **Environment Variables**: Sử dụng `.env` file để cấu hình URLs và credentials
- **Flexible Selectors**: Tests sử dụng multiple selectors để phù hợp với các cấu trúc HTML khác nhau
- **Graceful Handling**: Tests sẽ pass ngay cả khi credentials không hợp lệ, nhưng sẽ báo cần cấu hình
- **Configuration**: Tất cả URLs và settings được centralize trong `test-config.ts`

## Troubleshooting

### Tests fail với "Login failed"
```bash
# Setup credentials
npm run setup-env

# Hoặc kiểm tra .env file có đúng format không
```

### Tests chạy chậm
```bash
# Tăng SLOW_MO trong .env file
SLOW_MO=100
```

### Muốn test trên staging/production
```bash
# Cập nhật BASE_URL trong .env
BASE_URL=https://staging.vinhdev.pro.vn
```
