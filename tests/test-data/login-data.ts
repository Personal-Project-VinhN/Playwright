/**
 * Test data for login functionality
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */

export const LOGIN_DATA = {
  // Valid credentials - update with actual test account
  VALID_USER: {
    email: 'gin_vn+001@haldata.net',
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
  // Email/Username field selectors
  EMAIL_FIELD: 'input[name="login[username]"], input[type="email"], #email',
  
  // Password field selectors  
  PASSWORD_FIELD: 'input[name="login[password]"], input[type="password"], #pass',
  
  // Login button selectors
  LOGIN_BUTTON: 'button[type="submit"], .action.login, #send2',
  
  // Error message selectors
  ERROR_MESSAGE: '.error, .message-error, .alert-error, [data-ui-id="message-error"], .mage-error',
  
  // Success indicators - updated based on actual page structure
  SUCCESS_INDICATOR: '.header .customer-welcome, .welcome, .logged-in, a[href*="logout"], .customer-name, .header-links a[href*="logout"]',
  
  // Forgot password link
  FORGOT_PASSWORD: 'a[href*="forgot"], .forgot-password, .action.remind'
}; 