/**
 * Test data for login functionality
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */

export const LOGIN_DATA = {
  // Valid credentials - update with actual test account for vinhdev.pro.vn
  VALID_USER: {
    email: 'gin_vn@haldata.net',
    password: 'Abc@123456'
  },
  
  // Invalid credentials for negative testing
  INVALID_USER: {
    email: 'invalid@test.com',
    password: 'wrongpassword'
  },
  
  // Test user with special characters
  SPECIAL_CHARS_USER: {
    email: 'test+special@example.com',
    password: 'P@ssw0rd!123'
  }
};

export const LOGIN_SELECTORS = {
  // Email/Username field selectors for vinhdev.pro.vn
  EMAIL_FIELD: 'input[name="email"]',
  
  // Password field selectors  
  PASSWORD_FIELD: 'input[name="password"]',
  
  // Login button selectors
  LOGIN_BUTTON: 'button[type="submit"]',
  
  // Error message selectors - updated for vinhdev.pro.vn
  ERROR_MESSAGE: '.text-red-500, .text-danger, .error-message, .alert-error, div[class*="error"]',
  
  // Success indicators - for vinhdev.pro.vn
  SUCCESS_INDICATOR: '.user-menu, .logout, a[href*="logout"], .dashboard, .profile, .welcome',
  
  // Forgot password link
  FORGOT_PASSWORD: 'a[href*="forgot"], a[href*="reset"], .forgot-password'
}; 