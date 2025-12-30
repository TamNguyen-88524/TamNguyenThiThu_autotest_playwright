📁 1. CẤU TRÚC PROJECT HIỆN TẠI
PLAYWRIGHT/
├─ pages/
│  ├─ LoginPage.ts
│  └─ HomePage.ts
│  └─ DetailPage.ts
│  └─ BookingPage.ts
│  └─ RegisterPage.ts
│
├─ tests/
│  ├─ login.spec.ts
│  └─ home.spec.ts
│  └─ detail.user.spec.ts
│  └─ booking.user.spec.ts
│  └─ logout.spec.ts
│  └─ register.spec.ts
│
├─ test-data/        (đang để trống / optional)
│
├─ playwright.config.ts
├─ package.json
└─ package-lock.json

▶️ 7. CÁCH CHẠY TEST
# Chạy toàn bộ
npx playwright test

# Chạy riêng login
npx playwright test tests/login.spec.ts

# Chạy riêng home
npx playwright test tests/home.spec.ts

# Mở report
npx playwright show-report

🧠 TỔNG KẾT (Leader Tester)
✔ Page Object Model đúng chuẩn
✔ Test login & test sau login tách biệt
✔ Login 1 lần cho Home → tiết kiệm thời gian
✔ Locator ở mức khái niệm, không fragile
✔ Dùng làm baseline Playwright rất tốt